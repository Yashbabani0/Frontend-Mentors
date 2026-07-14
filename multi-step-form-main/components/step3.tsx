"use client";
import React from "react";
import { Check } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";

type BillingCycle = "monthly" | "yearly";

type Step3FormData = {
  selectedAddonIds: number[];
};

type Step3Props = {
  billingCycle: BillingCycle;
  defaultValues: Step3FormData;
  onChange: (data: Step3FormData) => void;
  onBack: () => void;
  onSubmit: () => void;
};

const addons = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 3,
    name: "Customizable Profile",
    description: "Custom theme on your profile",
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

export default function Step3({
  billingCycle,
  defaultValues,
  onChange,
  onBack,
  onSubmit,
}: Step3Props) {
  const selectedAddonIds = defaultValues.selectedAddonIds;

  const isYearly = billingCycle === "yearly";

  function toggleAddon(addonId: number) {
    onChange({ selectedAddonIds: selectedAddonIds.includes(addonId)
      ? selectedAddonIds.filter((id) => id !== addonId)
      : [...selectedAddonIds, addonId] });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit();
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
        <h1 className="text-2xl font-bold text-blue-950 md:text-3xl">
          Pick add-ons
        </h1>
        <p className="mt-2 leading-6 text-grey-500">
          Add-ons help enhance your gaming experience.
        </p>
      </motion.section>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex h-full flex-col justify-between md:mt-10"
      >
        <motion.section variants={itemVariants} className="space-y-3 md:space-y-4">
          {addons.map((addon) => {
            const inputId = `addon-${addon.id}`;
            const isSelected = selectedAddonIds.includes(addon.id);
            const price = isYearly ? addon.yearlyPrice : addon.monthlyPrice;
            const suffix = isYearly ? "yr" : "mo";

            return (
              <motion.label
                key={addon.id}
                htmlFor={inputId}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border p-4 text-left transition-colors md:gap-4 ${
                  isSelected
                    ? "border-purple-600 bg-slate-50"
                    : "border-gray-300 bg-white hover:border-purple-600 hover:bg-slate-50"
                }`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAddon(addon.id)}
                  className="sr-only"
                />

                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    isSelected
                      ? "border-purple-600 bg-purple-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="size-3.5 text-white" />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-blue-950">
                    {addon.name}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-grey-500 md:mt-1 md:text-sm">
                    {addon.description}
                  </span>
                </span>

                <span className="shrink-0 text-xs font-medium text-purple-600 md:text-sm">
                  +${price}/{suffix}
                </span>
              </motion.label>
            );
          })}
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="fixed inset-x-0 bottom-0 z-20 flex w-full items-center justify-between bg-white px-4 py-4 md:static md:bg-transparent md:px-0 md:pt-8 md:pb-0"
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
            className="rounded-sm bg-blue-950 px-5 py-5 text-blue-100 transition hover:bg-blue-900 md:rounded-lg md:px-6"
          >
            Next Step
          </Button>
        </motion.section>
      </form>
    </motion.div>
  );
}
