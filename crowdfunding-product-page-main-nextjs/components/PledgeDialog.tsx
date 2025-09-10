"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSupport } from "@/app/context/SupportContext";

interface PledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSelected?: string;
}

export default function PledgeDialog({
  open,
  onOpenChange,
  initialSelected = "none",
}: PledgeDialogProps) {
  const { rewards, support, backed, totalGoal } = useSupport();

  const [selected, setSelected] = useState<string | null>(initialSelected);
  const [pledgeAmount, setPledgeAmount] = useState<number>(0);
  const [showThanks, setShowThanks] = useState(false);

  const campaignComplete = backed >= totalGoal;

  const handleContinue = () => {
    if (campaignComplete) return;

    if (selected === "none") {
      support(0, pledgeAmount || 1);
    } else {
      const reward = rewards.find((r) => r.id.toString() === selected);
      if (reward && pledgeAmount >= reward.minPledge) {
        support(reward.id, pledgeAmount);
      }
    }
    setShowThanks(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onOpenChange(false);
          setShowThanks(false);
          setSelected("none");
        }
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {!showThanks ? (
          <>
            <DialogHeader className="flex flex-col gap-4 items-start text-left">
              <DialogTitle>Back this project</DialogTitle>
              <DialogDescription className="text-Gray-500">
                Want to support us in bringing Mastercraft Bamboo Monitor Riser
                out in the world?
              </DialogDescription>
            </DialogHeader>

            <RadioGroup
              value={selected || ""}
              onValueChange={(v) => {
                setSelected(v);
                setPledgeAmount(0);
              }}
              className="space-y-6"
            >
              {/* Pledge with no reward */}
              <div
                className={`border rounded-lg p-4 space-y-2 ${
                  selected === "none"
                    ? "border-Green-400 border-2"
                    : "border-gray-200"
                }`}
              >
                <div className="flex gap-4">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="font-bold">
                    Pledge with no reward
                  </Label>
                </div>
                <p className="text-[0.9em] pt-6 md:pt-0 text-Gray-500">
                  Choose to support us without a reward if you simply believe in
                  our project. As a backer. you will be signed up to receive
                  product updates via email.
                </p>
                {selected === "none" && !campaignComplete && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      onClick={handleContinue}
                      className="rounded-full px-8 py-3 text-white bg-Green-400 hover:bg-Green-700"
                    >
                      Continue
                    </Button>
                  </div>
                )}
              </div>

              {/* Rewards */}
              {rewards.map((r) => (
                <div
                  key={r.id}
                  className={`border rounded-lg p-4 space-y-2 ${
                    r.remaining === 0 || campaignComplete
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } ${
                    selected === r.id.toString()
                      ? "border-Green-400 border-2"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem
                        value={r.id.toString()}
                        id={`reward-${r.id}`}
                        disabled={r.remaining === 0 || campaignComplete}
                      />
                      <div className="flex flex-col md:flex-row gap-2">
                        <Label
                          htmlFor={`reward-${r.id}`}
                          className="font-semibold"
                        >
                          {r.title}
                        </Label>
                        <p className="text-Green-400 text-sm font-bold">
                          Pledge ${r.minPledge} or more
                        </p>
                      </div>
                    </div>
                    <p className="hidden text-sm font-medium text-gray-500 md:flex items-center gap-2">
                      <span className="text-black text-xl font-bold">
                        {r.remaining}
                      </span>
                      left
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 pt-4">{r.description}</p>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2 md:hidden pt-4">
                    <span className="text-black text-xl font-bold">
                      {r.remaining}
                    </span>
                    left
                  </p>
                  {selected === r.id.toString() && !campaignComplete && (
                    <div className="mt-6 flex flex-col md:flex-row gap-6 items-center border-t border-gray-200 pt-6 justify-between md:gap-2">
                      <p className="text-sm text-gray-500">Enter your pledge</p>
                      <div className="flex gap-4">
                        <Input
                          type="number"
                          min={r.minPledge}
                          value={pledgeAmount || r.minPledge}
                          onChange={(e) =>
                            setPledgeAmount(Number(e.target.value))
                          }
                          className="w-32 rounded-full font-bold px-4 py-3 "
                        />
                        <Button
                          onClick={handleContinue}
                          className="rounded-full px-8 py-3 text-white bg-Green-400 hover:bg-Green-700"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </>
        ) : (
          <div className="text-center space-y-4 py-6">
            <Image
              src={"/icon-check.svg"}
              alt="check"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h2 className="text-xl font-bold">Thanks for your support!</h2>
            <p className="text-gray-500">
              Your pledge brings us one step closer to sharing Mastercraft
              Bamboo Monitor Riser worldwide. You’ll get an email once our
              campaign is completed.
            </p>
            <Button
              className="bg-Green-400 hover:bg-Green-700 text-white py-4 px-8 rounded-full"
              onClick={() => {
                onOpenChange(false);
                setShowThanks(false);
              }}
            >
              Got it!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
