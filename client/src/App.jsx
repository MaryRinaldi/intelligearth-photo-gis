import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Hamburger from './components/HamburgerMenu';
import Header from './views/Header';
import MapComponent from './components/MapComponent';
import PhotoGrid from './views/PhotoGrid';
import PhotoUploadForm from './components/PhotoUploadForm';
import UploadedImagePreview from './views/UploadedImagePreview';
import FrontPage from './views/FrontPage';
import './App.css';
import './Media-related.css';

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

function App() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handlePhotoUpload = (url) => {
    setUploadedImageUrl(url);
  };

  useEffect(() => {
    fetch('/api/photos')
      .then(response => response.json())
      .then(data => setUploadedPhotos(data))
      .catch(error => console.error('Error fetching uploaded photos:', error));
  }, []);

  return (
    <>
    <Header />
    <Routes>
    <Route path="/" element={<FrontPage mockPhotos={mockPhotos} uploadedPhotos={uploadedPhotos} />} />
        <Route path="/gallery" element={<PhotoGrid photos={uploadedPhotos} />} />
        <Route path="/map" element={<MapComponent photos={[...mockPhotos, ...uploadedPhotos]} />} />
      {/* <Route path="/profilepage" element={<Private> <ProfilePage/> </Private>} /> */}
    </Routes>
    
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} SNAPIFY - a 
    <a href="https://github.com/MaryRinaldi" target="_blank">
    </a> MaryRinaldi's <i className="fab fa-github"></i> project. All rights reserved.</p></div>
    </>
  );
}

export default App;
