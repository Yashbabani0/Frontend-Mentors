"use client";
import React, { createContext, useContext, useState } from "react";

type Reward = {
  id: number;
  title: string;
  description: string;
  minPledge: number;
  remaining: number;
};

type SupportContextType = {
  totalGoal: number;
  backed: number;
  backers: number;
  rewards: Reward[];
  support: (rewardId: number, amount: number) => boolean;
};

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalGoal] = useState(100000);
  const [backed, setBacked] = useState(89914);
  const [backers, setBackers] = useState(5007);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      title: "Bamboo Stand",
      description: `
You get an ergonomic stand made of natural bamboo. 
You've helped us launch our campaign and will be added to a special backer member list.`,
      minPledge: 25,
      remaining: 101,
    },
    {
      id: 2,
      title: "Black Edition Stand",
      description: `
You get a Black Special Edition computer stand and a personal thank you. 
You’ll be added to our backer member list. Shipping is included.`,
      minPledge: 75,
      remaining: 64,
    },
    {
      id: 3,
      title: "Mahogany Special Edition",
      description: `
You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. 
You’ll be added to our backer member list. Shipping is included.`,
      minPledge: 200,
      remaining: 0,
    },
  ]);

  const support = (rewardId: number, amount: number): boolean => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward || amount < reward.minPledge) {
      return false; // invalid pledge
    }

    // Update backed (cap at goal)
    setBacked((prev) => Math.min(totalGoal, prev + amount));

    // Update backers
    setBackers((prev) => prev + 1);

    // Decrease remaining if reward is limited
    setRewards((prev) =>
      prev.map((r) =>
        r.id === rewardId && r.remaining > 0
          ? { ...r, remaining: r.remaining - 1 }
          : r
      )
    );

    return true;
  };

  return (
    <SupportContext.Provider
      value={{
        totalGoal,
        backed,
        backers,
        rewards,
        support,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const ctx = useContext(SupportContext);
  if (!ctx) throw new Error("useSupport must be used within SupportProvider");
  return ctx;
};
