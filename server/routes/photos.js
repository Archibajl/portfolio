/**
 * Photos Route Implementation
 *
 * Handles photo fetching from Cloudflare R2 storage.
 */

const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Cloudflare R2 Configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Initialize S3 client for R2
let s3Client = null;
if (R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY) {
  const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  console.debug('[R2] Initializing S3 client with endpoint');

  s3Client = new S3Client({
    region: 'auto',
    endpoint: endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

// Cache for photo list from R2
let photoListCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for signed URLs (expires in 50 minutes to regenerate before 1 hour expiry)
let signedUrlCache = new Map();
let signedUrlCacheTimestamp = null;
const SIGNED_URL_CACHE_DURATION = 50 * 60 * 1000; // 50 minutes

// Fetch list of photos from R2 using S3 API
async function fetchPhotosFromR2() {
  // Check cache first
  if (photoListCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    console.log('[R2] Using cached photo list');
    return photoListCache;
  }

  if (!s3Client || !R2_BUCKET_NAME) {
    throw new Error('R2 credentials not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME in your .env file');
  }

  try {
    console.debug('[R2] Fetching photo list from bucket using S3 API...');
    console.debug('[R2] Using bucket:', R2_BUCKET_NAME);

    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      MaxKeys: 1000,
    });

    console.debug('[R2] Sending ListObjectsV2Command...');
    const response = await s3Client.send(command);
    console.debug('[R2] Successfully received response from R2');

    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif'];
    photoListCache = (response.Contents || [])
      .map(item => item.Key)
      .filter(key => {
        const lowerKey = key.toLowerCase();
        return imageExtensions.some(ext => lowerKey.endsWith(ext));
      })
      .sort();

    cacheTimestamp = Date.now();
    console.log(`[R2] Loaded ${photoListCache.length} photos from API`);

    return photoListCache;
  } catch (error) {
    console.error('[R2] Error name:', error.name);
    console.error('[R2] Error code:', error.code);
    console.error('[R2] Error fetching photos:', error.message);
    if (error.$metadata) {
      console.error('[R2] HTTP Status Code:', error.$metadata.httpStatusCode);
      console.error('[R2] Request ID:', error.$metadata.requestId);
    }
    throw error;
  }
}

/**
 * Register photos routes on the Express app
 * @param {import('express').Application} app
 */
function photosRoutes(app) {
  // API endpoint to fetch photos from R2
  app.get('/api/photos', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 20;
      const skipCount = (page - 1) * pageSize;

      console.log(`[API] Fetching photos from Cloudflare R2 - page ${page}`);

      const allPhotos = await fetchPhotosFromR2();

      // Check if signed URL cache is expired
      if (!signedUrlCacheTimestamp || Date.now() - signedUrlCacheTimestamp > SIGNED_URL_CACHE_DURATION) {
        console.log('[API] Signed URL cache expired or empty, regenerating all URLs...');
        signedUrlCache.clear();
        signedUrlCacheTimestamp = Date.now();
      }

      // Paginate
      const paginatedPhotos = allPhotos.slice(skipCount, skipCount + pageSize);

      // Generate signed URLs for each photo (use cache if available)
      const photos = await Promise.all(paginatedPhotos.map(async (photoKey) => {
        // Check cache first
        if (signedUrlCache.has(photoKey)) {
          return signedUrlCache.get(photoKey);
        }

        // Generate new signed URL
        const command = new GetObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: photoKey,
        });

        // Sign the URL with 1 hour expiration
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        // Cache it
        signedUrlCache.set(photoKey, signedUrl);

        return signedUrl;
      }));

      const hasMore = skipCount + pageSize < allPhotos.length;

      const cachedCount = paginatedPhotos.filter(key => signedUrlCache.has(key)).length;
      console.log(`[API] Found ${allPhotos.length} total photos in R2, returning ${photos.length} signed URLs for page ${page} (${cachedCount} from cache)`);

      res.json({
        photos,
        hasMore,
        total: allPhotos.length,
        page,
        pageSize
      });

    } catch (error) {
      console.error('[API] Error:', error.message);
      res.json({
        photos: [],
        error: error.message
      });
    }
  });
}

module.exports = photosRoutes;
