// Todayoverbox.js
import React from "react";

export default function Todayoverbox({ PageViews, icon, number, iconupordown, per }) {
  return (
    <div className="flex flex-col items-center justify-center mt-4 w-[20em] bg-neutral-lightTheme-cardBg rounded p-8 gap-8">
      <div className="flex items-center justify-between w-full">
        <b className="text-neutral-lightTheme-text">{PageViews}</b>
        <img src={icon} alt="Social Media Icon" />
      </div>
      <div className="flex items-center justify-between w-full">
        <h3 className="text-3xl font-bold text-neutral-lightTheme-veryDarkText">
          {number}
        </h3>
        <p className="flex gap-2 items-center">
          <img src={iconupordown} className="w-[10px] h-[10px]" alt="Change Icon" />
          {per}
        </p>
      </div>
    </div>
  );
}
