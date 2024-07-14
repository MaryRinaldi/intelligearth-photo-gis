import React, { useState } from 'react';
import Header from './views/Header';
import MapComponent from './components/MapComponent';
import PhotoGrid from './views/PhotoGrid';
import './App.css';

function App() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handlePhotoUpload = (photoUrl) => {
    setUploadedPhotos([...uploadedPhotos, photoUrl]);
  };

  return (
    <div className="App">
      <Header onPhotoUpload={handlePhotoUpload} />
      <MapComponent />
      <PhotoGrid photos={uploadedPhotos} />
    </div>
  );
}

export default App;
