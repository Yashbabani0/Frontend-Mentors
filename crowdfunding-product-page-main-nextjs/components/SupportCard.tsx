"use client";

import React, { useState } from "react";
import { useSupport } from "@/app/context/SupportContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PledgeDialog from "@/components/PledgeDialog";

export default function SupportCard() {
  const { rewards, backed, totalGoal } = useSupport();
  const [open, setOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string>("none");

  const campaignComplete = backed >= totalGoal;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-6">
      {rewards.map((reward) => (
        <Card
          key={reward.id}
          className={`p-6 ${
            reward.remaining === 0 || campaignComplete
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <CardHeader className="md:flex items-center justify-between">
            <h3 className="text-xl font-bold">{reward.title}</h3>
            <p className="text-Green-400 font-medium">
              Pledge ${reward.minPledge} or more
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-lg">{reward.description}</p>
          </CardContent>

          <CardFooter className="flex items-start justify-between md:flex-row flex-col gap-6">
            <p className="font-bold text-lg">
              <span className="text-3xl">{reward.remaining}</span>{" "}
              <span className="text-gray-500 text-sm">left</span>
            </p>
            <Button
              disabled={reward.remaining === 0 || campaignComplete}
              className="bg-Green-400 hover:bg-Green-700 text-white py-3 px-8 rounded-full"
              onClick={() => {
                setSelectedReward(reward.id.toString());
                setOpen(true);
              }}
            >
              {campaignComplete
                ? "Funding Complete"
                : reward.remaining === 0
                ? "Out of Stock"
                : "Select Reward"}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Shared dialog */}
      <PledgeDialog
        open={open}
        onOpenChange={setOpen}
        initialSelected={selectedReward}
      />
    </div>
  );
}
