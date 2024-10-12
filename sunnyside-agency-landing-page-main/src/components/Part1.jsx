import React from "react";
import ResponsiveImage from "@/components/Responsiveimage";

import desktopGraphicDesign from "@/assets/desktop/image-graphic-design.jpg";
import desktopPhotography from "@/assets/desktop/image-photography.jpg";
import desktopStandOut from "@/assets/desktop/image-stand-out.jpg";
import desktopTransform from "@/assets/desktop/image-transform.jpg";

import mobileGraphicDesign from "@/assets/mobile/image-graphic-design.jpg";
import mobilePhotography from "@/assets/mobile/image-photography.jpg";
import mobileStandOut from "@/assets/mobile/image-stand-out.jpg";
import mobileTransform from "@/assets/mobile/image-transform.jpg";

export default function Part1() {
  return (
    <div>
      <div className="flex flex-col gap-[5em] md:gap-0">
        <div className="md:h-[40em] md:flex md:items-center md:justify-center">
          <div className="md:min-w-[50vw]">
            <ResponsiveImage
              mobileSrc={mobileTransform}
              desktopSrc={desktopTransform}
              alt="Transform your brand"
            />
          </div>
          <div className="text-center">
            <h2 className="text-5xl font-extrabold font-fraunces px-[1em] py-[1em] text-veryDarkDesaturatedBlue">
              Transform your brand
            </h2>
            <p className="text-lg px-[3em] pb-[1em] tracking-wider leading-8">
              We are a full-service creative agency specializing in helping
              brands grow fast. Engage your clients through compelling visuals
              that do most of the marketing for you.
            </p>
            <b className="underline decoration-amber-100 hover:decoration-yellow transition cursor-pointer decoration-8">
              Learn more
            </b>
          </div>
        </div>
        <div className="md:h-[40em] md:flex md:items-center md:justify-center relative">
          <div className="md:min-w-[50vw] md:absolute md:right-0">
            <ResponsiveImage
              mobileSrc={mobileStandOut}
              desktopSrc={desktopStandOut}
              alt="Stand out to the right audience"
            />
          </div>
          <div className="text-center md:w-[50%] md:absolute md:left-0">
            <h2 className="text-5xl font-extrabold font-fraunces px-[1em] py-[1em] text-veryDarkDesaturatedBlue">
              Stand out to the right audience
            </h2>
            <p className="text-lg px-[3em] pb-[1em] tracking-wider leading-8">
              Using a collaborative formula of designers, researchers,
              photographers, videographers, and copywriters, we’ll build and
              extend your brand in digital places.
            </p>
            <b className="underline decoration-softRed hover:decoration-clifford transition cursor-pointer decoration-8">
              Learn more
            </b>
          </div>
        </div>
      </div>
      <div className="mt-[4em] md:mt-0 md:flex">
        <div className="relative">
          <div className="img md:min-w-[50vw] relative">
            <picture>
              <source media="(max-width: 767px)" srcSet={mobileGraphicDesign} />
              <source
                media="(min-width: 768px)"
                srcSet={desktopGraphicDesign}
              />
              <img src={desktopGraphicDesign} className="md:min-w-[100%]" />
            </picture>
          </div>
          <div className="absolute bottom-[15%] text-center px-[1em]">
            <h2 className="text-5xl font-extrabold font-fraunces px-[1em] py-[1em] text-darkDesaturatedCyan">
              Graphic design
            </h2>
            <p className="text-lg px-[3em] pb-[1em] tracking-wider leading-8 text-darkModerateCyan font-semibold">
              Great design makes you memorable. We deliver artwork that
              underscores your brand message and captures potential clients’
              attention.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="img md:min-w-[50vw] md:h-[40em] relative">
            <picture>
              <source media="(max-width: 767px)" srcSet={mobilePhotography} />
              <source media="(min-width: 768px)" srcSet={desktopPhotography} />
              <img src={desktopPhotography} className="md:min-w-[100%]" />
            </picture>
          </div>
          <div className="absolute bottom-[15%] text-center px-[1em]">
            <h2 className="text-5xl font-extrabold font-fraunces px-[1em] py-[1em] text-darkBlue">
              Photography
            </h2>
            <p className="text-lg px-[3em] pb-[1em] tracking-wider leading-8 font-semibold text-darkBlue">
              Increase your credibility by getting the most stunning,
              high-quality photos that improve your business image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
