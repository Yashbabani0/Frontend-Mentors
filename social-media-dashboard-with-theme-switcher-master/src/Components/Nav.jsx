import React from "react";

export default function Nav() {
  return (
    <div className="w-full relative lg:flex lg:justify-between lg:px-16 lg:py-8">
      <div className="w-screen h-[40vh] md:h-[45vh] -z-10 bg-neutral-lightTheme-topBgPattern absolute left-0 top-0"></div>
      <div className="title mb-4 p-4">
        <h1 className="text-neutral-lightTheme-veryDarkText text-2xl md:text-3xl lg:text-4xl font-bold">
          Social Media Dashboard
        </h1>
        <p className="text-neutral-lightTheme-text text-[14px]">
          Total Followers: 23,004
        </p>
      </div>
      <div className="toggle border-t-2 p-4 border-neutral-lightTheme-text py-4 mb-8 flex items-center justify-between lg:border-none lg:w-[12em]">
        <b className="text-neutral-lightTheme-text text-[14px]">Drak Mode</b>
        <div className="toggle w-16 h-8 bg-black text-white">toggle</div>
      </div>
    </div>
  );
}
