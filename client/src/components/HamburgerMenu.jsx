import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../App.css'; 

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [timerId, setTimerId] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    resetTimer();
  };

  const closeMenu = () => {
    setIsOpen(false);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      setIsOpen(false);
    }, 5000); // Chiude il menu dopo 5 secondi di inattività
    setTimerId(newTimerId);
  };

  // Resetta il timer quando il componente si monta
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
    closeMenu(); 
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-links">
          <Link to="/home" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/map" className="nav-link" onClick={closeMenu}>Map</Link>
          <Link to="/gallery" className="nav-link" onClick={closeMenu}>Gallery</Link>
          <Link to="/profile" className="nav-link" onClick={closeMenu}>Profile</Link>
          <Link to='/' className="nav-link" onClick={handleLogout}>Logout </Link>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
