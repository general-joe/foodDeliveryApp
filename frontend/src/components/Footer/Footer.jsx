import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer flex flex-col justify-center" id="footer">
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
        <div className="footer-content-center w-full pl-5">
          <h2>COMPANY</h2>
          <ul>
            <li className="hover:underline">
              <a href="/">Home</a>
            </li>
            <li className="hover:underline">
              <a href="/about-us">About Us</a>
            </li>
            <li className="hover:underline">
              <a href="/cart">Your orders</a>
            </li>
            <li className="hover:underline">
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-content-right w-full pl-5">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+233256515516</li>
            <li>+233245962091</li>
            <li>group8@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright text-center w-full">
        <span>Copyright 2024 &copy;Tomato.com-All Right Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
