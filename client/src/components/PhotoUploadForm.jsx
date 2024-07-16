import React, { useState } from 'react';
import LogoIcon from '../assets/Logo.png';

const PhotoUploadForm = ({ onPhotoUpload, setUploadedImageUrl }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [url, setUrl] = useState('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');

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
      alert('Lat e Long must be valid numbers!')
      return;
    }

    // Verifica che i campi obbligatori siano presenti
    if (!title || !description || !url) {
      console.error('Missing required fields:', { title, description, latitude, longitude, url });
      alert('All fields are required!')
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
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        
        // Verifica che la risposta contenga sia 'id' che 'values'
        if (responseData.id && responseData.values && responseData.values.length > 4) {
          const uploadedUrl = responseData.values[4]; // Assume che 'url' sia il quinto elemento in 'values'
          
          if (uploadedUrl) {
            console.log('Photo URL:', uploadedUrl);
            setUploadedImageUrl(uploadedUrl); // Imposta l'URL dell'immagine caricata in App.jsx
            onPhotoUpload(uploadedUrl);
            
            // Reimposta i campi del form dopo il caricamento
            setTitle('');
            setDescription('');
            setLatitude('');
            setLongitude('');
            setUrl('');
          } else {
            console.error('Photo URL not found in response data');
          }
        } else {
          console.error('Unexpected response structure:', responseData);
        }
      } else {
        console.error('Failed to upload photo');
        alert('Failed to upload photo!')
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo!')
    }
  };

  return (
    <div className="upload-section">
      <div className="logo">
        <img src={LogoIcon} alt="Logo Icon" className="logo-icon" /> 
        <h2>SNAPIFY</h2>
      </div>
      <h2 className="upload-title">Upload your photo here</h2>
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
