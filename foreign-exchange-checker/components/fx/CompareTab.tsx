"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "motion/react";
import CurrencyFlag from "../CurrencyFlag";
import FavoriteButton from "./FavoriteButton";
import EmptyState from "./EmptyState";
import type { FavoritePair } from "./types";
import {
  compareTargets,
  fetchRates,
  formatNumber,
  getCurrency,
  getPairId,
} from "./utils";
import type { CurrencyOption } from "../CurrencyPicker";

type CompareRate = {
  quote: string;
  rate: number;
};

type CompareTabProps = {
  base: string;
  sendAmount: string;
  sendAmountNumber: number;
  currencies: CurrencyOption[];
  favorites: FavoritePair[];
  onToggleFavorite: (base: string, target: string, rate: number) => void;
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
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
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CompareTab({
  base,
  sendAmount,
  sendAmountNumber,
  currencies,
  favorites,
  onToggleFavorite,
}: CompareTabProps) {
  const [rates, setRates] = useState<CompareRate[]>([]);
  const [loading, setLoading] = useState(false);

  const validAmount = sendAmount.trim() !== "" && sendAmountNumber > 0;

  useEffect(() => {
    let ignore = false;

    async function loadRates() {
      if (!validAmount) return;

      setLoading(true);

      try {
        const nextRates = await fetchRates(base, compareTargets);

        if (!ignore) {
          setRates(nextRates);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) setRates([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadRates();

    return () => {
      ignore = true;
    };
  }, [base, validAmount]);

  const rows = useMemo(() => {
    return rates.map((rate) => {
      const currency = getCurrency(currencies, rate.quote);
      return {
        ...rate,
        currency,
        convertedAmount: sendAmountNumber * rate.rate,
        favorite: favorites.some(
          (favorite) => favorite.id === getPairId(base, rate.quote),
        ),
      };
    });
  }, [base, currencies, favorites, rates, sendAmountNumber]);

  if (!validAmount) {
    return (
      <EmptyState
        title="No comparison available"
        description="Enter an amount in SEND above to see what your money is worth in other currencies."
      />
    );
  }

  return (
    <section className="rounded-xl bg-surface p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted">
        <p>
          Multi-currency{" "}
          <span className="text-sm tracking-normal text-text">
            {formatNumber(sendAmountNumber, 0)} from {base}
          </span>
        </p>
        <p>{rows.length} pairs</p>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-text-muted">
          Loading comparisons...
        </p>
      ) : (
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {rows.map((row) => (
            <motion.div
              key={row.quote}
              variants={rowVariants}
              whileHover={{ y: -1, borderColor: "#343434" }}
              className="flex items-center justify-between gap-4 rounded-lg border border-surface-raised bg-surface-light px-3 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <CurrencyFlag
                  code={row.currency.code}
                  src={row.currency.flagSrc}
                  size={24}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-text">{row.currency.code}</p>
                  <p className="truncate text-xs text-text-muted">
                    {row.currency.name}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 text-right">
                <div>
                  <p className="text-lg text-text">
                    {formatNumber(row.convertedAmount, 2)}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    @ {formatNumber(row.rate, 4)}
                  </p>
                </div>
                <FavoriteButton
                  active={row.favorite}
                  label={`${row.favorite ? "Unpin" : "Pin"} ${base} to ${
                    row.quote
                  }`}
                  onClick={() => onToggleFavorite(base, row.quote, row.rate)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
