import React from "react";
import Button from "./Button";
function Getstarted() {
  return (
    <div className="flex flex-col items-center justify-center bg-Bright-Red/90 w-full gap-8 lg:px-36 relative z-40 text-white py-16 lg:flex-row lg:justify-between Getstarted">
      <h2 className="text-3xl font-medium lg:w-1/2 text-center px-4 lg:px-0 lg:text-left">
        Simplify how your team works today.
      </h2>
      <button className="bg-Bright-Red text-white px-6 py-2 rounded-full cursor-pointer hover:bg-white hover:text-Bright-Red shadow-xl shadow-Very-Dark-Blue/30 transition-all duration-300">
        Get Started
      </button>
    </div>
  );
}

export default Getstarted;
