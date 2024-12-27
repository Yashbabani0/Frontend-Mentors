import React, { useState } from "react";
import images from "./Imgsimports.jsx";
import { useCartLogic } from "../Logic.jsx";
import CartPopup from "./Cartpopup.jsx";

export default function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const { cartCount } = useCartLogic();
  return (
    <div className="hidden md:flex w-screen items-center justify-between px-20 py-8">
      <div className="flex gap-16 items-center justify-center">
        <img src={images.logo} alt="" />
        <div className="flex items-center justify-center gap-4">
          <p className="cursor-pointer text-sm text-dark-grayish-blue hover:text-very-dark-blue hover:border-b-2 border-orange">
            Collections
          </p>
          <p className="cursor-pointer text-sm text-dark-grayish-blue hover:text-very-dark-blue hover:border-b-2 border-orange">
            Men
          </p>
          <p className="cursor-pointer text-sm text-dark-grayish-blue hover:text-very-dark-blue hover:border-b-2 border-orange">
            Women
          </p>
          <p className="cursor-pointer text-sm text-dark-grayish-blue hover:text-very-dark-blue hover:border-b-2 border-orange">
            Contact
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="relative dropdown">
          <img
            src={images.iconCart}
            alt=""
            className="cursor-pointer w-7"
            role="button"
            onClick={toggleCart}
          />
          <CartPopup isCartOpen={isCartOpen} />
          <span className="absolute top-0 right-0 bg-orange w-5 h-4 rounded-lg text-[10px] text-pale-orange flex items-center justify-center">
            {cartCount}
          </span>
        </div>
        <img
          src={images.imageAvatar}
          className="w-12 hover:cursor-pointer hover:border-2 rounded-full border-orange"
          alt=""
        />
      </div>
    </div>
  );
}
