import React from 'react';
import Header from './views/Header';
import MapComponent from './components/MapComponent';
import PhotoGrid from './views/PhotoGrid';
import PhotoUploadForm from './components/PhotoUploadForm';
import UploadedImagePreview from './views/UploadedImagePreview';
import FrontPage from './views/FrontPage';
import './App.css';

console.log(FrontPage);

function App() {
  return (
    <>
    <FrontPage />
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} SNAPIFY - a 
    <a href="https://github.com/MaryRinaldi" target="_blank">
    </a> MaryRinaldi's <i class="fab fa-github"></i> project. All rights reserved.</p></div>
    </>
  );
}

export default App;
