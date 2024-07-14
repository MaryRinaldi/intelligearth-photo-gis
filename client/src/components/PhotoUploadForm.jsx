import React, { useState } from 'react';

const PhotoUploadForm = ({ onPhotoUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('photo', photoFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const responseData = await response.json();
      onPhotoUpload(responseData.photoUrl);

      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setPhotoFile(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="header-bottom">
      <div className="container">
        <div className="upload-section">
          <div className="upload-buttons">
            <div className="upload-icon">
              <svg viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" fill="#49779c" width="39px" height="45px">
                <path d="M12 6.5h-1.5v4h-4v1.5h4v4h1.5v-4h4v-1.5h-4v-4z"/>
              </svg>
            </div>
            <h3 className="upload-title">Upload a Photo</h3>
            <p className="upload-info">PNG, JPG, JPEG any size</p>
            <form onSubmit={handleSubmit}>
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
            <p className="drag-info">or drag and drop your photo here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadForm;