"use client";
import React from "react";
import { motion, type Variants } from "motion/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type Step1FormData = {
  name: string;
  email: string;
  phone: string;
};

type Step1Props = {
  defaultValues: Step1FormData;
  onSubmit: (data: Step1FormData) => void;
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

export default function Step1({ defaultValues, onSubmit }: Step1Props) {
  const [formData, setFormData] = React.useState<Step1FormData>(() => ({
    name: defaultValues.name,
    email: defaultValues.email,
    phone: defaultValues.phone,
  }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
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
        className="mt-6 flex h-full flex-col justify-between md:mt-10"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <Label htmlFor="name" className="font-light text-blue-950">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-sm border border-purple-200 bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2"
              placeholder="e.g. Stephen King"
              required
            />
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <Label htmlFor="email" className="font-light text-blue-950">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-sm border border-purple-200 bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2"
              placeholder="e.g. stephenking@lorem.com"
              required
            />
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="flex w-full flex-col gap-2"
          >
            <Label htmlFor="phone" className="font-light text-blue-950">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-sm border border-purple-200 bg-transparent py-5 font-semibold placeholder:font-semibold placeholder:text-grey-500 md:rounded-lg md:border-2"
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
