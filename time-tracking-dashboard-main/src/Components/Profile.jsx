import React, { useState } from "react";
import profileImage from '../../src/assets/image-jeremy.png';

export default function Profile({ setActiveTab }) {
  const [activeTabLocal, setActiveTabLocal] = useState("Daily");

  const handleClick = (tab) => {
    setActiveTabLocal(tab);
    setActiveTab(tab);
  };

  return (
    <div className="w-[23em] mt-4 h-[13em] rounded-2xl bg-dark-blue mb-[1em] md:w-[16em] md:h-[30em]">
      <div className="part1 mb-6 bg-primary-blue rounded-2xl flex items-center justify-center gap-4 h-[8em] md:h-[20em] md:flex-col md:items-start md:px-12">
        <div className="profileImg w-[4em] md:mb-[1em]">
          <div className="border-[3px] border-white rounded-full overflow-hidden">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
          </div>
        </div>
        <div className="profileData">
          <p className="tracking-wide text-pale-blue">Report for</p>
          <h2 className="text-2xl md:text-4xl md:tracking-wide">
            Jeremy Robson
          </h2>
        </div>
      </div>
      <div className="part2 flex items-center justify-center gap-[4em] text-desaturated-blue font-medium md:flex-col md:gap-[1em] md:items-start md:px-12">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <h5
            key={tab}
            className={`cursor-pointer ${activeTabLocal === tab ? "text-white" : ""}`}
            onClick={() => handleClick(tab)}
          >
            {tab}
          </h5>
        ))}
      </div>
    </div>
  );
}
