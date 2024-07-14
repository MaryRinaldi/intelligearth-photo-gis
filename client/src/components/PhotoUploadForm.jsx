import React, { useState } from 'react';

const PhotoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission logic, like uploading the photo and data to a server
    console.log({
      title,
      description,
      latitude,
      longitude,
      photoFile
    });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setPhotoFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="photo">Photo upload:</label>
        <input type="file" id="photo" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default PhotoUploadForm;
