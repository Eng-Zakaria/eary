import React from 'react';
import './style/header.css';

function Header() {
  return (
    <div className="header">
      <h1>My App</h1>
      <nav>
        <ul>
          {/* <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Header;