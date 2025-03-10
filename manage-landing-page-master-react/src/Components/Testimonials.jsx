import React from "react";
import Button from "./Button";
import Card from "./card";
function Testimonials() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-Dark-Blue">
        What they've said
      </h2>
      <Card />
      <Button />
    </div>
  );
}

export default Testimonials;
