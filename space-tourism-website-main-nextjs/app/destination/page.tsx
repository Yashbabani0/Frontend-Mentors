"use client";
import Image, { StaticImageData } from "next/image";
import PcBackgroundImage from "@/public/assets/destination/background-destination-desktop.jpg";
import TabletBackgroundImage from "@/public/assets/destination/background-destination-tablet.jpg";
import MobileBackgroundImage from "@/public/assets/destination/background-destination-mobile.jpg";
import { destinations } from "@/data.json";
import { useState } from "react";
import moonImage from "@/public/assets/destination/image-moon.webp";
import marsImage from "@/public/assets/destination/image-mars.webp";
import europaImage from "@/public/assets/destination/image-europa.webp";
import titanImage from "@/public/assets/destination/image-titan.webp";

type DestinationName = "Moon" | "Mars" | "Europa" | "Titan";

const destinationImages: Record<DestinationName, StaticImageData> = {
  Moon: moonImage,
  Mars: marsImage,
  Europa: europaImage,
  Titan: titanImage,
};

export default function Page() {
  const [currentDestination, setCurrentDestination] = useState(0);

  return (
    <div className="min-h-screen">
      <picture className="fixed inset-0">
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

      <main className="relative pt-32 lg:pt-40 pb-0 container mx-auto px-6 min-h-screen">
        {/* Page Title */}
        <h1 className="title">
          <span className="text-zinc-500 font-bold">01</span> Pick your
          destination
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src={
                destinationImages[
                  destinations[currentDestination].name as DestinationName
                ]
              }
              alt={destinations[currentDestination].name}
              width={445}
              height={445}
              className="w-[300px] h-[300px] lg:w-[445px] lg:h-[445px] animate-spin-slow"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Navigation */}
            <nav className="mb-8">
              <ul className="flex gap-6 justify-center lg:justify-start">
                {destinations.map((dest, index) => (
                  <li key={dest.name}>
                    <button
                      onClick={() => setCurrentDestination(index)}
                      className={`text-white uppercase tracking-[2.7px] pb-2 border-b-2 transition-colors
                        ${
                          currentDestination === index
                            ? "border-white"
                            : "border-transparent hover:border-white/50"
                        }`}
                    >
                      {dest.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Destination Info */}
            <div>
              <h2 className="text-white font-bellefair uppercase text-6xl lg:text-8xl mb-4">
                {destinations[currentDestination].name}
              </h2>
              <p className="text-blue-200 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                {destinations[currentDestination].description}
              </p>

              <div className="h-[1px] bg-zinc-700 my-8"></div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                <div>
                  <h3 className="text-blue-200 font-barlow-condensed text-sm tracking-widest uppercase mb-3">
                    Avg. distance
                  </h3>
                  <p className="text-white font-bellefair uppercase text-3xl">
                    {destinations[currentDestination].distance}
                  </p>
                </div>
                <div>
                  <h3 className="text-blue-200 font-barlow-condensed text-sm tracking-widest uppercase mb-3">
                    Est. travel time
                  </h3>
                  <p className="text-white font-bellefair uppercase text-3xl pb-12 lg:pb-0">
                    {destinations[currentDestination].travel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
