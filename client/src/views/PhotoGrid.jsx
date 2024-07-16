import React, { useEffect, useState } from 'react';

function PhotoGrid ({ photos }) {

  const [galleryPhotos, setGalleryPhotos] = useState([]);

  useEffect(() => {
    fetch('/api/photos')
      .then(response => response.json())
      .then(data => setGalleryPhotos(data))
      .catch(error => console.error('Error fetching gallery photos:', error));
  }, []);


  return (
  <>
  <h3 style={{ textAlign: 'center' }}>Visualizza qui le tue foto caricate</h3>
   <div className="photo-gallery">
    {galleryPhotos.map((photo) => (
      <div key={photo.id} className="photo-item">
        <img src={photo.url} alt={photo.title} />
        <div>
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <p>Location: {photo.latitude}, {photo.longitude}</p>
        </div>
      </div>
    ))}
  </div>
      </>

  );
}

export default PhotoGrid;

