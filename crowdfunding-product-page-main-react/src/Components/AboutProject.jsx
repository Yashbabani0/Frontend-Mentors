import React from "react";
import Card from "./Card";

function AboutProject() {
  return (
    <div className="bg-white p-8 w-[90vw] md:w-[70vw] lg:[50vw] mt-16 mx-auto rounded-xl text-left flex flex-col gap-4 mb-16">
      <h3 className="font-bold text-2xl">About this project</h3>
      <p>
        The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform
        that elevates your screen to a more comfortable viewing height. Placing
        your monitor at eye level has the potential to improve your posture and
        make you more comfortable while at work, helping you stay focused on the
        task at hand.
      </p>
      <p>
        Featuring artisan craftsmanship, the simplicity of design creates extra
        desk space below your computer to allow notepads, pens, and USB sticks
        to be stored under the stand.
      </p>
      <div className="flex items-center gap-4 flex-col mt-8">
        <Card />
        <Card
          title="Black Edition Stand"
          left="64"
          pledge="Pledge $75 or more"
          para="You get a Black Special Edition
computer stand and a personal
thank you. You'll be added to our
Backer member list. Shipping is
included."
        />
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute w-full h-full bg-Black opacity-10 z-20 cursor-not-allowed"></div>
          <Card
            title="Mahogany Special Edition"
            pledge="Pledge $200 or more"
            para="You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal
thank you. You'll be added to our Backer member list. Shipping is included."
            left="0"
            button="Out of Stock"
            isLast
          />
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
