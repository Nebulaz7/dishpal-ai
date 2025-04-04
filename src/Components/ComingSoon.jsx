import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './ComingSoon.css';
import logo from '../assets/dishpal-logo-favico.png'; // Adjust path as needed

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call to join waitlist
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // In a real app, you would send this to your backend
      console.log("Email submitted:", email);
    }, 1500);
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-overlay"></div>
      
      <div className="coming-soon-content">
        <Link to="/" className="coming-soon-logo">
          <img src={logo} alt="DishPal Logo" />
          <h2>DishPal</h2>
        </Link>
        
        <h1 className="coming-soon-title">Coming Soon</h1>
        
        <div className="coming-soon-message">
          <p>We're working hard to bring you amazing new features!</p>
          <p>This page is currently under development. Join our waitlist to be the first to know when we launch.</p>
        </div>
        
        {!submitted ? (
          <div className="waitlist-container">
            <h3>Join Our Waitlist</h3>
            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={loading}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? <span className="loading-spinner"></span> : 'Join Waitlist'}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>You're on the list!</h3>
            <p>Thank you for joining our waitlist. We'll notify you when we launch.</p>
          </div>
        )}
        
        <div className="countdown-container">
          <h3>Launching In</h3>
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-number">14</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">08</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">23</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">47</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
        
        <div className="return-home">
          <Link to="/">← Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;