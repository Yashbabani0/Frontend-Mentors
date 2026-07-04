"use client";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import checkIcon from "@/public/icon-check.svg";
import searchIcon from "@/public/icon-search.svg";
import CurrencyFlag from "./CurrencyFlag";

export type CurrencyOption = {
  code: string;
  name: string;
  flagSrc: StaticImageData | string;
};

export type Currency = CurrencyOption;

type CurrencyPickerProps = {
  open: boolean;
  selectedCurrency: string;
  currencies: CurrencyOption[];
  loading?: boolean;
  onSelect: (currency: CurrencyOption) => void;
  onClose: () => void;
};

const popularCurrencyCodes = ["USD", "EUR", "GBP"];

const fallbackCurrencies: CurrencyOption[] = [
  { code: "USD", name: "US Dollar", flagSrc: "/flags/us.webp" },
  { code: "EUR", name: "Euro", flagSrc: "/flags/eu.webp" },
  { code: "GBP", name: "British Pound", flagSrc: "/flags/gb.webp" },
  { code: "AED", name: "UAE Dirham", flagSrc: "/flags/ae.webp" },
  { code: "ARS", name: "Argentine Peso", flagSrc: "/flags/ar.webp" },
  { code: "AUD", name: "Australian Dollar", flagSrc: "/flags/au.webp" },
  { code: "BDT", name: "Bangladeshi Taka", flagSrc: "/flags/bd.webp" },
  { code: "CAD", name: "Canadian Dollar", flagSrc: "/flags/ca.webp" },
  { code: "CHF", name: "Swiss Franc", flagSrc: "/flags/ch.webp" },
  { code: "INR", name: "Indian Rupee", flagSrc: "/flags/in.webp" },
  { code: "JPY", name: "Japanese Yen", flagSrc: "/flags/jp.webp" },
];

const pickerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: {
      duration: 0.14,
    },
  },
};

export default function CurrencyPicker({
  open,
  selectedCurrency,
  currencies,
  loading = false,
  onSelect,
  onClose,
}: CurrencyPickerProps) {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const availableCurrencies =
    currencies.length > 0 ? currencies : fallbackCurrencies;

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return availableCurrencies;

    return availableCurrencies.filter((currency) => {
      return (
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
      );
    });
  }, [availableCurrencies, search]);

  const popularCurrencies = filteredCurrencies.filter((currency) =>
    popularCurrencyCodes.includes(currency.code),
  );

  const otherCurrencies = filteredCurrencies.filter(
    (currency) => !popularCurrencyCodes.includes(currency.code),
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          variants={pickerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(22.625rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-surface-raised bg-surface-light shadow-2xl"
          role="dialog"
          aria-label="Currency picker"
        >
          <div className="p-2">
            <label className="relative block">
              <span className="sr-only">Search currencies</span>
              <Image
                src={searchIcon}
                width={16}
                height={16}
                alt=""
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search currencies..."
                className="w-full rounded-md border border-surface-raised bg-surface py-2 pl-9 pr-3 text-sm text-text outline-none placeholder:text-text-muted focus:border-lime focus:ring-2 focus:ring-lime/30"
              />
            </label>
          </div>

          {loading ? (
            <div className="px-4 py-6 text-sm text-text-muted">
              Loading currencies...
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto pb-2">
              <CurrencyGroup
                title="POPULAR"
                count={popularCurrencies.length}
                currencies={popularCurrencies}
                selectedCurrency={selectedCurrency}
                onSelect={onSelect}
              />

              <CurrencyGroup
                title="OTHER CURRENCIES"
                count={otherCurrencies.length}
                currencies={otherCurrencies}
                selectedCurrency={selectedCurrency}
                onSelect={onSelect}
              />

              {filteredCurrencies.length === 0 ? (
                <p className="px-4 py-6 text-sm text-text-muted">
                  No currencies found.
                </p>
              ) : null}
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CurrencyGroup({
  title,
  count,
  currencies,
  selectedCurrency,
  onSelect,
}: {
  title: string;
  count: number;
  currencies: CurrencyOption[];
  selectedCurrency: string;
  onSelect: (currency: CurrencyOption) => void;
}) {
  if (currencies.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between border-t border-surface-raised px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-text-muted first:border-t-0">
        <span>{title}</span>
        <span>{count}</span>
      </div>

      <div>
        {currencies.map((currency) => {
          const isSelected = currency.code === selectedCurrency;

          return (
            <button
              key={currency.code}
              type="button"
              onClick={() => onSelect(currency)}
              className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-text hover:bg-surface-raised focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime/40"
              role="option"
              aria-selected={isSelected}
              aria-label={`Select ${currency.code}, ${currency.name}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <CurrencyFlag code={currency.code} src={currency.flagSrc} />

                <span className="font-semibold">{currency.code}</span>

                <span className="truncate text-xs text-text-muted">
                  {currency.name}
                </span>
              </span>

              {isSelected ? (
                <Image src={checkIcon} width={14} height={14} alt="" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
