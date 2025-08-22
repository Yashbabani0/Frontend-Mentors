"use client";
import Image, { StaticImageData } from "next/image";
import PcBackgroundImage from "@/public/assets/crew/background-crew-desktop.jpg";
import TabletBackgroundImage from "@/public/assets/crew/background-crew-tablet.jpg";
import MobileBackgroundImage from "@/public/assets/crew/background-crew-mobile.jpg";
import { crew } from "@/data.json";
import { useState } from "react";
import douglasHurley from "@/public/assets/crew/image-douglas-hurley.png";
import markShuttleworth from "@/public/assets/crew/image-mark-shuttleworth.png";
import victorGlover from "@/public/assets/crew/image-victor-glover.png";
import anoushehAnsari from "@/public/assets/crew/image-anousheh-ansari.png";

type CrewMemberName =
  | "Douglas Hurley"
  | "Mark Shuttleworth"
  | "Victor Glover"
  | "Anousheh Ansari";

const crewImages: Record<CrewMemberName, StaticImageData> = {
  "Douglas Hurley": douglasHurley,
  "Mark Shuttleworth": markShuttleworth,
  "Victor Glover": victorGlover,
  "Anousheh Ansari": anoushehAnsari,
};

export default function Page() {
  const [currentMember, setCurrentMember] = useState(0);

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
          className="object-cover"
        />
      </picture>

      <main className="crew_main">
        {/* Page Title */}
        <h1 className="title">
          <span className="text-zinc-500 font-bold">02</span> Meet your crew
        </h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-6xl mx-auto gap-4">
          {/* Content Section */}
          <div className="w-full lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-start lg:w-1/2 text-center lg:text-left z-10">
            {/* Slider dots */}
            <div className="flex gap-4 justify-center lg:justify-start order-2 md:order-3 my-8">
              {crew.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMember(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200
                    ${
                      currentMember === index
                        ? "bg-white"
                        : "bg-white/20 hover:bg-white/50"
                    }`}
                  aria-label={`View ${crew[index].name}`}
                />
              ))}
            </div>

            {/* Crew Info */}
            <div className="space-y-4 order-1 md:order-2">
              <h2 className="text-white/50 font-bellefair uppercase text-2xl lg:text-3xl">
                {crew[currentMember].role}
              </h2>
              <h3 className="text-white font-bellefair uppercase text-3xl lg:text-5xl mb-4">
                {crew[currentMember].name}
              </h3>
              <p className="text-blue-200 leading-relaxed max-w-md mx-auto lg:mx-0">
                {crew[currentMember].bio}
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center order-3 md:order-1 border-b border-zinc-700 md:border-none">
            <Image
              src={crewImages[crew[currentMember].name as CrewMemberName]}
              alt={crew[currentMember].name}
              width={514}
              height={700}
              className="object-contain h-[350px] md:h-[532px] w-auto"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
