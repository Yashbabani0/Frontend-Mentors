import React from "react";
import GrowTogetherImg from "../../public/illustration-grow-together.svg";
import bgTopMobile from "../../public/bg-section-top-mobile-1.svg";
import bgBottomMobile from "../../public/bg-section-bottom-mobile-1.svg";
import bgTopPc from "../../public/bg-section-top-desktop-1.svg";
import bgBottomPc from "../../public/bg-section-bottom-desktop-1.svg";

export default function GrowTogether() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center mb-[6em] relative">
      <div className="min-w-[100%]">
        <picture>
          <source media="(max-width: 767px)" srcSet={bgTopMobile} />
          <source media="(min-width: 768px)" srcSet={bgTopPc} />
          <img src={bgTopPc} alt="Background Top" className="min-w-full" />
        </picture>
      </div>
      <div className="bg-[#f6fbff] pt-[2em] pb-[2em] w-full">
        <div className="img md:float-right md:w-[50%]">
          <img src={GrowTogetherImg} alt="" className="w-[60%] m-auto" />
        </div>
        <div className="content px-[1.5em] leading-7 mt-[2em] md:float-left md:w-[50%] md:flex md:items-left md:justify-center md:flex-col md:h-[20em] md:text-left">
          <h2 className="mb-[1em] tracking-wider text-xl text-veryDarkCyan md:text-left md:ps-20 md:text-3xl md:mb-[0.6em]">
            Grow Together
          </h2>
          <p className="text-veryDarkCyan md:ps-20 md:tracking-wider">
            Generate meaningful discussions with your audience and build a
            strong, loyal community. Think of the insightful conversations you
            miss out on with a feedback form.
          </p>
        </div>
      </div>
      <div className="min-w-full">
      <picture>
          <source media="(max-width: 767px)" srcSet={bgBottomMobile} />
          <source media="(min-width: 768px)" srcSet={bgBottomPc} />
          <img src={bgTopPc} alt="Background Top" className="min-w-full" />
        </picture>
      </div>
    </div>
  );
}
