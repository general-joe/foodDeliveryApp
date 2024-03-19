import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile-App</li>
        <li>Contact Us</li>
      </ul>
      <dev className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <dev className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <dev className="dot"></dev>
        </dev>
        <button>Sign In</button>
      </dev>
    </div>
  );
};

export default Navbar;
