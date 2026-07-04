"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import deleteIcon from "@/public/icon-delete.svg";
import EmptyState from "./EmptyState";
import type { ConversionLogEntry } from "./types";
import { formatCompactTime, formatNumber } from "./utils";

type ConversionLogTabProps = {
  conversionLog: ConversionLogEntry[];
  onDeleteLogEntry: (id: string) => void;
  onClearLog: () => void;
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ConversionLogTab({
  conversionLog,
  onDeleteLogEntry,
  onClearLog,
}: ConversionLogTabProps) {
  if (conversionLog.length === 0) {
    return (
      <EmptyState
        title="No conversions logged yet"
        description="Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."
      />
    );
  }

  return (
    <section className="rounded-xl bg-surface p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted">
        <p>Conversion log</p>
        <div className="flex items-center gap-4">
          <p>{conversionLog.length} logged</p>
          <button
            type="button"
            onClick={onClearLog}
            className="rounded-md border border-surface-raised px-2 py-1 transition hover:border-lime hover:text-text focus:outline-none focus:ring-2 focus:ring-lime/60"
          >
            Clear all
          </button>
        </div>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {conversionLog.map((entry) => (
          <motion.div
            key={entry.id}
            variants={rowVariants}
            whileHover={{ y: -1, borderColor: "#343434" }}
            className="grid grid-cols-[3.5rem_1fr_auto_auto] items-center gap-3 rounded-lg border border-surface-raised bg-surface-light px-3 py-3 text-sm"
          >
            <span className="text-[10px] uppercase text-text-muted">
              {formatCompactTime(entry.createdAt)}
            </span>
            <span className="font-semibold text-text">
              {entry.base} <span className="text-text-muted">→</span>{" "}
              {entry.target}
            </span>
            <span className="text-right text-text-muted">
              {formatNumber(entry.sendAmount, 2)}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-right font-semibold text-lime">
                {formatNumber(entry.receiveAmount, 2)}
              </span>
              <button
                type="button"
                onClick={() => onDeleteLogEntry(entry.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-raised bg-surface transition hover:border-red focus:outline-none focus:ring-2 focus:ring-lime/60"
                aria-label={`Delete ${entry.base} to ${entry.target} log`}
              >
                <Image src={deleteIcon} width={14} height={14} alt="" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
