import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../App.css'; 

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/map" className="nav-link">Map</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
