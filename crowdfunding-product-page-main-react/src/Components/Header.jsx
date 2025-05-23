import { useState } from "react";
import MastercraftLogo from "/images/logo-mastercraft.svg";

function AboutProject() {
  const [isActive, setIsActive] = useState(false);

  const toggleBookmark = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="bg-white relative w-[90vw] p-8 md:w-[70vw] lg:[50vw] mt-24 mx-auto rounded-xl text-center flex flex-col gap-4">
      <img
        src={MastercraftLogo}
        className="absolute -top-6 left-[50%] translate-x-[-50%]"
        alt=""
      />
      <h1 className="text-2xl my-2 font-bold md:text-3xl lg:text-4xl tracking-wider">
        Mastercraft Bamboo Monitor Riser
      </h1>
      <p className="text-xl">
        A beautiful & handcrafted monitor stand to reduce neck and eye strain.
      </p>
      <section className="my-8 flex items-center justify-between px-4 gap-4 md:gap-0">
        <button className="bg-Green-400 text-white font-bold rounded-full cursor-pointer hover:bg-Green-700 transition-all duration-300 ease-in border-0 py-4 px-14 text-sm ">
          Back this project
        </button>
        <button
          onClick={toggleBookmark}
          className="flex items-center gap-4 bg-[#f6f6f6] rounded-full font-bold cursor-pointer transition-all duration-300 ease-in border-0"
        >
          <section
            className={`py-3 px-5 cursor-pointer rounded-full transition-colors duration-150 ease-in border-0 ${
              isActive
                ? "bg-Green-700 text-white"
                : "bg-[#2f2f2f] text-[#b1b1b1]"
            }`}
          >
            <i className="fa-solid fa-bookmark"></i>
          </section>
          <section
            className={`py-3 pr-8 transition-colors duration-150 ease-in border-0 hidden md:flex ${
              isActive
                ? "text-Green-700"
                : "text-gray-500 hover:text-gray-500/70"
            } bookmarkText`}
          >
            {isActive ? "Bookmarked" : "Bookmark"}
          </section>
        </button>
      </section>
    </div>
  );
}

export default AboutProject;
