import React from "react";
import MobileImg from "./MobileImg";

export default function Content() {
  return (
    <div className="z-10 flex flex-col items-center justify-center md:flex-row md:justify-between md:pl-[8em] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[80vw]">
      <div>
        <MobileImg />
      </div>
      <div className="h-[20em] p-[1.62em] text-center md:w-[70%] md:text-left md:pl-[5em]">
        <h1 className="text-very-dark-desaturated-violet font-bold text-4xl pb-[1em]">
          Simple booking
        </h1>
        <p className="text-dark-grayish-violet text-lg font-medium md:w-[68%]">
          Stay in touch with our dog walkers through the chat interface. This
          makes it easy to discuss arrangements and make bookings. Once the walk
          has been completed you can rate your walker and book again all through
          the chat.
        </p>
      </div>
    </div>
  );
}
