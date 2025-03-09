import React from "react";
import Card from "./Card";
import chrome from "/public/images/logo-chrome.svg";
import firefox from "/public/images/logo-firefox.svg";
import opera from "/public/images/logo-opera.svg";

function Extension() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-center px-8 pt-16">
      <h2 className="text-Very-Dark-Blue text-2xl md:text-4xl font-medium">
        Download the extension
      </h2>
      <p className="text-Grayish-Blue text-sm md:text-lg font-normal lg:w-1/2">
        We’ve got more browsers in the pipeline. Please do let us know if you’ve
        got a favourite you’d like us to prioritize.
      </p>
      <div className="flex flex-col md:flex-row gap-16 my-8">
        <Card
          image={chrome}
          title="Add to Chrome"
          version="Minimum version 62"
        />
        <Card
          image={firefox}
          title="Add to Firefox"
          version="Minimum version 55"
        />
        <Card image={opera} title="Add to Opera" version="Minimum version 46" />
      </div>
    </div>
  );
}

export default Extension;
