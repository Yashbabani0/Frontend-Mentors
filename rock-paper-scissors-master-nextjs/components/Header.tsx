import React from "react";

export default function Header({ score }: { score: number }) {
  return (
    <div className="border-4 border-Gray-600 p-4 flex items-center justify-between max-w-xl mx-8 md:mx-auto rounded-lg">
      <h1 className="text-3xl text-left font-bold text-white  leading-6">
        Rock <br /> Paper <br /> Scissors
      </h1>
      <div className="font-bold bg-white rounded-lg p-4 px-6 sm:px-10 text-center">
        <p className="text-[0.9em] text-Blue-500 tracking-widest ">Score</p>
        <h2 className="text-4xl text-Navy-900 font-bold">{score}</h2>
      </div>
    </div>
  );
}
