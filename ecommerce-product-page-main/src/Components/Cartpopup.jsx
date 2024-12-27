import React from "react";
import images from "./Imgsimports.jsx";
import { useCartLogic } from "../Logic.jsx";

export default function CartPopup({ isCartOpen }) {
  const { cartCount, deleteCartItem } = useCartLogic();

  const totalAmount = 125 * cartCount;

  return (
    <div
      className={`shadow-2xl bg-white absolute w-[23em] h-[10em] top-[110%] right-[-50px] md:right-0 p-4 px-8 rounded-lg z-[999] mt-4 transition-all duration-300 ${
        isCartOpen ? "block" : "hidden"
      }`}
    >
      <div className="border-b-2">
        <p className="font-bold text-2xl text-very-dark-blue pb-2">Cart</p>
      </div>
      {cartCount === 0 ? (
        <div className="emptyCart pt-8 w-full h-full items-center justify-center text-center pb-8">
          Your cart is empty.
        </div>
      ) : (
        <div className="filledCart flex items-center justify-center py-4 gap-4">
          <div>
            <img
              src={images.imageProduct1Thumbnail}
              className="w-[3.5em] rounded-md"
              alt=""
            />
          </div>
          <div>
            <p className="text-[0.9em]">Fall Limited Edition Sneakers</p>
            <div className="flex gap-2 items-center justify-start">
              <p className="text-[0.7em] font-semibold">
                $125 <span>x {cartCount}</span>
              </p>
              <p className="text-[0.8em] font-bold text-very-dark-blue">${totalAmount}</p>
            </div>
          </div>
          <div>
            <img
              src={images.iconDelete}
              onClick={deleteCartItem}
              className="cursor-pointer"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}
