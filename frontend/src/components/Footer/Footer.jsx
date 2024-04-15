import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      className="text-gray-400 bg-gray-800 flex flex-col justify-center gap-5 p-5  max-lg:p-3 pt-20 mt-24"
      id="footer"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-20 max-lg:gap-10">
        <div className="flex flex-col items-start gap-5">
          <img
            src={assets.logo}
            alt=""
            className=" h-20 w-full max-lg:w-full max-md:w-full max-sm:w-full"
          />
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            debitis ratione tenetur, eos hic fuga soluta animi esse, obcaecati
            inventore aliquid, eligendi repellendus tempora! Velit doloremque
            quaerat distinctio enim voluptatum!
          </p>
          <div className="flex items-center gap-3">
            <img src={assets.facebook_icon} alt="" className="w-10 h-10" />
            <img src={assets.twitter_icon} alt="" className="w-10 h-10" />
            <img src={assets.linkedin_icon} alt="" className="w-10 h-10" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 w-full pl-5 max-lg:p-0">
          <h2 className="text-white">COMPANY</h2>
          <ul className="space-y-2">
            <li className="hover:underline">
              <a href="/" className="text-gray-300">
                Home
              </a>
            </li>
            <li className="hover:underline">
              <a href="/about-us" className="text-gray-300">
                About Us
              </a>
            </li>
            <li className="hover:underline">
              <a href="/cart" className="text-gray-300">
                Your orders
              </a>
            </li>
            <li className="hover:underline">
              <a href="#contact-us" className="text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5 w-full pl-5 max-lg:p-0">
          <h2 className="text-white">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li className="text-gray-300">+233256515516</li>
            <li className="text-gray-300">+233245962091</li>
            <li className="text-gray-300">group8@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-0.5 my-5 bg-gray-400 border-none" />
      <div className="text-center w-full">
        <span className="text-gray-300">
          Copyright 2024 &copy;aduanepafie.com- All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
