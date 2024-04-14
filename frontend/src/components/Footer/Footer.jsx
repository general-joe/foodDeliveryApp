import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-lift">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            debitis ratione tenetur, eos hic fuga soluta animi esse, obcaecati
            inventore aliquid, eligendi repellendus tempora! Velit doloremque
            quaerat distinctio enim voluptatum!
          </p>
          <div className="footer-social-icons flex items-center gap-3">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+233256515516</li>
            <li>+233245962091</li>
            <li>group8@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy;Tomato.com-All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
