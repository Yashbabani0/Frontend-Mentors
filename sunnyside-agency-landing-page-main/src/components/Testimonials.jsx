import React from "react";

export default function Testimonials({ image, text, name, title }) {
  return (
    <div className="flex flex-col items-center justify-between w-[22em]">
      <img src={image} alt={name} className="rounded-full w-24 mb-[3em]" />
      <b className="mb-[3em] text-darkGrayishBlue font-barlow leading-7 tracking-wide">
        {text}
      </b>
      <h3 className="text-veryDarkDesaturatedBlue font-bold text-lg tracking-wider">{name}</h3>
      <p className="text-grayishBlue">{title}</p>
    </div>
  );
}
    