import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import { resetData } from "../../appSetup/slices/admin";
import { useDispatch } from "react-redux";

const Navbar = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("home");
  const { admin } = useSelector((state) => state.admin);
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          {" "}
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
        <a
          href="/about-us"
          onClick={() => setMenu("about-us")}
          className={menu === "about-us" ? "active" : ""}
        >
          About Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
        </div>
        {admin ? (
          <div className="relative">
            <span className="m-1 btn">
              <MdAccountCircle className="w-8 h-8" />
            </span>
            <ul className="p-2 absolute shadow-lg z-[1] bg-base-100 rounded-box w-52">
              <p>Username: {admin?.username}</p>
              <p>Email: {admin?.email}</p>
              <p>
                <button className="" onClick={() => dispatch(resetData())}>
                  Logout
                </button>
              </p>
            </ul>
          </div>
        ) : (
          <>
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
