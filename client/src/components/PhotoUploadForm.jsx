import React, { useState } from 'react';

const PhotoUploadForm = ({ onPhotoUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photos, setPhotos] = useState([]);
  const [url, setUrl] = useState('');
  const [photoIdCounter, setPhotoIdCounter] = useState(1); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotos([...photos, { id: photoIdCounter, file }]);
    setPhotoIdCounter(photoIdCounter + 1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const formData = new FormData();
      formData.append('photo', photos[photos.length - 1].file); //use last added file
      formData.append('title', title);
      formData.append('description', description);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('url', url);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        onPhotoUpload(responseData.photo.url);
        // Reset form fields
        setTitle('');
        setDescription('');
        setLatitude('');
        setLongitude('');
        setUrl('');
      } else {
        console.error('Failed to upload photo');
      }
  };

  return (
    <div className="upload-section">
      <div className="upload-buttons">
        <div className="upload-icon">
          <svg viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" fill="#49779c" width="39px" height="45px">
            <path d="M12 6.5h-1.5v4h-4v1.5h4v4h1.5v-4h4v-1.5h-4v-4z"/>
          </svg>
        </div>
        <h3 className="upload-title">Upload a Photo</h3>
        <p className="upload-info">PNG, JPG, JPEG any size</p>
        <form onSubmit={handleSubmit} className="upload-form">
          <input type="file" onChange={handleFileChange} />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          <button type="submit" className="upload-button">Upload</button>
        </form>
        <label htmlFor="url">Or insert your URL here:</label>
        <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
    </div>
  );
};

export default PhotoUploadForm;
