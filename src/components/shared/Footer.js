import React from "react";
import "./style/footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>Project name &copy; 2023</p>
      <ul>
        <li>
          <a href="#">Link 1</a>
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
        <li>
          <a href="#">Link 3</a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
