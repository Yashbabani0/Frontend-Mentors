"use client";
import Header from "@/components/Header";
import RulesCard from "@/components/RulesCard";
import Image from "next/image";
import React, { useState } from "react";

const styles: Record<string, string> = {
  rock: "border-Red-600",
  paper: "border-Blue-500",
  scissors: "border-Gold-500",
};

export default function Page() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const icons: Record<string, string> = {
    rock: "/icon-rock.svg",
    paper: "/icon-paper.svg",
    scissors: "/icon-scissors.svg",
  };

  const isWinner = (player: "user" | "computer") => {
    if (!userChoice || !computerChoice || result === "It's a draw!")
      return false;
    if (player === "user" && result === "You win") return true;
    if (player === "computer" && result === "You lose") return true;
    return false;
  };

  function play(choice: string) {
    setUserChoice(choice);
    setComputerChoice("");
    setResult("");
    setShowResult(true);

    setTimeout(() => {
      const choices = ["rock", "paper", "scissors"];
      const randomIndex = Math.floor(Math.random() * 3);
      const compChoice = choices[randomIndex];
      setComputerChoice(compChoice);

      if (choice === compChoice) {
        setResult("It's a draw!");
      } else if (
        (choice === "rock" && compChoice === "scissors") ||
        (choice === "scissors" && compChoice === "paper") ||
        (choice === "paper" && compChoice === "rock")
      ) {
        setResult("You win");
        setScore((prev) => prev + 1);
      } else {
        setResult("You lose");
        setScore((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 2000);
  }

  function playAgain() {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setShowResult(false);
  }

  return (
    <div className="text-center w-screen min-h-screen py-8">
      <Header score={score} />

      {/* CHOICE SCREEN */}
      {!showResult && (
        <div className="flex items-center justify-center mt-20 relative w-[20em] md:w-[24em] mx-auto">
          <Image
            src={"/bg-triangle.svg"}
            alt="Game"
            width={200}
            height={200}
            className="w-full"
          />

          {/* ROCK */}
          <div
            className="border-[0.7em] border-Red-600 rounded-full flex items-center justify-center h-28 w-28 md:w-34 md:h-34 lg:w-40 lg:h-40 cursor-pointer absolute top-2/3"
            onClick={() => play("rock")}
          >
            <Image
              src={"/icon-rock.svg"}
              alt="Rock"
              width={50}
              height={50}
              className="bg-white border-t-4 border-zinc-400 rounded-full w-full h-full p-6"
            />
          </div>

          {/* PAPER */}
          <div
            className="border-[0.7em] border-Blue-500 rounded-full flex items-center justify-center h-28 w-28 cursor-pointer absolute -top-10 left-2 md:w-34 md:h-34 lg:w-40 lg:h-40 md:left-0 lg:-left-4"
            onClick={() => play("paper")}
          >
            <Image
              src={"/icon-paper.svg"}
              alt="Paper"
              width={50}
              height={50}
              className="bg-white rounded-full w-full h-full p-6  border-t-4 border-zinc-400"
            />
          </div>

          {/* SCISSORS */}
          <div
            className="border-[0.7em] border-Gold-500 rounded-full flex items-center justify-center h-28 w-28 cursor-pointer absolute -top-10 right-2 md:w-34 md:h-34 lg:w-40 lg:h-40 md:right-0 lg:-right-4"
            onClick={() => play("scissors")}
          >
            <Image
              src={"/icon-scissors.svg"}
              alt="Scissors"
              width={50}
              height={50}
              className="bg-white rounded-full w-full h-full p-6 border-t-4 border-zinc-400"
            />
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {showResult && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-8 md:gap-16 lg:gap-32 mt-20">
            {/* USER PICK */}
            <div className="flex flex-col items-center justify-center gap-20 relative">
              <b className="uppercase text-xl font-bold text-white">
                you picked
              </b>
              {userChoice && (
                <div
                  className={`border-[0.7em] rounded-full flex items-center justify-center relative h-32 w-32 md:w-34 md:h-34 lg:w-40 lg:h-40 ${
                    styles[userChoice]
                  } ${isWinner("computer") ? "opacity-40 grayscale" : ""}`}
                >
                  {isWinner("user") && (
                    <>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/20 h-52 w-52 rounded-full animate-[ping_1s_ease-out]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/15 h-72 w-72 rounded-full animate-[ping_1s_ease-out_0.3s]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/10 h-96 w-96 rounded-full animate-[ping_1s_ease-out_0.6s]"></div>
                    </>
                  )}
                  <Image
                    src={icons[userChoice]}
                    alt={userChoice}
                    width={60}
                    height={60}
                    className="bg-white rounded-full w-full h-full p-8"
                  />
                </div>
              )}
            </div>

            {/* RESULT + PLAY AGAIN */}
            <div
              className={`hidden md:flex flex-col items-center justify-center gap-4 relative transition-opacity duration-700 ${
                result ? "opacity-100" : "opacity-0"
              }`}
            >
              <b className="uppercase text-2xl font-bold text-white">
                {result}
              </b>
              {result && (
                <button
                  onClick={playAgain}
                  className="bg-white py-2 px-8 uppercase rounded-md text-Navy-900 cursor-pointer"
                >
                  Play Again
                </button>
              )}
            </div>

            {/* COMPUTER PICK */}
            <div className="flex flex-col items-center justify-center gap-20">
              <b className="uppercase text-xl font-bold text-white">
                the house picked
              </b>
              {computerChoice ? (
                <div
                  className={`border-[0.7em] rounded-full flex items-center justify-center relative h-32 w-32 md:w-34 md:h-34 lg:w-40 lg:h-40 ${
                    styles[computerChoice]
                  } ${isWinner("user") ? "opacity-40 grayscale" : ""}`}
                >
                  {isWinner("computer") && (
                    <>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/20 h-52 w-52 rounded-full animate-[ping_1s_ease-out]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/15 h-72 w-72 rounded-full animate-[ping_1s_ease-out_0.3s]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-white/10 h-96 w-96 rounded-full animate-[ping_1s_ease-out_0.6s]"></div>
                    </>
                  )}
                  <Image
                    src={icons[computerChoice]}
                    alt={computerChoice}
                    width={60}
                    height={60}
                    className="bg-white rounded-full w-full h-full p-8"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-[#17223e]/90 rounded-full"></div>
              )}
            </div>
          </div>
          <div
            className={`md:hidden flex flex-col items-center justify-center gap-4 relative mt-24 z-50 transition-opacity duration-700 ${
              result ? "opacity-100" : "opacity-0"
            }`}
          >
            <b className="uppercase text-2xl font-bold text-white">{result}</b>
            {result && (
              <button
                onClick={playAgain}
                className="bg-white py-2 px-8 uppercase rounded-md text-Navy-900 cursor-pointer"
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Rules button */}
      <div className="flex items-center justify-center mt-12 md:justify-end md:mx-16">
        <RulesCard />
      </div>
    </div>
  );
}
