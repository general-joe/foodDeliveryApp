import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";

import SignIn from "./signin";
import SignUp from "./signup";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className="fixed inset-0 z-[1] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-[330px] p-6 bg-white text-gray-800 rounded-lg flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-tomato">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
            className="w-4 cursor-pointer"
          />
        </div>
        {currState === "Login" ? (
          <SignIn setShowLogin={setShowLogin} setCurrState={setCurrState} />
        ) : (
          <SignUp setShowLogin={setShowLogin} setCurrState={setCurrState} />
        )}
      </div>
    </div>
  );
};

export default LoginPopUp;
