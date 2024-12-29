import React from "react";
import { desktopImages } from "./Imgimports";
import { mobileImages } from "./Imgimports";

export default function About() {
  return (
    <div className="relative py-24 w-screen h-full flex items-center justify-center flex-col gap-8 px-8 md:flex-row md:justify-start bg-white text-center md:text-left lg:px-32">
      <div>
        <img
          src={desktopImages.desktopInteractive}
          alt=""
          className="hidden md:block w-[50em]"
        />
        <img
          src={mobileImages.mobileInteractive}
          className="md:hidden"
          alt=""
        />
      </div>
      <div className="md:absolute md:w-[40em] left-[48%] bottom-[4em] bg-white md:p-16">
        <h2 className="text-slate-900 uppercase font-light text-2xl pb-4 md:text-5xl">The leader in interactive VR</h2>
        <p className="text-Dark-Gray">
          Founded in 2011, Loopstudios has been producing world-class virtual
          reality projects for some of the best companies around the globe. Our
          award-winning creations have transformed businesses through digital
          experiences that bind to their brand.
        </p>
      </div>
    </div>
  );
}
