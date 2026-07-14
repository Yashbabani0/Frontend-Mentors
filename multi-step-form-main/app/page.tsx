"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";
import Step4 from "@/components/step4";
import Step5 from "@/components/step5";

import desktopSidebar from "@/public/bg-sidebar-desktop.svg";
import mobileSidebar from "@/public/bg-sidebar-mobile.svg";

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
  isComplete: boolean;
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

function createDefaultSavedState(): SavedFormState {
  return {
    activeStep: 1,
    isComplete: false,
    step1Data: {
      ...defaultStep1Data,
    },
    step2Data: {
      ...defaultStep2Data,
    },
    step3Data: {
      selectedAddonIds: [...defaultStep3Data.selectedAddonIds],
    },
  };
}

function getInitialFormState(): SavedFormState {
  const defaultState = createDefaultSavedState();

  if (typeof window === "undefined") {
    return defaultState;
  }

  const savedData = window.localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return defaultState;
  }

  try {
    const parsedData = JSON.parse(savedData) as Partial<SavedFormState>;

    const savedStep = parsedData.activeStep;
    const savedPlanId = parsedData.step2Data?.selectedPlanId;
    const savedBillingCycle = parsedData.step2Data?.billingCycle;
    const savedAddonIds = parsedData.step3Data?.selectedAddonIds;

    return {
      activeStep:
        typeof savedStep === "number" && savedStep >= 1 && savedStep <= 4
          ? savedStep
          : 1,

      // Completed state is not restored from localStorage.
      // After refresh, the form starts again from the saved step or Step 1.
      isComplete: false,

      step1Data: {
        name:
          typeof parsedData.step1Data?.name === "string"
            ? parsedData.step1Data.name
            : "",
        email:
          typeof parsedData.step1Data?.email === "string"
            ? parsedData.step1Data.email
            : "",
        phone:
          typeof parsedData.step1Data?.phone === "string"
            ? parsedData.step1Data.phone
            : "",
      },

      step2Data: {
        selectedPlanId:
          typeof savedPlanId === "number" && [1, 2, 3].includes(savedPlanId)
            ? savedPlanId
            : 1,

        billingCycle:
          savedBillingCycle === "monthly" || savedBillingCycle === "yearly"
            ? savedBillingCycle
            : "monthly",
      },

      step3Data: {
        selectedAddonIds: Array.isArray(savedAddonIds)
          ? savedAddonIds.filter(
              (id): id is number =>
                typeof id === "number" && [1, 2, 3].includes(id),
            )
          : [1, 2],
      },
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultState;
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
] as const;

export default function Page() {
  const [savedState, setSavedState] =
    React.useState<SavedFormState>(getInitialFormState);

  const activeStep = savedState.activeStep;
  const isComplete = savedState.isComplete;
  const step1Data = savedState.step1Data;
  const step2Data = savedState.step2Data;
  const step3Data = savedState.step3Data;

  function saveState(nextState: SavedFormState) {
    setSavedState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function goToStep(step: number) {
    if (isComplete) {
      return;
    }

    saveState({
      ...savedState,
      activeStep: step,
      isComplete: false,
    });
  }

  function handleStep1Submit(nextStep1Data: Step1FormData) {
    saveState({
      ...savedState,
      activeStep: 2,
      isComplete: false,
      step1Data: nextStep1Data,
    });
  }

  function handleStep2Submit(nextStep2Data: Step2FormData) {
    saveState({
      ...savedState,
      activeStep: 3,
      isComplete: false,
      step2Data: nextStep2Data,
    });
  }

  function handleStep3Submit(nextStep3Data: Step3FormData) {
    saveState({
      ...savedState,
      activeStep: 4,
      isComplete: false,
      step3Data: nextStep3Data,
    });
  }

  function handleChangePlan() {
    saveState({
      ...savedState,
      activeStep: 2,
      isComplete: false,
    });
  }

  function handleBack() {
    saveState({
      ...savedState,
      activeStep: Math.max(activeStep - 1, 1),
      isComplete: false,
    });
  }

  function handleConfirm() {
    setSavedState({
      ...savedState,
      activeStep: 4,
      isComplete: true,
    });

    // Remove all saved form data after successful confirmation.
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function handleRestart() {
    const freshState = createDefaultSavedState();

    setSavedState(freshState);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="w-full max-w-4xl rounded-2xl bg-white p-4 md:flex md:min-h-150 md:gap-8"
      >
        {/* Sidebar */}
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

          <div className="absolute top-8 left-1/2 flex -translate-x-1/2 gap-4 md:top-10 md:left-10 md:translate-x-0 md:flex-col md:gap-7">
            {steps.map((item) => {
              const isActive =
                activeStep === item.id || (isComplete && item.id === 4);

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => goToStep(item.id)}
                  disabled={isComplete}
                  whileHover={isComplete ? undefined : { scale: 1.03 }}
                  whileTap={isComplete ? undefined : { scale: 0.96 }}
                  className="flex items-center gap-4 text-left disabled:cursor-default"
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
                    <span className="block text-[0.7em] font-medium text-grey-500 uppercase">
                      {item.label}
                    </span>

                    <span className="block text-[0.9em] font-bold text-blue-200 uppercase">
                      {item.title}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Form content */}
        <div className="flex flex-1 flex-col px-2 py-8 md:px-12 md:py-10">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <Step5 key="step-5" onRestart={handleRestart} />
            ) : (
              <>
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
                  <Step4
                    key="step-4"
                    step2Data={step2Data}
                    step3Data={step3Data}
                    onBack={handleBack}
                    onChangePlan={handleChangePlan}
                    onConfirm={handleConfirm}
                  />
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
