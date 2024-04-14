import { useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { reset, resetData } from "../../appSetup/slices/admin";
import { useDispatch } from "react-redux";
import { RiAccountCircleFill } from "react-icons/ri";

const Navbar = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("home");
  const { admin } = useSelector((state) => state.admin);
  console.log(admin);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        {admin?.role === "ADMIN" || admin?.role === "admin" ? (
          <a
            href="/admin-dashboard"
            onClick={() => setMenu("admin-dashboard")}
            className=""
          >
            Dashboard
          </a>
        ) : (
          ""
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
        </div>
        {admin ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <RiAccountCircleFill className="w-10 h-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p>{admin?.username}</p>
              </li>
              <li>
                <p>{admin?.email}</p>
              </li>
              <li>
                <p>
                  <button className="" onClick={() => dispatch(resetData())}>
                    Logout
                  </button>
                </p>
              </li>
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
