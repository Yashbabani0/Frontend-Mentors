"use client";
import Image, { StaticImageData } from "next/image";
import PcBackgroundImage from "@/public/assets/technology/background-technology-desktop.jpg";
import TabletBackgroundImage from "@/public/assets/technology/background-technology-tablet.jpg";
import MobileBackgroundImage from "@/public/assets/technology/background-technology-mobile.jpg";
import { technology } from "@/data.json";
import { useState } from "react";
import launchVehicleLandscape from "@/public/assets/technology/image-launch-vehicle-landscape.jpg";
import launchVehiclePortrait from "@/public/assets/technology/image-launch-vehicle-portrait.jpg";
import spaceCapsuleLandscape from "@/public/assets/technology/image-space-capsule-landscape.jpg";
import spaceCapsulePortrait from "@/public/assets/technology/image-space-capsule-portrait.jpg";
import spaceportLandscape from "@/public/assets/technology/image-spaceport-landscape.jpg";
import spaceportPortrait from "@/public/assets/technology/image-spaceport-portrait.jpg";

type TechnologyName = "Launch vehicle" | "Space capsule" | "Spaceport";

interface TechnologyImages {
  landscape: StaticImageData;
  portrait: StaticImageData;
}

type TechImagesMap = {
  [K in TechnologyName]: TechnologyImages;
};

const techImages: TechImagesMap = {
  "Launch vehicle": {
    landscape: launchVehicleLandscape,
    portrait: launchVehiclePortrait,
  },
  "Space capsule": {
    landscape: spaceCapsuleLandscape,
    portrait: spaceCapsulePortrait,
  },
  Spaceport: {
    landscape: spaceportLandscape,
    portrait: spaceportPortrait,
  },
};

export default function Page() {
  const [currentTech, setCurrentTech] = useState(0);

  const currentTechName = technology[currentTech].name as TechnologyName;

  return (
    <div className="min-h-screen">
      <picture>
        {/* Desktop */}
        <source media="(min-width:1024px)" srcSet={PcBackgroundImage.src} />
        {/* Tablet */}
        <source media="(min-width:640px)" srcSet={TabletBackgroundImage.src} />
        {/* Mobile fallback */}
        <Image
          src={MobileBackgroundImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover min-h-[125vh] max-h-[125vh]"
        />
      </picture>

      {/* Content */}
      <div className="pt-28 z-50 relative lg:pt-40">
        {/* Page Title */}
        <h2 className="title">
          <b className="text-zinc-500 font-bold">03</b> space launch 101
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-20 lg:pl-40">
          {/* Image Section */}
          <div className="order-1 lg:order-2 w-full lg:w-auto mb-8 lg:mb-0">
            <Image
              src={techImages[currentTechName].portrait}
              alt={currentTechName}
              width={515}
              height={527}
              className="hidden lg:block"
            />
            <Image
              src={techImages[currentTechName].landscape}
              alt={currentTechName}
              width={768}
              height={310}
              className="lg:hidden w-full"
            />
          </div>

          {/* Content Section */}
          <div className="order-2 lg:order-1 flex flex-col lg:flex-row items-center lg:items-start lg:pt-20 gap-8 px-6 lg:px-0">
            {/* Number Navigation */}
            <div className="flex lg:flex-col gap-4">
              {technology.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTech(index)}
                  className={`w-12 h-12 lg:w-20 lg:h-20 rounded-full border border-white/25 font-bellefair text-xl lg:text-3xl
                    ${
                      currentTech === index
                        ? "bg-white text-black"
                        : "text-white hover:border-white"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left max-w-[470px]">
              <p className="text-blue-200 font-barlow-condensed uppercase tracking-widest mb-2">
                THE TERMINOLOGY...
              </p>
              <h3 className="text-white font-bellefair uppercase text-3xl lg:text-5xl mb-4">
                {currentTechName}
              </h3>
              <p className="text-blue-200 leading-relaxed">
                {technology[currentTech].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
