import React, { useEffect, useState } from 'react';

function PhotoGrid({mockPhotos}) {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/photos')
      .then(response => response.json())
      .then(data => setGalleryPhotos(data))
      .catch(error => console.error('Error fetching gallery photos:', error));
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const filteredPhotos = galleryPhotos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
       <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <h3 style={{ textAlign: 'center' }}>Visualizza qui le tue foto caricate</h3>
      <div className="photo-gallery">
        {filteredPhotos.slice().reverse().map((photo) => (
          <div key={photo.id} className="photo-item" onClick={() => handlePhotoClick(photo)}>
            <img src={photo.url} alt={photo.title} />
            <div>
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
              <p>Location: {photo.latitude}, {photo.longitude}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-details">
          <h2>{selectedPhoto.title}</h2>
          <p>{selectedPhoto.description}</p>
          <p>Location: {selectedPhoto.latitude}, {selectedPhoto.longitude}</p>
          <img src={selectedPhoto.url} alt={selectedPhoto.title} />
        </div>
      )}
    </>
  );
}

export default PhotoGrid;
