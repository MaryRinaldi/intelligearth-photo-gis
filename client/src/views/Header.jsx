import React from 'react';
import SearchBar from '../views/Searchbar';
import SocialMediaIcon from '../assets/Social-Media-People-Doodles.jpg';
import LogoIcon from '../assets/Logo.png'
import PhotoUploadForm from '../components/PhotoUploadForm';

const Header = () => (
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
    <div className="header-bottom">
      <div className="container">
        <div className="upload-section">
          <div className="upload-buttons">
          <div className="upload-icon">
  <svg viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" fill="#49779c" width="39px" height="45px">
    <path d="M12 6.5h-1.5v4h-4v1.5h4v4h1.5v-4h4v-1.5h-4v-4z"/>
  </svg>
</div>
            <h3 className="upload-title">Upload a Photo</h3>
            <p className="upload-info">PNG, JPG, JPEG up to 5MB</p>
            <button className="upload-button">Upload</button>
            <p className="drag-info">or drag and drop your photo here</p>
          </div>
          <SearchBar />
          <PhotoUploadForm />
        </div>
       
      </div>
    </div>
  </header>
);

export default Header;
