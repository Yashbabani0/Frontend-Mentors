import logo from "/images/logo.svg";
import Button from "./Button";
import menu from "/images/icon-hamburger.svg";
import close from "/images/icon-close.svg";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between lg:justify-evenly w-full z-30 px-4 py-8 md:px-8 lg:px-16 lg:py-10">
      <img src={logo} alt="" />
      <ul className="hidden lg:flex items-center justify-center gap-8 font-medium text-Dark-Blue">
        <li className="hover:text-Dark-Grayish-Blue cursor-pointer">Pricing</li>
        <li className="hover:text-Dark-Grayish-Blue cursor-pointer">Product</li>
        <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
          About Us
        </li>
        <li className="hover:text-Dark-Grayish-Blue cursor-pointer">Careers</li>
        <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
          Community
        </li>
      </ul>
      <div className="hidden lg:block">
        <Button />
      </div>
      <div className="lg:hidden">
        <img
          src={menu}
          alt=""
          className={`cursor-pointer ${isOpen ? "hidden" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-Very-Dark-Blue/50 flex items-center justify-center z-50">
            <div className="absolute top-8 right-8">
              <img
                src={close}
                alt=""
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <ul className="flex flex-col gap-4 bg-white p-8 rounded-lg text-Dark-Blue text-2xl font-medium text-center w-full mx-8">
              <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
                Pricing
              </li>
              <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
                Product
              </li>
              <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
                About Us
              </li>
              <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
                Careers
              </li>
              <li className="hover:text-Dark-Grayish-Blue cursor-pointer">
                Community
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
