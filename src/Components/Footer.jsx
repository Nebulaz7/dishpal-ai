import React from 'react';
import './Footer.css';
import logo from '../assets/dishpal-logo-favico.png'; 
import xtwitter from '../assets/xtwitter.svg'
import github from '../assets/github.svg'
import linkedIn from '../assets/linkedin.svg'



const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <img src={logo} alt="DishPal Logo" />
            <h3>DishPal</h3>
          </div>
          <p className="tagline">Create delicious recipes in seconds with the power of AI.</p>
          <div className="social-links">
            <p>Contact Us</p>
            <a href="https://x.com/joshpet77" aria-label="X" className="social-icon">
              <img src={xtwitter} alt="" />
            </a>
            <a href="https://github.com/Nebulaz7" aria-label="Github" className="social-icon">
            <img src={github} alt="" />
            </a>
            <a href="https://nebulaz7.github.io" aria-label="Linked-In" className="social-icon">
            <img src={linkedIn} alt="" />
            </a>
          </div>
        </div>
        
        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/coming-soon">About Us</a></li>
            <li><a href="#Recipes">Popular Recipes</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section links-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><a href="/coming-soon">Breakfast</a></li>
            <li><a href="/coming-soon">Lunch</a></li>
            <li><a href="/coming-soon">Dinner</a></li>
            <li><a href="/coming-soon">Desserts</a></li>
            <li><a href="/coming-soon">Vegetarian</a></li>
          </ul>
        </div>
        
        <div className="footer-section newsletter-section">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest recipes and cooking tips.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              aria-label="Email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} DishPal. All rights reserved. Created with ❤ by Peters Joshua.</p>
        <div className="footer-bottom-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;