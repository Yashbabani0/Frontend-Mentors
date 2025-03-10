import React from "react";
import Button from "./Button";
function Footer() {
  return (
    <div className="bg-Very-Dark-Blue w-screen text-white p-8 lg:flex lg:flex-row-reverse items-center justify-evenly lg:items-start lg:pt-16">
      <div className="flex items-center justify-between gap-4 flex-col">
        <div className="flex items-center justify-center gap-4 lg:mb-16">
          <input
            type="text"
            placeholder="Updates in your inbox..."
            className="rounded-full px-4 py-2 border-0 bg-white text-Very-Dark-Blue"
          />
          <Button text="Go" />
        </div>

        <div className="hidden lg:block text-left">
          <p>Copyright 2024. All Rights Reserved</p>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 my-8 lg:my-0 lg:gap-16 text-left">
        <ul className="flex items-start justify-start gap-4 flex-col my-8 lg:my-0 text-left">
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Home
          </li>
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Pricing
          </li>
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Products
          </li>
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            About Us
          </li>
        </ul>
        <ul className="flex items-start justify-start gap-4 flex-col my-8 lg:my-0 text-left">
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Careers
          </li>
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Community
          </li>
          <li className="cursor-pointer hover:text-Bright-Red transition-all duration-300">
            Privacy Policy
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 ">
        <div className="flex items-center justify-center gap-8">
          <i className="fa-brands fa-square-facebook cursor-pointer hover:text-Bright-Red transition-all duration-300 text-xl"></i>
          <i className="fa-brands fa-youtube bg-white rounded-full p-1 text-Very-Dark-Blue cursor-pointer hover:text-Bright-Red transition-all duration-300"></i>
          <i className="fa-brands fa-twitter cursor-pointer hover:text-Bright-Red transition-all duration-300 text-xl"></i>
          <i className="fa-brands fa-pinterest cursor-pointer hover:text-Bright-Red transition-all duration-300 text-xl"></i>
          <i className="fa-brands fa-instagram cursor-pointer hover:text-Bright-Red transition-all duration-300 text-xl"></i>
        </div>
        <img src="/images/footer-logo.svg" alt="" />
      </div>
      <p className="my-8 lg:hidden text-center">
        Copyright 2024. All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
