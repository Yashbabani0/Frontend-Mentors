import React from "react";
import Toggle from '/Toggle.jsx';

export default function Nav() {
  return (
    <div className="w-full relative lg:flex lg:justify-between lg:px-16 lg:py-8 z-10">
      <div className="w-full h-[40vh] md:h-[45vh] -z-10 bg-neutral-lightTheme-topBgPattern dark:bg-neutral-darkTheme-topBgPattern absolute left-0 top-0"></div>
      <div className="title mb-4 p-4">
        <h1 className="dark:text-white text-neutral-lightTheme-veryDarkText text-2xl md:text-3xl lg:text-4xl font-bold">
          Social Media Dashboard
        </h1>
        <p className="text-neutral-lightTheme-text dark:text-neutral-darkTheme-text font-semibold text-[14px]">
          Total Followers: 23,004
        </p>
      </div>
      <div className="toggle border-t-2 p-4 border-neutral-lightTheme-text dark:border-neutral-darkTheme-text py-4 mb-8 flex items-center justify-between lg:border-none lg:w-[12em] lg:justify-center lg:gap-2">
        <b className="dark:text-neutral-darkTheme-text text-neutral-lightTheme-text">Toggle</b>
        <Toggle />
      </div>
    </div>
  );
}
