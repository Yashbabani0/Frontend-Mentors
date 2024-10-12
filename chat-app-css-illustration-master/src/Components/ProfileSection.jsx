import React from "react";
import profileImg from "../../public/avatar.jpg";


export default function ProfileSection() {
  return (
    <div className="relative top h-[6em] flex items-end justify-center p-[1em] rounded-[1.8em]">
      <div className="bg-white w-[10em] h-[2em] absolute top-[-5%] left-[50%] translate-x-[-50%] rounded-b-[1.2em]"></div>
      <div className="flex flex-row items-center justify-center text-light-grayish-violet">
        <div className="pr-[1em]">{"<"}</div>
        <div className="flex items-center justify-center gap-[1em] pr-[3em] h-[3em]">
          <div className="border-white border-[0.1em] rounded-full">
            <img src={profileImg} alt="" className="w-[2.2em] rounded-full" />
          </div>
          <div className="">
            <b className="text-[0.8em]">Samuel Green</b>
            <p className="text-[0.63em] text-pale-violet tracking-wide">Availble to Walk</p>
          </div>
        </div>
        <div className="rotate-90">...</div>
      </div>
    </div>
  );
}
