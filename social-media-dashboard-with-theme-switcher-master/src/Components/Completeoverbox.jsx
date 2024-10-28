import React from "react";

export default function Completeoverbox({
  socialIcon,
  username,
  count,
  label,
  changeIcon,
  changeAmount,
  borderColor,
  instagramBorder,
}) {
  return (
    <div
      className={`w-[20em] flex flex-col items-center justify-center border-t-[6px] ${borderColor} bg-neutral-lightTheme-cardBg rounded py-6 gap-6 relative overflow-hidden`}
    >
      <div
        className={`w-full h-[8px] bg-gradient-to-r from-[hsl(37,97%,70%)] to-[hsl(329,70%,58%)] absolute top-[-2px] left-0 ${instagramBorder}`}
      ></div>
      <div className="flex w-full items-center justify-center gap-2 text-neutral-lightTheme-text text-[14px] font-semibold">
        <img src={socialIcon} alt="social icon" />
        <p>{username}</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-neutral-lightTheme-veryDarkText">
          {count}
        </h2>
        <p className="uppercase text-[14px] text-neutral-lightTheme-text">
          {label}
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <img src={changeIcon} alt="change icon" />
        <span className="text-sm font-semibold">{changeAmount}</span>
      </div>
    </div>
  );
}
