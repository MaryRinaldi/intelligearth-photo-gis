import React from 'react';

const PhotoGrid = ({ photos }) => (
  <div className="photo-grid">
    {photos.map((photo) => (
      <div key={photo.id} className="photo-item">
        <img src={photo.url} alt={photo.title} />
        <div className="photo-details">
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <p>Location: {photo.latitude}, {photo.longitude}</p>
        </div>
      </div>
    ))}
  </div>
);

export default PhotoGrid;
