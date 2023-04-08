import React from "react";
import logo from "../../asset/logo.jpg";
import "./style/header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Eary" />
          <span className="logo-text"> Eary</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Study
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Games
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Create
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Upgrade
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Sign In
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
