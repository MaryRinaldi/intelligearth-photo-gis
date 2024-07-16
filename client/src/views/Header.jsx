import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaIcon from '../assets/Social-Media-People-Doodles.jpg';
import Hamburger from '../components/HamburgerMenu';

function Header () {
  return (
  <header className="header">
        <nav className="nav-links">
        <Hamburger />
        <img src={SocialMediaIcon} alt="Social Media Icon" className="social-media-icon" />
        </nav>
  </header>
  );
}

export default Header;
