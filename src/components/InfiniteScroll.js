import React, { useEffect, useState, useCallback } from 'react';

function WeddingPhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch photos
  const fetchPhotos = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/photos?page=${page}`);
      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more photos to load
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // Handle scrolling to load more photos
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        fetchPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPhotos]);

  // Initial load
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <div>
      <div className="gallery">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt="Wedding" className="photo" />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more photos</p>}
    </div>
  );
}

export default WeddingPhotoGallery;
