"use client";

import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { motion, type Variants } from "motion/react";
import CurrencySelectButton from "./CurrencySelectButton";

type CurrencyAmountBoxProps = {
  label: "SEND" | "RECEIVE";
  amount: string;
  currencyCode: string;
  flagSrc: StaticImageData | string;
  picker?: ReactNode;
  pickerOpen?: boolean;
  isInput?: boolean;
  amountClassName?: string;
  variants?: Variants;
  onAmountChange?: (value: string) => void;
  onCurrencyClick?: () => void;
};

export default function CurrencyAmountBox({
  label,
  amount,
  currencyCode,
  flagSrc,
  picker,
  pickerOpen = false,
  isInput = false,
  amountClassName = "text-white",
  variants,
  onAmountChange,
  onCurrencyClick,
}: CurrencyAmountBoxProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`relative flex h-32 w-full min-w-0 flex-1 basis-0 items-center justify-between gap-4 rounded-2xl border border-surface-raised bg-surface-light p-4 ${
        pickerOpen ? "z-50" : "z-0"
      }`}
    >
      <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-between overflow-hidden">
        <h3 className="text-text-muted">{label}</h3>

        {isInput ? (
          <input
            value={amount}
            onChange={(event) => onAmountChange?.(event.target.value)}
            inputMode="decimal"
            aria-label="Send amount"
            className={`w-full min-w-0 truncate bg-transparent text-4xl font-bold outline-none md:text-5xl ${amountClassName}`}
          />
        ) : (
          <motion.p
            key={amount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
            className={`w-full min-w-0 truncate text-4xl font-bold md:text-5xl ${amountClassName}`}
          >
            {amount}
          </motion.p>
        )}
      </div>

      <div className="flex h-full shrink-0 items-end">
        <CurrencySelectButton
          currencyCode={currencyCode}
          flagSrc={flagSrc}
          label={`Select ${label.toLowerCase()} currency`}
          onClick={onCurrencyClick}
        />
      </div>

      {picker}
    </motion.div>
  );
}
