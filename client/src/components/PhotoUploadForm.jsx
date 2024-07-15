import React, { useState } from 'react';
import LogoIcon from '../assets/Logo.png';

const PhotoUploadForm = ({ onPhotoUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [files, setFiles] = useState([]); // State to hold the selected files
  const [url, setUrl] = useState(''); // State for URL input

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Date.now(), // Generate unique ID for each file
      file: file
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0 && !url) {
      console.error('No file selected or URL provided');
      return;
    }

    const formData = new FormData();

    // Append each file to formData
    files.forEach(({ file }) => {
      formData.append('photos', file); // Use 'photos' to handle multiple files on the server
    });

    formData.append('title', title);
    formData.append('description', description);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    // Append URL if provided
    if (url) {
      formData.append('url', url);
    }

    try {
      const response = await fetch('http://localhost:5000/api/photos', {
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
        setFiles([]);
        setUrl('');
      } else {
        console.error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="upload-section">
      <div className="logo">
      <img src={LogoIcon} alt="Logo Icon" className="logo-icon" /> 
      <h2>SNAPIFY</h2>
        </div>
        <h2 className="upload-title">Upload here your photo</h2>
        <p className="upload-info">PNG, JPG, JPEG any size</p>
        <form onSubmit={handleSubmit} className="upload-form">
          <input type="file" onChange={handleFileChange} multiple />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          <label htmlFor="url">Insert your URL here:</label>
          <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit" className="upload-button">Upload</button>
        </form>
      </div>
  );
};

export default PhotoUploadForm;
