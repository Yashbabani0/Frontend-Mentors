"use client";

import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";
import Image from "next/image";
import desktopSidebar from "@/public/bg-sidebar-desktop.svg";
import mobileSidebar from "@/public/bg-sidebar-mobile.svg";
import React from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

const STORAGE_KEY = "multi-step-form";

export type Step1FormData = {
  name: string;
  email: string;
  phone: string;
};

export type BillingCycle = "monthly" | "yearly";

export type Step2FormData = {
  selectedPlanId: number | null;
  billingCycle: BillingCycle;
};

export type Step3FormData = {
  selectedAddonIds: number[];
};

type SavedFormState = {
  activeStep: number;
  step1Data: Step1FormData;
  step2Data: Step2FormData;
  step3Data: Step3FormData;
};

const defaultStep1Data: Step1FormData = {
  name: "",
  email: "",
  phone: "",
};

const defaultStep2Data: Step2FormData = {
  selectedPlanId: 1,
  billingCycle: "monthly",
};

const defaultStep3Data: Step3FormData = {
  selectedAddonIds: [1, 2],
};

const defaultSavedState: SavedFormState = {
  activeStep: 1,
  step1Data: defaultStep1Data,
  step2Data: defaultStep2Data,
  step3Data: defaultStep3Data,
};

function getInitialFormState(): SavedFormState {
  if (typeof window === "undefined") {
    return defaultSavedState;
  }

  const savedData = window.localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return defaultSavedState;
  }

  try {
    const parsedData = JSON.parse(savedData) as Partial<SavedFormState>;

    const savedStep = parsedData.activeStep;
    const savedBillingCycle = parsedData.step2Data?.billingCycle;
    const savedAddonIds = parsedData.step3Data?.selectedAddonIds;

    return {
      activeStep:
        typeof savedStep === "number" && savedStep >= 1 && savedStep <= 4
          ? savedStep
          : 1,

      step1Data: {
        name: parsedData.step1Data?.name || "",
        email: parsedData.step1Data?.email || "",
        phone: parsedData.step1Data?.phone || "",
      },

      step2Data: {
        selectedPlanId:
          typeof parsedData.step2Data?.selectedPlanId === "number"
            ? parsedData.step2Data.selectedPlanId
            : 1,
        billingCycle:
          savedBillingCycle === "monthly" || savedBillingCycle === "yearly"
            ? savedBillingCycle
            : "monthly",
      },

      step3Data: {
        selectedAddonIds: Array.isArray(savedAddonIds) ? savedAddonIds : [1, 2],
      },
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultSavedState;
  }
}

const steps = [
  {
    id: 1,
    label: "Step 1",
    title: "Your info",
  },
  {
    id: 2,
    label: "Step 2",
    title: "Select plan",
  },
  {
    id: 3,
    label: "Step 3",
    title: "Add-ons",
  },
  {
    id: 4,
    label: "Step 4",
    title: "Summary",
  },
];

const pageVariants: Variants = {
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

export default function Page() {
  const [savedState, setSavedState] =
    React.useState<SavedFormState>(getInitialFormState);

  const activeStep = savedState.activeStep;
  const step1Data = savedState.step1Data;
  const step2Data = savedState.step2Data;
  const step3Data = savedState.step3Data;

  function saveState(nextState: SavedFormState) {
    setSavedState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function goToStep(step: number) {
    saveState({
      ...savedState,
      activeStep: step,
    });
  }

  function handleStep1Submit(nextStep1Data: Step1FormData) {
    saveState({
      ...savedState,
      activeStep: 2,
      step1Data: nextStep1Data,
    });
  }

  function handleStep2Submit(nextStep2Data: Step2FormData) {
    saveState({
      ...savedState,
      activeStep: 3,
      step2Data: nextStep2Data,
    });
  }

  function handleStep3Submit(nextStep3Data: Step3FormData) {
    saveState({
      ...savedState,
      activeStep: 4,
      step3Data: nextStep3Data,
    });
  }

  function handleBack() {
    saveState({
      ...savedState,
      activeStep: Math.max(activeStep - 1, 1),
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-2xl bg-white p-4 md:flex md:min-h-150 md:gap-8"
      >
        <div className="relative h-43 w-full overflow-hidden rounded-xl md:h-auto md:w-68.5 md:shrink-0">
          <Image
            src={mobileSidebar}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />

          <Image
            src={desktopSidebar}
            alt=""
            fill
            priority
            sizes="274px"
            className="hidden object-cover md:block"
          />

          <div className="absolute left-1/2 top-8 flex -translate-x-1/2 gap-4 md:left-10 md:top-10 md:translate-x-0 md:flex-col md:gap-7">
            {steps.map((item) => {
              const isActive = activeStep === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => goToStep(item.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-4 text-left"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className={`flex size-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-blue-300 text-blue-950"
                        : "border border-blue-200 text-blue-200"
                    }`}
                  >
                    {item.id}
                  </motion.span>

                  <span className="hidden md:block">
                    <p className="text-[0.7em] font-medium uppercase text-grey-500">
                      {item.label}
                    </p>
                    <b className="text-[0.9em] uppercase text-blue-200">
                      {item.title}
                    </b>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-2 py-8 md:px-12 md:py-10">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <Step1
                key="step-1"
                defaultValues={step1Data}
                onSubmit={handleStep1Submit}
              />
            )}

            {activeStep === 2 && (
              <Step2
                key="step-2"
                defaultValues={step2Data}
                onBack={handleBack}
                onSubmit={handleStep2Submit}
              />
            )}

            {activeStep === 3 && (
              <Step3
                key="step-3"
                billingCycle={step2Data.billingCycle}
                defaultValues={step3Data}
                onBack={handleBack}
                onSubmit={handleStep3Submit}
              />
            )}

            {activeStep === 4 && (
              <motion.div
                key="step-4"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-auto flex h-full w-full max-w-xl flex-col"
              >
                <section>
                  <h1 className="text-3xl font-bold text-blue-950">
                    Finishing up
                  </h1>
                  <p className="mt-2 text-grey-500">
                    Double-check everything looks OK before confirming.
                  </p>

                  <div className="mt-8 space-y-2 rounded-lg bg-slate-100 p-4 text-blue-950">
                    <p>Name: {step1Data.name}</p>
                    <p>Email: {step1Data.email}</p>
                    <p>Phone: {step1Data.phone}</p>
                    <p>Plan ID: {step2Data.selectedPlanId}</p>
                    <p>Billing: {step2Data.billingCycle}</p>
                    <p>Add-ons: {step3Data.selectedAddonIds.join(", ")}</p>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
