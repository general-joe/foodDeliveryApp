import { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAccountCircle, MdFoodBank } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logoutUser } from "../../appSetup/hook/user.slice";
import { RiMenuLine } from "react-icons/ri";
import classNames from "classnames";
import { navbarData } from "./navbar-data";
import Avatar from "../avatar";
import { RxHamburgerMenu } from "react-icons/rx";
export const getTotalQty = (products) => {
  return products?.reduce(
    (accumulator, product) => accumulator + Number(product.quantity),
    0
  );
};
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
      <ul className="navbar-menu max-[999px]:hidden max-xl:hidden">
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
        {user?.role === "Admin" ? (
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
        <div className="relative p-3 max-[999px]:hidden">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <span className="absolute top-0 right-0 rounded-full bg-[#E96813] text-white badge-md ">
            {getTotalQty(cartItems)}
          </span>
        </div>
        {user?.id ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 btn">
              <MdAccountCircle className="w-8 h-8" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
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
          <button
            onClick={() => setShowLogin(true)}
            className="max-[999px]:hidden"
          >
            Sign In
          </button>
        )}
        <MobileViewNavbar setShowLogin={setShowLogin} setMenu={setMenu} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileViewNavbar = ({ setShowLogin, setMenu }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-[999px]:hidden">
      <div className="dropdown dropdown-end">
        {/* Icon */}
        <div className="btn btn-ghost">
          <RxHamburgerMenu fontSize={25} tabIndex={0} className="" />
        </div>
        <ul
          className="flex flex-col menu dropdown-content w-52 bg-base-200 z-[1] mt-5 rounded-box "
          tabIndex={0}
        >
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li className="">
            <Link to="#explore-menu">Menu</Link>
          </li>
          <li className="">
            <Link to="#app-download">Mobile App</Link>
          </li>
          <li className="">
            <Link to="#footer">Contact Us</Link>
          </li>
          <li className="">
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            {user?.role === "Admin" ? (
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
          </li>
          <li>
            <div className="relative p-3 max-[999px]:hidden">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="" />
              </Link>
              <span className="absolute top-0 right-0 rounded-full bg-[#E96813] text-white badge-md ">
                {getTotalQty(cartItems)}
              </span>
            </div>
          </li>
          <li>
            {user?.id ? (
              <div className="flex flex-col items-start">
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
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="min-[999px]:hidden"
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <nav className="w-64 h-full bg-[#E96813] text-white flex px-4 py-5 flex-col gap-0 mx-0">
      <div className="w-36 h-36 mx-0 bg-[#E96813] rounded-lg mt-5">
        {/* Header */}
        <Link to="/">
          <MdFoodBank className="w-full h-full " />
          <p className="py-2 text-xl font-medium">Admin Portal</p>
        </Link>
      </div>
      {/* Links */}
      <div className="flex-col items-start justify-start flex-1 w-full py-1 mx-auto mt-10">
        {navbarData.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            className={classNames(
              "flex items-center justify-start w-full h-12 rounded-lg my-2",
              {
                "text-gray-600 transition-all duration-500 ease-in-out  bg-gray-300":
                  location.pathname === item.url,
                "text-gray-300": location.pathname !== item.url,
              }
            )}
          >
            <span className="pl-2">{item.title}</span>
          </Link>
        ))}
      </div>
      {/* User Account */}
      <div className="w-full ">
        {/* Avatar icon */}
        <Avatar data={user} onLogout={handleLogout} />
      </div>
    </nav>
  );
};

const MobileNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    // Main navbar
    <nav className="w-full h-16 bg-[#aa6232] text-white flex px-5 py-5 items-center justify-between">
      <div className="flex items-center max-md:justify-start">
        <MdFoodBank className="w-16 h-16 max-md:w-16 max-md:h-16 max-[399px]:w-16 max-[399px]:h-16" />
        <button
          onClick={() => navigate("/")}
          className="font-medium text-3xl btn btn-ghost max-md:text-xl max-[399px]:text-lg"
        >
          Admin Portal
        </button>
      </div>
      {/* Menu dropdown */}
      <details className="dropdown dropdown-bottom dropdown-end">
        <summary className="m-1 btn btn-ghost">
          <RiMenuLine fontSize={30} />
        </summary>
        <ul className="p-1 shadow-2xl menu dropdown-content z-[1] bg-base-100 mt-1 rounded-box w-96 max-[399px]:w-52 h-max">
          {navbarData.map((item) => (
            <li
              key={item.id}
              className="py-2 text-[17px] max-[399px]:text-sm max-[399px]:p-0"
            >
              <Link to={item.url} className="text-black ">
                {item.title}
              </Link>
            </li>
          ))}
          <li className="text-black">
            <Avatar data={user} onLogout={handleLogout} />
          </li>
        </ul>
      </details>
    </nav>
  );
};

export { AdminNavbar, MobileNavbar };
