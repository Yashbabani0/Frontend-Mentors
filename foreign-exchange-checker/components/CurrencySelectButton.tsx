"use client";
import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import arrowDownIcon from "@/public/icon-chevron-down.svg";
import CurrencyFlag from "./CurrencyFlag";

type CurrencySelectButtonProps = {
  currencyCode: string;
  flagSrc: StaticImageData | string;
  label: string;
  onClick?: () => void;
};

export default function CurrencySelectButton({
  currencyCode,
  flagSrc,
  label,
  onClick,
}: CurrencySelectButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-surface-raised p-2 font-semibold text-text"
      aria-label={label}
      aria-haspopup="dialog"
    >
      <CurrencyFlag code={currencyCode} src={flagSrc} />
      <span>{currencyCode}</span>
      <Image src={arrowDownIcon} width={12} height={12} alt="" />
    </motion.button>
  );
}
