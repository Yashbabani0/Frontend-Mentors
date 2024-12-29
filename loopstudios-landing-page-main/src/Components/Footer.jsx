import React from "react";
import { icons } from "./Imgimports";

export default function Footer() {
  return (
    <div className="w-screen h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between p-8 text-center text-white lg:p-16 bg-black">
      <div className="flex flex-col gap-8">
        <img src={icons.logo} className="w-[10em]" alt="" />
        <div className="flex flex-col lg:flex-row gap-4">
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Events</a>
          <a href="#">Products</a>
          <a href="#">Support</a>
        </div>
      </div>
      <div className="mt-16 md:mt-0 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          <img src={icons.iconFacebook} alt="" />
          <img src={icons.iconTwitter} alt="" />
          <img src={icons.iconPinterest} alt="" />
          <img src={icons.iconInstagram} alt="" />
        </div>
        <p className="text-Very-Dark-Gray">
          © 2021 Loopstudios. All rights reserved.
        </p>
      </div>
    </div>
  );
}
