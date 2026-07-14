"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import thankYouIcon from "@/public/icon-thank-you.svg";

type Step5Props = {
  onRestart: () => void;
};

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Step5({ onRestart }: Step5Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center px-4 py-12 text-center"
    >
      <motion.div variants={itemVariants}>
        <Image
          src={thankYouIcon}
          alt=""
          width={80}
          height={80}
          priority
          className="mx-auto"
        />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-8 text-3xl font-bold text-blue-950"
      >
        Thank you!
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-4 max-w-md leading-7 text-grey-500"
      >
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-8">
        <Button
          type="button"
          onClick={onRestart}
          className="bg-blue-950 px-6 py-5 text-blue-100 hover:bg-blue-900"
        >
          Start Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
