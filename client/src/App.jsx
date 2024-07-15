import React, { useState } from 'react';
import Header from './views/Header';
import MapComponent from './components/MapComponent';
import PhotoGrid from './views/PhotoGrid';
import PhotoUploadForm from './components/PhotoUploadForm'
import './App.css';

const mockPhotos = [
  {
    id: 1,
    title: 'Photo 1',
    description: 'Description 1',
    latitude: 41.9028,
    longitude: 12.4964,
    url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tYXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    title: 'Photo 2',
    description: 'Description 2',
    latitude: 40.9038,
    longitude: 12.4965,
    url: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWF8ZW58MHx8MHx8fDA%3D%3D'
  },
];

function App({onPhotoUpload}) {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handlePhotoUpload = async (photoUrl) => {
    const newPhoto = {
      title: 'Uploaded Photo',
      description: 'This is an uploaded photo',
      latitude: 0, 
      longitude: 0, 
      url: photoUrl,
    };
    const response = await fetch('http://localhost:5000/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhoto),
    });
  
    if (response.ok) {
      const uploadedPhoto = await response.json();
      setUploadedPhotos([...uploadedPhotos, uploadedPhoto]);
    }
  };

  return (
    <div className="App">
      <Header onPhotoUpload={handlePhotoUpload} />
      <PhotoUploadForm onPhotoUpload={onPhotoUpload} />
      <MapComponent photos={mockPhotos} />
      <PhotoGrid photos={[...uploadedPhotos, ...mockPhotos]} />
    </div>
  );
}

export default App;
