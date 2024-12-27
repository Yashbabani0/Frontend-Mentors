import React, { useState } from "react";
import images from "./Imgsimports.jsx";
import { useCartLogic } from "../Logic.jsx";
import CartPopup from "./Cartpopup.jsx";

export default function Mobilemenu() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const { cartCount } = useCartLogic();
  return (
    <div className="md:hidden flex items-center justify-between w-screen h-20 p-4 px-8">
      <div className="flex items-center justify-center gap-8 h-full w-1/2">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn bg-transparent border-none drawer-button min-w-[1.1em] hover:bg-transparent min-h-[1.1em] p-0 cursor-pointer flex items-center"
            >
              <img src={images.iconMenu} alt="" className="min-w-[0.7em]" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white text-base text-very-dark-blue font-semibold min-h-full w-60 p-10">
              <li>
                <a>Collections</a>
              </li>
              <li>
                <a>Men</a>
              </li>
              <li>
                <a>Women</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <img src={images.logo} alt="" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="relative dropdown">
          <img
            src={images.iconCart}
            alt=""
            className="cursor-pointer"
            role="button"
            onClick={toggleCart}
          />
          <CartPopup isCartOpen={isCartOpen} />
          <span className="absolute top-0 right-0 bg-orange w-4 h-3 rounded-lg text-[8px] text-pale-orange flex items-center justify-center">
            {cartCount}
          </span>
        </div>
        <img src={images.imageAvatar} className="w-8" alt="" />
      </div>
    </div>
  );
}
