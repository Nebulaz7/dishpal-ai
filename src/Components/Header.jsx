// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
            <h3 className="logo-text">  DishPal</h3>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/blog" className="nav-link">Blog</Link>

          <div className="cta-container">
            <Link to="/coming-soon" className="cta-button custom-link">Join Waitlist</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;