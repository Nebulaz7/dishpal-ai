import React from "react";

import './Header.css';


const Header = () => {
  return (
      <div>
        <header>
        <nav>
          
          <img src="./src/assets/dishpal-logo-main.png" alt="Dishpal logo"/>

          <a href="#">About us</a>
          <a href="#">Pricing</a>
          <a href="#">Contact Us</a>
          <a href="#">Blog</a>
            
            <button>Join waitlist</button>
          </nav>
          </header>
      </div>
  )
}

export default Header; 