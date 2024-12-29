import React from "react";
import { desktopImages } from "./Imgimports";
import { mobileImages } from "./Imgimports";
import Creations from "./Creations";

export default function Ourcreations() {
  return (
    <div className="h-full w-screen bg-white px-4 md:px-32 md:flex flex-col text-center items-center justify-between">
      <div className="flex items-center w-full justify-center md:justify-between pb-8 md:pb-16">
        <h2 className="text-slate-900 text-3xl md:text-4xl font-light">
          OUR CREATIONS
        </h2>
        <button className="text-slate-900 border-2 border-slate-900 py-2 px-12 hidden md:block">
          SEE ALL
        </button>
      </div>
      <div className="grid gap-8 items-center justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mb-32">
        <Creations
          desktopImage={desktopImages.desktopDeepEarth}
          mobileImage={mobileImages.mobileDeepEarth}
          title={["Deep", "Earth"]} 
        />
        <Creations
          desktopImage={desktopImages.desktopNightArcade}
          mobileImage={mobileImages.mobileNightArcade}
          title="Night arcade"
        />
        <Creations
          desktopImage={desktopImages.desktopSoccerTeam}
          mobileImage={mobileImages.mobileSoccerTeam}
          title="Soccer team VR"
        />
        <Creations
          desktopImage={desktopImages.desktopGrid}
          mobileImage={mobileImages.mobileGrid}
          title={["The", "Grid"]} 
        />
        <Creations
          desktopImage={desktopImages.desktopFromAbove}
          mobileImage={mobileImages.mobileFromAbove}
          title="From up above VR"
        />
        <Creations
          desktopImage={desktopImages.desktopPocketBorealis}
          mobileImage={mobileImages.mobilePocketBorealis}
          title="Pocket borealis"
        />
        <Creations
          desktopImage={desktopImages.desktopCuriosity}
          mobileImage={mobileImages.mobileCuriosity}
          title="The curiosity"
        />
        <Creations
          desktopImage={desktopImages.desktopFisheye}
          mobileImage={mobileImages.mobileFisheye}
          title="Make it fisheye"
        />
      </div>
      <button className="text-slate-900 border-2 border-slate-900 py-2 px-10 my-16 md:hidden">
        SELL ALL
      </button>
    </div>
  );
}
