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

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<FrontPage />}/>
      <Route path="/gallery" element={<PhotoGrid/>}/>
      <Route path="/map" element={<MapComponent/>}/>
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
