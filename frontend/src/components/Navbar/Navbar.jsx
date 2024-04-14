import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAccountCircle } from "react-icons/md";

import { useDispatch } from "react-redux";

import { logoutUser } from "../../appSetup/hook/user.slice";

const Navbar = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("home");
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

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
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <span>{cartItems?.length}</span>
        </div>
        {user?.id ? (
          <div className="relative flex">
            <span className="m-1 btn">
              <MdAccountCircle className="w-8 h-8" />
            </span>
            <ul className="p-2 absolute shadow-lg z-[1] bg-base-100 rounded-box w-52">
              <p>Username: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>
                <button
                  className=""
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                >
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
