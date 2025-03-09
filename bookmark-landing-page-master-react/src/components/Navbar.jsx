import React from "react";
import logo from "/public/images/logo-bookmark.svg";
import logoFooter from "/public/images/logo-bookmark-footer.svg";
import menu from "/public/images/icon-hamburger.svg";
import close from "/public/images/icon-close.svg";

import { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between p-8 lg:px-40">
      <img src={logo} alt="logo" />
      <ul className="hidden lg:flex items-center justify-center gap-16 font-medium text-Very-Dark-Blue">
        <li className="hover:text-Soft-Red cursor-pointer transition-colors duration-400">
          Features
        </li>
        <li className="hover:text-Soft-Red cursor-pointer  transition-colors duration-400">
          Pricing
        </li>
        <li className="hover:text-Soft-Red cursor-pointer transition-colors duration-400">
          Contact
        </li>
        <button className="bg-Soft-Red text-white px-10 py-2 rounded-md hover:bg-transparent hover:text-Soft-Red  border-Soft-Red border-2 transition-colors duration-400 cursor-pointer">
          Login
        </button>
      </ul>
      <img
        src={menu}
        alt=""
        className="lg:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div
        className={`mobileNav lg:hidden bg-Very-Dark-Blue/90 w-screen h-screen absolute top-0 left-0 z-10 overflow-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between p-8">
          <img src={logoFooter} alt="logo" />
          <button onClick={() => setIsOpen(false)}>
            <img src={close} alt="" className="cursor-pointer" />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center p-8">
          <li className="text-white text-xl tracking-widest font-light  border-t border-t-Grayish-Blue cursor-pointer hover:text-Soft-Red transition-colors duration-400 w-full py-4 text-center">
            Features
          </li>
          <li className="text-white text-xl tracking-widest font-light border-b border-t border-t-Grayish-Blue border-b-Grayish-Blue cursor-pointer hover:text-Soft-Red transition-colors duration-400 w-full py-4 text-center">
            Pricing
          </li>
          <li className="text-white text-xl tracking-widest font-light border-b  border-b-Grayish-Blue cursor-pointer hover:text-Soft-Red transition-colors duration-400 w-full py-4 text-center">
            Contact
          </li>
          <button className="bg-transparent text-white w-full border-white px-10 py-2 rounded-md hover:bg-transparent hover:text-Soft-Red  hover:border-Soft-Red border-2 transition-colors duration-400 cursor-pointer my-8">
            Login
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
