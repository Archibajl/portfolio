import React, { useEffect, useState, useCallback, memo } from 'react';
import './InfiniteScroll.css';

// Memoized photo component to prevent re-rendering
const PhotoItem = memo(({ src, alt, index, onClick }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div style={{ position: 'relative', backgroundColor: '#1a1a1a' }}>
      <img
        src={src}
        alt={alt}
        className="photo"
        loading="lazy"
        onClick={() => onClick(index)}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error(`Failed to load image: ${src}`);
          e.target.style.display = 'none';
        }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      {!loaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          backgroundColor: '#2a2a2a',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
});

function WeddingPhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prefetchedPage, setPrefetchedPage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to fetch photos (with optional prefetch mode)
  const fetchPhotos = useCallback(async (prefetch = false) => {
    if (!prefetch && (isLoading || !hasMore)) return;

    const pageToFetch = prefetch ? page + 1 : page;

    if (!prefetch) setIsLoading(true);

    try {
      const response = await fetch(`/api/photos?page=${pageToFetch}`);
      const data = await response.json();

      if (prefetch) {
        // Store prefetched data
        if (data.photos && data.photos.length > 0) {
          setPrefetchedPage({ page: pageToFetch, data });
          // Preload images in background
          data.photos.forEach(url => {
            const img = new Image();
            img.src = url;
          });
        }
      } else {
        // Check if we already prefetched this page
        if (prefetchedPage && prefetchedPage.page === pageToFetch) {
          setPhotos((prevPhotos) => [...prevPhotos, ...prefetchedPage.data.photos]);
          setPrefetchedPage(null);
        } else if (data.photos && data.photos.length > 0) {
          setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
        } else {
          setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);

        // Prefetch next page after loading current
        if (data.hasMore) {
          setTimeout(() => fetchPhotos(true), 500);
        }
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      if (!prefetch) setIsLoading(false);
    }
  }, [page, isLoading, hasMore, prefetchedPage]);

  // Throttle function for scroll optimization
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Handle scrolling to load more photos with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        fetchPhotos();
      }
    }, 200); // Throttle to max once per 200ms

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPhotos]);

  // Initial load
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Handle lightbox open
  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Handle lightbox close
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigate to next image
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  return (
    <div>
      <div className="gallery">
        {photos.map((photo, index) => (
          <PhotoItem
            key={`${index}-${photo}`}
            src={photo}
            alt={`Wedding photo ${index + 1}`}
            index={index}
            onClick={openLightbox}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          <img
            src={photos[currentImageIndex]}
            alt={`Wedding photo ${currentImageIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-counter">{currentImageIndex + 1} / {photos.length}</div>
        </div>
      )}
      {isLoading && (
        <div className="loading-container">
          <p className="loading-text">Loading photos...</p>
        </div>
      )}
      {!isLoading && photos.length === 0 && (
        <div className="empty-container">
          <p className="empty-text">No photos found. Please check the OneDrive link configuration.</p>
        </div>
      )}
      {!hasMore && photos.length > 0 && (
        <div className="end-container">
          <p className="end-text">All photos loaded ✨</p>
        </div>
      )}
    </div>
  );
}

export default WeddingPhotoGallery;
