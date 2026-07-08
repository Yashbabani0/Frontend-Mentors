"use client";
import React from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import iconArcade from "@/public/icon-arcade.svg";
import iconAdvanced from "@/public/icon-advanced.svg";
import iconPro from "@/public/icon-pro.svg";

type BillingCycle = "monthly" | "yearly";

type Step2FormData = {
  selectedPlanId: number | null;
  billingCycle: BillingCycle;
};

type Step2Props = {
  defaultValues: Step2FormData;
  onBack: () => void;
  onSubmit: (data: Step2FormData) => void;
};

const plans = [
  {
    id: 1,
    name: "Arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: iconArcade,
  },
  {
    id: 2,
    name: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: iconAdvanced,
  },
  {
    id: 3,
    name: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: iconPro,
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

export default function Step2({ defaultValues, onBack, onSubmit }: Step2Props) {
  const [selectedPlanId, setSelectedPlanId] = React.useState<number | null>(
    () => defaultValues.selectedPlanId,
  );

  const [billingCycle, setBillingCycle] = React.useState<BillingCycle>(
    () => defaultValues.billingCycle,
  );

  const isYearly = billingCycle === "yearly";

  function handleBillingChange(checked: boolean) {
    setBillingCycle(checked ? "yearly" : "monthly");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPlanId) {
      return;
    }

    onSubmit({
      selectedPlanId,
      billingCycle,
    });
  }

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto flex h-full w-full max-w-xl flex-col"
    >
      <motion.section variants={itemVariants}>
        <h1 className="text-3xl font-bold text-blue-950">Select your plan</h1>
        <p className="mt-2 text-grey-500">
          You have the option of monthly or yearly billing.
        </p>
      </motion.section>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex h-full flex-col justify-between"
      >
        <div className="space-y-8">
          <motion.section
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;

              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex min-h-35 flex-row items-center gap-4 rounded-lg border p-4 text-left transition-colors md:flex-col md:items-start md:justify-between ${
                    isSelected
                      ? "border-purple-500 bg-slate-50"
                      : "border-gray-300 bg-white hover:border-purple-500 hover:bg-slate-50"
                  }`}
                >
                  <Image
                    src={plan.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="shrink-0"
                  />

                  <span>
                    <span className="block font-bold text-blue-950">
                      {plan.name}
                    </span>

                    <span className="mt-1 block text-sm text-grey-500">
                      {isYearly
                        ? `$${plan.yearlyPrice}/yr`
                        : `$${plan.monthlyPrice}/mo`}
                    </span>

                    {isYearly && (
                      <span className="mt-1 block text-xs font-medium text-blue-950">
                        2 months free
                      </span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="flex items-center justify-center gap-6 rounded-lg bg-slate-50 px-4 py-3"
          >
            <span
              className={`text-sm font-bold ${
                !isYearly ? "text-blue-950" : "text-grey-500"
              }`}
            >
              Monthly
            </span>

            <Switch checked={isYearly} onCheckedChange={handleBillingChange} />

            <span
              className={`text-sm font-bold ${
                isYearly ? "text-blue-950" : "text-grey-500"
              }`}
            >
              Yearly
            </span>
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
            className="bg-blue-950 px-6 py-5 text-blue-100 transition hover:bg-blue-900"
          >
            Next Step
          </Button>
        </motion.section>
      </form>
    </motion.div>
  );
}
