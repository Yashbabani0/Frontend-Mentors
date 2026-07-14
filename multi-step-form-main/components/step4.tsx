"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";

type BillingCycle = "monthly" | "yearly";

type Step2FormData = {
  selectedPlanId: number | null;
  billingCycle: BillingCycle;
};

type Step3FormData = {
  selectedAddonIds: number[];
};

type Step4Props = {
  step2Data: Step2FormData;
  step3Data: Step3FormData;
  onBack: () => void;
  onChangePlan: () => void;
  onConfirm: () => void;
};

const plans = [
  {
    id: 1,
    name: "Arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    id: 2,
    name: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    id: 3,
    name: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];

const addons = [
  {
    id: 1,
    name: "Online service",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 2,
    name: "Larger storage",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 3,
    name: "Customizable Profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stepVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export default function Step4({
  step2Data,
  step3Data,
  onBack,
  onChangePlan,
  onConfirm,
}: Step4Props) {
  const isYearly = step2Data.billingCycle === "yearly";
  const suffix = isYearly ? "yr" : "mo";
  const totalLabel = isYearly ? "Total (per year)" : "Total (per month)";
  const billingLabel = isYearly ? "Yearly" : "Monthly";

  const selectedPlan =
    plans.find((plan) => plan.id === step2Data.selectedPlanId) || plans[0];

  const selectedAddons = addons.filter((addon) =>
    step3Data.selectedAddonIds.includes(addon.id),
  );

  const planPrice = isYearly
    ? selectedPlan.yearlyPrice
    : selectedPlan.monthlyPrice;

  const addonsTotal = selectedAddons.reduce((total, addon) => {
    return total + (isYearly ? addon.yearlyPrice : addon.monthlyPrice);
  }, 0);

  const total = planPrice + addonsTotal;

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto flex h-full w-full max-w-xl flex-col"
    >
      <motion.section variants={itemVariants}>
        <h1 className="text-3xl font-bold text-blue-950">Finishing up</h1>
        <p className="mt-2 text-grey-500">
          Double-check everything looks OK before confirming.
        </p>
      </motion.section>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onConfirm();
        }}
        className="mt-10 flex h-full flex-col justify-between"
      >
        <div>
          <motion.section
            variants={itemVariants}
            className="rounded-lg bg-slate-50 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-blue-950">
                  {selectedPlan.name} ({billingLabel})
                </h2>

                <button
                  type="button"
                  onClick={onChangePlan}
                  className="mt-1 text-sm font-medium text-grey-500 underline transition hover:text-purple-500"
                >
                  Change
                </button>
              </div>

              <p className="font-bold text-blue-950">
                ${planPrice}/{suffix}
              </p>
            </div>

            {selectedAddons.length > 0 && (
              <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
                {selectedAddons.map((addon) => {
                  const addonPrice = isYearly
                    ? addon.yearlyPrice
                    : addon.monthlyPrice;

                  return (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <p className="text-sm font-medium text-grey-500">
                        {addon.name}
                      </p>

                      <p className="text-sm font-medium text-blue-950">
                        +${addonPrice}/{suffix}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="mt-6 flex items-center justify-between px-6"
          >
            <p className="text-sm font-medium text-grey-500">{totalLabel}</p>

            <p className="text-xl font-bold text-purple-500">
              +${total}/{suffix}
            </p>
          </motion.section>
        </div>

        <motion.section
          variants={itemVariants}
          className="flex w-full items-center justify-between pt-8"
        >
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="px-0 font-bold text-grey-500 hover:bg-transparent hover:text-blue-950"
          >
            Go Back
          </Button>

          <Button
            type="submit"
            className="bg-purple-500 px-7 py-5 text-white transition hover:bg-purple-600"
          >
            Confirm
          </Button>
        </motion.section>
      </form>
    </motion.div>
  );
}
