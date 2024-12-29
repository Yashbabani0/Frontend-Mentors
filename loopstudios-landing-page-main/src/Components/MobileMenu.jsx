import React from "react";
import { icons } from "./Imgimports";

export default function MobileMenu() {
  return (
    <div className="md:hidden relative">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
            <img src={icons.iconHamburger} alt="" />
          </label>
        </div>
        <div className="drawer-side">
          <ul className="menu bg-base-200 text-base-content min-h-full w-full p-8">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay flex items-center w-full justify-end"
            >
              <img
                src={icons.iconClose}
                className="w-[1.5em] pb-16 cursor-pointer"
                alt=""
              />
            </label>
            <li>
              <a className="cursor-pointer uppercase text-2xl text-white font-light">
                About
              </a>
            </li>
            <li>
              <a className="cursor-pointer uppercase text-2xl text-white font-light">
                Careers
              </a>
            </li>
            <li>
              <a className="cursor-pointer uppercase text-2xl text-white font-light">
                Events
              </a>
            </li>
            <li>
              <a className="cursor-pointer uppercase text-2xl text-white font-light">
                Products
              </a>
            </li>
            <li>
              <a className="cursor-pointer uppercase text-2xl text-white font-light">
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
