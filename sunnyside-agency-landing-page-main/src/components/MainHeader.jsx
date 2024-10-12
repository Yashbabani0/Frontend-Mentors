import React from "react";
import ArrowImg from "../assets/icon-arrow-down.svg";

export default function MainHeader() {
  return (
    <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
      <h1 className="text-6xl font-bold uppercase text-white text-center font-fraunces mb-[0.5em] md:mb-[1em]">
        We are creatives
      </h1>
      <div className="flex justify-center items-center">
        <img src={ArrowImg} alt="Arrow Down" />
      </div>
    </div>
  );
}
