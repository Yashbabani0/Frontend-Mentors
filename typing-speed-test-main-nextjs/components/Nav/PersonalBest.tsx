"use client";
import bestIcon from "@/public/icon-personal-best.svg";
import Image from "next/image";
import { useState } from "react";
export default function PersonalBest() {
  const [best, setBest] = useState(0);
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={bestIcon} alt="Personal Best" />
      <p className="text-Neutral-500 text-xl">Personal Best:</p>
      <p className="text-Neutral-0 text-xl">{best} WPM</p>
    </div>
  );
}
