import React from "react";
import SupportCard from "./SupportCard";

export default function AboutProject() {
  return (
    <div className="min-w-[22em] max-w-5xl mx-4 mt-8 pt-8 sm:mx-16 lg:mx-auto py-8 px-8 bg-white rounded-xl flex flex-col gap-4 relative text-left">
      <h2 className="text-2xl font-bold">About this project</h2>
      <p className="text-Gray-500 text-xl">
        The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform
        that elevates your screen to a more comfortable viewing height. Placing
        your monitor at eye level has the potential to improve your posture and
        make you more comfortable while at work, helping you stay focused on the
        task at hand.
      </p>
      <p className="text-Gray-500 text-xl">
        Featuring artisan craftsmanship, the simplicity of design creates extra
        desk space below your computer to allow notepads, pens, and USB sticks
        to be stored under the stand.
      </p>

      <SupportCard />
    </div>
  );
}
