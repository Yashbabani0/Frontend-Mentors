"use client";
import { useSupport } from "@/app/context/SupportContext";
import Image from "next/image";
import React from "react";
import PledgeDialog from "@/components/PledgeDialog";

export default function Header() {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { backed, totalGoal } = useSupport();

  const campaignComplete = backed >= totalGoal;

  return (
    <div className="min-w-[22em] max-w-5xl mx-4 mt-26 pt-8 sm:mx-16 lg:mx-auto py-8 px-8 bg-white rounded-xl flex flex-col gap-4 relative text-center z-10">
      <Image
        src="/logo-mastercraft.svg"
        className="absolute -top-8 left-[50%] translate-x-[-50%]"
        width={70}
        height={70}
        alt="logo"
      />
      <h1 className="font-bold text-3xl mt-4">
        Mastercraft Bamboo Monitor Riser
      </h1>
      <p className="text-lg font-medium max-w-sm text-Gray-500 mx-auto">
        A beautiful & practical solution to level up your desk setup
      </p>
      <div className="flex items-center justify-between">
        <button
          disabled={campaignComplete}
          className="bg-Green-400 hover:bg-Green-700 cursor-pointer transition-all duration-300 ease-in-out text-white py-4 px-8 md:px-12 rounded-full"
          onClick={() => setOpen(true)}
        >
          {campaignComplete ? "Funding Complete" : "Back this project"}{" "}
        </button>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:opacity-75 rounded-full md:pr-8 lg:pr-12 text-center ${
            bookmarked
              ? "bg-Green-400/20 text-Green-700"
              : "bg-Gray-500/20 text-Gray-500"
          }`}
        >
          <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              {/* circle changes too */}
              <circle
                fill={bookmarked ? "#147b74" : "#2F2F2F"}
                cx="28"
                cy="28"
                r="28"
              />
              <path
                fill={bookmarked ? "#fff" : "#B1B1B1"}
                d="M23 19v18l5-5.058L33 37V19z"
              />
            </g>
          </svg>
          <span className="hidden md:inline font-bold">
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </button>
      </div>
      <PledgeDialog open={open} onOpenChange={setOpen} initialSelected="none" />
    </div>
  );
}
