import React, { useState } from 'react';
import LogoIcon from '../assets/Logo.png';

const PhotoUploadForm = ({ onPhotoUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [url, setUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      id: Date.now(), // Generate unique ID for each file
      file: file
    }));
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converti latitude e longitude in numeri
    const numLatitude = Number(latitude);
    const numLongitude = Number(longitude);

    // Verifica che siano numeri validi
    if (isNaN(numLatitude) || isNaN(numLongitude)) {
      console.error('Invalid latitude or longitude:', { latitude, longitude });
      return;
    }

    if (!title || !description || !url) {
      console.error('Missing required fields:', { title, description, latitude, longitude, url });
      return;
    }

    const requestData = {
      title: title,
      description: description,
      latitude: numLatitude,
      longitude: numLongitude,
      url: url,
    };

    try {
      const response = await fetch('http://localhost:5000/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      console.log('Latitude:', numLatitude);
console.log('Longitude:', numLongitude);
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        
        if (responseData.url) {
          console.log('Photo URL:', responseData.url);
          onPhotoUpload(responseData.url);
        } else {
          console.error('Photo URL not found in response data');
        }

        setTitle('');
        setDescription('');
        setLatitude('');
        setLongitude('');
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
