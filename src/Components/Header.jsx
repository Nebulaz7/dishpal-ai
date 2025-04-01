// Header.jsx
import React, { useState } from "react";
import "./Header.css";

const Header = ({ sourceImg, logoAlt = "Logo" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={sourceImg} alt={logoAlt} className="logo" />
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#contact" className="nav-link">Contact Us</a>
          <a href="#blog" className="nav-link">Blog</a>
        </nav>
        
        <div className="cta-container">
          <button className="cta-button">Join Waitlist</button>
        </div>
      </div>
    </header>
  );
};

export default Header;