"use client";
import Image from "next/image";
import React from "react";

export default function RulesCard() {
  const [showRules, setShowRules] = React.useState(false);
  return (
    <>
      <button
        className="border-2 border-white/50 py-2 px-8 uppercase rounded-md text-white cursor-pointer"
        onClick={() => setShowRules(!showRules)}
      >
        Rules
      </button>
      {showRules ? (
        <div className="bg-black/50 w-screen min-h-screen absolute top-0 left-0 z-50 flex items-center justify-center">
          <div className="flex flex-col gap-8 items-center justify-center bg-white p-8 lg:py-12 rounded-lg w-screen h-screen lg:w-80 lg:h-[22em]">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold text-Navy-900">Rules</h1>
              <Image
                src={"/icon-close.svg"}
                alt="Close"
                width={20}
                height={20}
                className="cursor-pointer hidden lg:flex"
                onClick={() => setShowRules(false)}
              />
            </div>
            <Image
              src={"/image-rules.svg"}
              alt="Rules"
              width={300}
              height={300}
            />
            <Image
              src={"/icon-close.svg"}
              alt="Close"
              width={20}
              height={20}
              className="cursor-pointer mt-8 lg:hidden"
              onClick={() => setShowRules(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
