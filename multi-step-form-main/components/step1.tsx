"use client";
import React from "react";
import { motion, type Variants } from "motion/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import type { Step1Errors, Step1FormData } from "@/app/page";

type Step1Props = {
  defaultValues: Step1FormData;
  errors: Step1Errors;
  onChange: (data: Step1FormData) => void;
  onSubmit: () => void;
};

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

export default function Step1({ defaultValues, errors, onChange, onSubmit }: Step1Props) {
  React.useEffect(() => {
    const firstInvalidField = (["name", "email", "phone"] as const).find(
      (field) => errors[field],
    );
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
    }
  }, [errors]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    onChange({
      ...defaultValues,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={stepVariants}
      className="mx-auto flex h-full w-full max-w-xl flex-col"
    >
      <motion.section variants={itemVariants}>
        <h1 className="text-2xl font-bold text-blue-950 md:text-3xl">
          Personal info
        </h1>
        <p className="mt-2 leading-6 text-grey-500">
          Please provide your name, email address, and phone number.
        </p>
      </motion.section>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 flex h-full flex-col justify-between md:mt-10"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <div className="flex justify-between gap-3"><Label htmlFor="name" className="font-light text-blue-950">Name</Label>{errors.name && <span id="name-error" role="alert" className="text-sm font-bold text-red-500">{errors.name}</span>}</div>
            <Input
              type="text"
              id="name"
              name="name"
              value={defaultValues.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full rounded-sm border bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2 ${errors.name ? "border-red-500" : "border-purple-200"}`}
              placeholder="e.g. Stephen King"
              required
            />
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <div className="flex justify-between gap-3"><Label htmlFor="email" className="font-light text-blue-950">Email Address</Label>{errors.email && <span id="email-error" role="alert" className="text-sm font-bold text-red-500">{errors.email}</span>}</div>
            <Input
              type="email"
              id="email"
              name="email"
              value={defaultValues.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-sm border bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2 ${errors.email ? "border-red-500" : "border-purple-200"}`}
              placeholder="e.g. stephenking@lorem.com"
              required
            />
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <div className="flex justify-between gap-3"><Label htmlFor="phone" className="font-light text-blue-950">Phone Number</Label>{errors.phone && <span id="phone-error" role="alert" className="text-sm font-bold text-red-500">{errors.phone}</span>}</div>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={defaultValues.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full rounded-sm border bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2 ${errors.phone ? "border-red-500" : "border-purple-200"}`}
              placeholder="e.g. +1 234 567 890"
              minLength={10}
              maxLength={15}
              required
            />
          </motion.section>
        </div>

        <motion.section
          variants={itemVariants}
          className="fixed inset-x-0 bottom-0 z-20 flex w-full items-center justify-end bg-white px-4 py-4 md:static md:bg-transparent md:px-0 md:pt-8 md:pb-0"
        >
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
