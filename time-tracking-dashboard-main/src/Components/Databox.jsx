import React from "react";
import data from "../../data.json";
import img1 from "../../src/assets/icon-work.png";
import img2 from "../../src/assets/icon-play.png";
import img3 from "../../src/assets/icon-study.png";
import img4 from "../../src/assets/icon-exercise.png";
import img5 from "../../src/assets/icon-social.png";
import img6 from "../../src/assets/icon-self-care.png";
import ellipsisImg from "../../src/assets/icon-ellipsis.png";

const images = {
  Work: img1,
  Play: img2,
  Study: img3,
  Exercise: img4,
  Social: img5,
  "Self Care": img6,
};

export default function Databox({ activeTab }) {
  return (
    <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 md:gap-[2em] overflow-hidden">
      {data.map((item) => (
        <div
          key={item.title}
          className={`box w-[23em] h-[13em] md:h-[14em] md:w-[20em] relative ${item.bgColor} rounded-2xl overflow-hidden mb-[1em] md:mb-0`}
        >
          <img
            className="absolute right-[10%] top-[-5%]"
            src={images[item.title]} // Use the imported image
            alt={`${item.title} icon`}
          />
          <div className="content bg-dark-blue w-full h-[11em] absolute bottom-0 rounded-t-2xl rounded-r-2xl">
            <div className="flex items-center justify-between px-[2em] py-[2em]">
              <h3 className="font-medium tracking-wide text-[1.2em]">
                {item.title}
              </h3>
              <img src={ellipsisImg} alt="Ellipsis icon" />
            </div>
            <div className="flex items-center justify-between px-[2em]">
              <h2 className="text-[2em] font-normal text-pale-blue">
                {item.timeframes[activeTab.toLowerCase()].current}hrs
              </h2>
              <p className="text-pale-blue">
                {activeTab === "Daily"
                  ? "Yesterday"
                  : activeTab === "Weekly"
                  ? "Last Week"
                  : "Last Month"}{" "}
                - {item.timeframes[activeTab.toLowerCase()].previous}hrs
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
