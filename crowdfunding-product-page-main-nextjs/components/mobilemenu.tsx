"use client";
import Image from "next/image";
import React from "react";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-8 px-8 z-50">
      <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
      <ul className="hidden md:flex gap-8 items-center justify-center text-white">
        <li className="cursor-pointer underline-offset-4">About</li>
        <li className="cursor-pointer hover:underline underline-offset-4">
          Discover
        </li>
        <li className="cursor-pointer hover:underline underline-offset-4">
          Get Started
        </li>
      </ul>
      <div className="md:hidden">
        {!open ? (
          <Image
            src="/icon-hamburger.svg"
            width={24}
            height={24}
            alt="hamburger"
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <Image
            src="/icon-close-menu.svg"
            width={20}
            height={20}
            alt="close"
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )}
        {open && (
          <div className="absolute top-[15%] left-[50%] min-w-[22em] bg-white shadow-2xl flex items-center justify-center translate-x-[-50%] rounded-xl z-50">
            <ul className="flex flex-col items-start justify-start w-full">
              <li className="cursor-pointer border-b w-full p-4 font-semibold border-Gray-500">
                About
              </li>
              <li className="cursor-pointer border-b w-full p-4 font-semibold border-Gray-500">
                Discover
              </li>
              <li className="cursor-pointer w-full p-4 font-semibold">
                Get Started
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
