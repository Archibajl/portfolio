require('dotenv').config();
const express = require('express');
const path = require('path');
const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

const app = express();
const PORT = process.env.PORT || 3000;

// Microsoft Graph API configuration
const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID || '',
  process.env.AZURE_CLIENT_ID || '',
  process.env.AZURE_CLIENT_SECRET || ''
);

// Create Graph client
const getGraphClient = () => {
  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => {
        const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
        return tokenResponse.token;
      }
    }
  });
};

// API endpoint to fetch photos from OneDrive
app.get('/api/photos', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 20; // Number of photos per page
    const skipCount = (page - 1) * pageSize;

    // Get OneDrive folder path from environment variable
    const folderPath = process.env.ONEDRIVE_FOLDER_PATH || '/WeddingPhotos';

    const client = getGraphClient();

    // Fetch photos from OneDrive folder
    const result = await client
      .api(`/me/drive/root:${folderPath}:/children`)
      .top(pageSize)
      .skip(skipCount)
      .filter('file ne null') // Only get files, not folders
      .select('id,name,@microsoft.graph.downloadUrl,file')
      .get();

    // Filter for image files and extract download URLs
    const photos = result.value
      .filter(item => item.file && item.file.mimeType && item.file.mimeType.startsWith('image/'))
      .map(item => item['@microsoft.graph.downloadUrl']);

    res.json({ photos });
  } catch (error) {
    console.error('Error fetching photos from OneDrive:', error);

    // Return empty array if there's an error (e.g., not configured yet)
    res.json({ photos: [] });
  }
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
