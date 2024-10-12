import React from "react";
import ProfileSection from "./ProfileSection";
import Messages from "./Messages";

export default function MobileImg() {
  return (
    <div className="bg-white shadow-2xl z-20 w-[21em] h-[42em] md:mt-0 mt-[35em] rounded-[3em] flex items-center justify-center">
      <div className="w-[19em] h-[40em] rounded-[3em] bg-light-grayish-violet">
        <ProfileSection />
        <Messages />
      </div>
    </div>
  );
}
