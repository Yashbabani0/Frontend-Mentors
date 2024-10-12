import React from "react";
import Testimonials from "./Testimonials";
import Emily from "../assets/image-emily.jpg";
import Thomas from "../assets/image-thomas.jpg";
import Jennie from "../assets/image-jennie.jpg";

export default function Part2() {
  return (
    <div className="text-center h-[230vh] md:h-[105vh] flex flex-col items-center">
      <h2 className="uppercase tracking-widest font-bold font-fraunces text-2xl text-darkGrayishBlue mt-[4em] mb-[4em]">
        Client Testimonials
      </h2>
      <div className="flex flex-col gap-[4em] md:flex-row">
        <Testimonials
          image={Emily}
          text="We put our trust in Sunnyside and they delivered, making sure our needs were met and deadlines were always hit."
          name="Emily R."
          title="Marketing Director"
        />
        <Testimonials
          image={Thomas}
          text="Sunnyside’s enthusiasm coupled with their keen interest in our brand’s success made it a satisfying and enjoyable experience."
          name="Thomas S."
          title="Chief Operating Officer"
        />
        <Testimonials
          image={Jennie}
          text="Incredible end result! Our sales increased over 400% when we worked with Sunnyside. Highly recommended!"
          name="Jennie F."
          title="Business Owner"
        />
      </div>
    </div>
  );
}
