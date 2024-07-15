import React, { useState } from 'react';
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
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/Map">Map</a>
          <a className="nav-link" href="/Gallery">Gallery</a>
          <a className="nav-link" href="/Profile">Profile</a>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
