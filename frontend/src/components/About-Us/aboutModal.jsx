import React from "react";
import AboutTable from ".";
import { members, assets } from "../../assets/assets";

function AboutModal({ setShowAbout }) {
  return (
    <div className="fixed inset-0 z-[1] bg-black bg-opacity-50 flex flex-col items-center justify-center">
      {/* Table */}
      <div className="sm:w-[600px] w-[22rem] h-[80%] overflow-auto bg-white shadow-lg rounded-xl p-5">
        <div className="flex items-center justify-between">
          {/* Heading */}
          <h1 className="text-xl font-bold">About Us</h1>
          <button
            onClick={() => {
              setShowAbout(false);
            }}
          >
            <img src={assets.cross_icon} alt="cross-icon" className="" />
          </button>
        </div>
        <AboutTable data={members} />
      </div>
    </div>
  );
}

export default AboutModal;
