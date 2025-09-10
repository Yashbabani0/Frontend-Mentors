"use client";
import React from "react";
import { useSupport } from "@/app/context/SupportContext";
import { Progress } from "@/components/ui/progress";

export default function Details() {
  const { backed, totalGoal, backers } = useSupport();

  // calculate progress percentage, capped at 100%
  const progress = Math.min((backed / totalGoal) * 100, 100);

  return (
    <div className="min-w-[22em] max-w-5xl mx-4 mt-8 pt-8 sm:mx-16 lg:mx-auto py-8 px-8 bg-white rounded-xl flex flex-col gap-4 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {/* Backed Amount */}
        <section className="flex flex-col">
          <h2 className="text-2xl font-bold">${backed.toLocaleString('en-US')}</h2>
          <p className="text-gray-500">
            of ${totalGoal.toLocaleString("en-US")} backed
          </p>
        </section>

        {/* Backers */}
        <section className="flex flex-col border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0">
          <h2 className="text-2xl font-bold">{backers.toLocaleString()}</h2>
          <p className="text-gray-500">total backers</p>
        </section>

        {/* days left */}
        <section className="flex flex-col border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0">
          <h2 className="text-2xl font-bold">56</h2>
          <p className="text-gray-500">days left</p>
        </section>
      </div>

      {/* Progress Bar (shadcn/ui) */}
      <div className="w-full mt-6">
        <Progress value={progress} className="h-4 " />
      </div>
    </div>
  );
}
