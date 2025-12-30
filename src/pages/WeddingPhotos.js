import React from 'react';
import WeddingPhotoGallery from '../components/InfiniteScroll';
import '../styles/WeddingPhotos.css';

function WeddingPhotos() {
  return (
    <div className="wedding-photos-page">
      <div className="wedding-header">
        <h1>Wedding Photos</h1>
        <p>Our Special Day</p>
      </div>
      <div className="wedding-content">
        <WeddingPhotoGallery />
      </div>
    </div>
  );
}

export default WeddingPhotos;
