"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

type CurrenciesResponse = Record<string, string>;

const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Navbar() {
  const [currencyCount, setCurrencyCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v2/currencies",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }

        const data: CurrenciesResponse = await response.json();
        setCurrencyCount(Object.keys(data).length);
      } catch (error) {
        console.error(error);
        setCurrencyCount(null);
      }
    }

    fetchCurrencies();
  }, []);

  const navMeta = [
    {
      id: "currencies",
      label:
        currencyCount === null
          ? "Loading Currencies"
          : `${currencyCount} Currencies`,
    },
    {
      id: "eod",
      label: "EOD",
    },
    {
      id: "ecb",
      label: "ECB Data",
    },
  ];

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 flex items-center justify-between bg-black/85 p-6 text-text-muted backdrop-blur-xl"
    >
      <motion.div variants={itemVariants}>
        <Image
          src={logo}
          alt="FX Checker logo"
          width={150}
          height={100}
          className="md:w-44"
          priority
        />
      </motion.div>

      <motion.div className="hidden items-center text-sm uppercase tracking-[0.25em] md:flex">
        {navMeta.map((item) => (
          <motion.p
            key={item.id}
            variants={itemVariants}
            className="flex items-center before:mx-3 before:text-text-muted/60 before:content-['•'] first:before:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={item.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </AnimatePresence>
          </motion.p>
        ))}
      </motion.div>
    </motion.nav>
  );
}
