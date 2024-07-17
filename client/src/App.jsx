import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './views/Header'; // Importing header component
import MapComponent from './components/MapComponent'; // Importing map component
import PhotoGrid from './views/PhotoGrid'; // Importing photo grid view
import PhotoUploadForm from './components/PhotoUploadForm'; // Importing photo upload form component
import FrontPage from './views/FrontPage'; // Importing front page view
import './App.css'; // Importing main CSS styles
import './Media-related.css'; // Importing media-related CSS styles

const mockPhotos = [
  {
    id: 1,
    title: 'Photo 1',
    description: 'Description 1',
    latitude: 41.9038,
    longitude: 12.4964,
    url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tYXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    title: 'Photo 2',
    description: 'Description 2',
    latitude: 41.8748,
    longitude: 12.4665,
    url: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWF8ZW58MHx8MHx8fDA%3D%3D'
  },
];

function App() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]); 
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [lastUploadedUrl, setLastUploadedUrl] = useState(''); 

  // Handler for photo upload
  const handlePhotoUpload = (url) => {
    setLastUploadedUrl(url);
    setUploadedPhotos([...uploadedPhotos, { id: Date.now(), title:'Photo title', description:'Photo description', latitude: 0, longitude: 0, url}]);
  };

  // Fetch uploaded photos from server on component mount
  useEffect(() => {
    fetch('/api/photos')
      .then(response => response.json())
      .then(data => {
        setUploadedPhotos(data);
        if (data.length > 0) {
          setLastUploadedUrl(data[data.length - 1].url); // Set last uploaded URL
        }
      })
      .catch(error => console.error('Error fetching uploaded photos:', error));
  }, []);

  return (
    <>
      <Header /> 
      <Routes>
        {/* Routes for different views */}
        <Route path="/" element={<FrontPage mockPhotos={mockPhotos} photos={[...mockPhotos, ...uploadedPhotos]} uploadedPhotos={uploadedPhotos} lastUploadedUrl={lastUploadedUrl} />} />
        <Route path="/gallery" element={<PhotoGrid photos={uploadedPhotos} />} />
        <Route path="/map" element={<MapComponent photos={uploadedPhotos} lastUploadedUrl={lastUploadedUrl} setLastUploadedUrl={setLastUploadedUrl} />} />
        {/* <Route path="/profilepage" element={ <ProfilePage/>} /> */}
        <Route path='/photoupload' element={<PhotoUploadForm onPhotoUpload={handlePhotoUpload} />} />
      </Routes>

      <div className="footer">
        <p>&copy; {new Date().getFullYear()} SNAPIFY - a 
          <a href="https://github.com/MaryRinaldi" target="_blank"> MaryRinaldi's <i className="fab fa-github"></i> project.</a> All rights reserved.</p>
      </div>
    </>
  );
}

export default App;
