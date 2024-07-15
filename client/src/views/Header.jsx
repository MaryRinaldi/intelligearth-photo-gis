import React from 'react';
import SocialMediaIcon from '../assets/Social-Media-People-Doodles.jpg';
import LogoIcon from '../assets/Logo.png';
import Hamburger from '../components/HamburgerMenu';

const Header = () => (
  <header className="header">
        <nav className="nav-links">
        <Hamburger />
        <img src={SocialMediaIcon} alt="Social Media Icon" className="social-media-icon" />
        </nav>
  </header>
);

export default Header;
