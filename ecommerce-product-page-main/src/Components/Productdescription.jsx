import React, { useState } from "react";
import images from "./Imgsimports.jsx";
import { useCartLogic } from "../Logic.jsx";

export default function ProductDescription() {
  const [amount, setAmount] = useState(0);
  const { increment } = useCartLogic();

  const handleIncrement = () => setAmount(amount + 1);
  const handleDecrement = () => {
    if (amount > 0) setAmount(amount - 1);
  };

  const addToCart = () => {
    increment(amount);
    setAmount(0);
  };

  return (
    <div className="flex flex-col gap-4 items-start justify-center p-6 md:w-1/2 lg:px-20">
      <b className="font-bold text-dark-grayish-blue">Sneaker Company</b>
      <h1 className="text-very-dark-blue font-bold text-3xl md:text-4xl lg:text-5xl">
        Fall Limited Edition Sneakers
      </h1>
      <p className="text-dark-grayish-blue text-sm">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they’ll withstand everything the
        weather can offer.
      </p>
      <div className="flex items-center justify-between w-full md:flex-col md:items-start md:gap-4">
        <div className="flex items-center justify-between w-1/3 lg:w-1/4 gap-2">
          <h3 className="text-2xl font-bold text-very-dark-blue">$125.00</h3>
          <p className="bg-very-dark-blue text-pale-orange py-1 px-3 rounded text-xs">
            50%
          </p>
        </div>
        <b className="line-through text-dark-grayish-blue text-sm">$250.00</b>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
        <div className="flex items-center justify-center w-full bg-light-grayish-blue py-2 gap-8 rounded-lg lg:w-1/3">
          <img
            src={images.iconMinus}
            alt="Decrease"
            className="cursor-pointer"
            onClick={handleDecrement}
          />
          <p className="amountOsItemsWillBeAdded">{amount}</p>
          <img
            src={images.iconPlus}
            alt="Increase"
            className="cursor-pointer"
            onClick={handleIncrement}
          />
        </div>
        <button
          className="bg-orange rounded-lg w-full py-2 text-light-grayish-blue hover:opacity-70"
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
