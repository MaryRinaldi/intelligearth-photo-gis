import React, { useState } from 'react';
import LogoIcon from '../assets/Logo.png'; 

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum file size limit set to 5MB

const PhotoUploadForm = ({ onPhotoUpload, setUploadedImageUrl }) => {
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState(''); 
  const [url, setUrl] = useState(''); 
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handler for file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Filter files exceeding max size
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);

    if (validFiles.length !== files.length) {
      alert('Select a picture MAX. 5MB.');
    }

    // Reading valid files as data URLs
    const fileReaders = validFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ id: Date.now(), file: reader.result });
        reader.onerror = error => reject(error);
      });
    });

    Promise.all(fileReaders)
      .then(files => setSelectedFiles(files))
      .catch(error => console.error('Error reading files:', error));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const numLatitude = Number(latitude);
    const numLongitude = Number(longitude);

    // Validation for latitude and longitude
    if (isNaN(numLatitude) || isNaN(numLongitude)) {
      console.error('Invalid latitude or longitude:', { latitude, longitude });
      alert('Lat e Long must be valid numbers!');
      return;
    }

    // Validation for required fields
    if (!title || !description || (!url && selectedFiles.length === 0)) {
      console.error('Missing required fields:', { title, description, latitude, longitude, url });
      alert('All fields are required!');
      return;
    }

    // Constructing request data object
    const requestData = {
      title,
      description,
      latitude: numLatitude,
      longitude: numLongitude,
      url,
      files: selectedFiles.length > 0 ? selectedFiles.map(file => file.file) : null,
    };

    try {
      // Sending POST request to upload photo data
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

        // Handling successful upload response
        if (responseData.url) {
          setUploadedImageUrl(responseData.url);
          onPhotoUpload(responseData.url);

          // Resetting form fields and selected files
          setTitle('');
          setDescription('');
          setLatitude('');
          setLongitude('');
          setUrl('');
          setSelectedFiles([]);
        } else {
          console.error('Photo URL not found in response data');
        }
      } else {
        console.error('Failed to upload photo');
        alert('Failed to upload photo!');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo!');
    }
  };

  // JSX rendering for the PhotoUploadForm
  return (
    <div className="upload-section">
      <div className="logo">
        <img src={LogoIcon} alt="Logo Icon" className="logo-icon" />
        <h2>SNAPIFY</h2>
      </div>
      <h2 className="upload-title">Upload your photo here</h2>
      <p className="upload-info">PNG, JPG, JPEG any size (max 5MB)</p>
      <form onSubmit={handleSubmit} className="upload-form">
        {/* Input fields for photo details */}
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        <label htmlFor="url">Insert your URL here:</label>
        {/* <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} /> */}
        {/* File input field */}
        <input type="file" onChange={handleFileChange} multiple />
        {/* Submit button */}
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default PhotoUploadForm;
