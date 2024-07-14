// Header.jsx
import React from 'react';
import SocialMediaIcon from '../assets/Social-Media-People-Doodles.jpg';
import LogoIcon from '../assets/Logo.png';
import PhotoUploadForm from '../components/PhotoUploadForm';
import SearchBar from '../views/Searchbar';

const Header = ({ onPhotoUpload }) => (
  <header className="header">
    <div className="header-top">
      <div className="container">
        <div className="logo">
          <img src={LogoIcon} alt="Logo Icon" className="logo-icon" /> 
          <h2>SNAPIFY</h2>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link">Map</a>
          <a href="#" className="nav-link">Gallery</a>
          <a href="#" className="nav-link">Services</a>
          <a href="#" className="nav-link">Contact</a>
          <img src={SocialMediaIcon} alt="Social Media Icon" className="social-media-icon" />
        </nav>
      </div>
    </div>
    <PhotoUploadForm onPhotoUpload={onPhotoUpload} />
    <SearchBar />
  </header>
);

export default Header;