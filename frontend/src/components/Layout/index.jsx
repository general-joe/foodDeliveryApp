import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import Footer from "../Footer/Footer";

function Layout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
