"use client";

import type { CurrencyOption } from "../CurrencyPicker";

export const compareTargets = [
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "INR",
  "CNY",
  "BDT",
];

export const fallbackCurrencyNames: Record<string, string> = {
  AUD: "Australian Dollar",
  BDT: "Bangladeshi Taka",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  USD: "US Dollar",
};

export function getPairId(base: string, target: string) {
  return `${base}-${target}`;
}

export function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);
}

export function formatCompactTime(dateIso: string) {
  const date = new Date(dateIso);
  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;

  if (diffMs < hour) {
    return `${Math.max(1, Math.round(diffMs / minute))}M`;
  }

  if (diffMs < 12 * hour) {
    return `${Math.round(diffMs / hour)}H`;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function getCurrency(currencies: CurrencyOption[], code: string) {
  return (
    currencies.find((currency) => currency.code === code) ?? {
      code,
      name: fallbackCurrencyNames[code] ?? code,
      flagSrc: "",
    }
  );
}

export async function fetchPairRate(base: string, target: string) {
  if (base === target) return 1;

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${target}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch pair rate");
  }

  const data: unknown = await response.json();
  const rate = parseRateList(data, target)[0]?.rate;

  if (typeof rate !== "number" || !Number.isFinite(rate)) {
    throw new Error("Invalid pair rate");
  }

  return rate;
}

export async function fetchPairSnapshot(base: string, target: string) {
  if (base === target) {
    return { rate: 1, change24h: 0 };
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates?from=${formatDate(
      startDate,
    )}&to=${formatDate(endDate)}&base=${base}&quotes=${target}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch pair snapshot");
  }

  const data: unknown = await response.json();
  const rates = parseRateList(data, target).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const latest = rates.at(-1);
  const previous = rates.at(-2);

  if (!latest) {
    throw new Error("Invalid pair snapshot");
  }

  const change24h =
    previous && previous.rate !== 0
      ? ((latest.rate - previous.rate) / previous.rate) * 100
      : 0;

  return {
    rate: latest.rate,
    change24h,
  };
}

export async function fetchRates(base: string, targets: string[]) {
  const queryTargets = targets.filter((target) => target !== base);
  if (queryTargets.length === 0) return [];

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${queryTargets.join(
      ",",
    )}`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch comparison rates");
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected comparison response");
  }

  return data.reduce<{ quote: string; rate: number }[]>((rates, item) => {
    if (
      item &&
      typeof item === "object" &&
      "quote" in item &&
      "rate" in item
    ) {
      const quote = (item as { quote?: unknown }).quote;
      const rate = (item as { rate?: unknown }).rate;

      if (typeof quote === "string" && typeof rate === "number") {
        rates.push({ quote, rate });
      }
    }

    return rates;
  }, []);
}

function parseRateList(data: unknown, target: string) {
  if (!Array.isArray(data)) return [];

  return data.reduce<{ date: string; quote: string; rate: number }[]>(
    (rates, item) => {
      if (
        item &&
        typeof item === "object" &&
        "date" in item &&
        "quote" in item &&
        "rate" in item
      ) {
        const date = (item as { date?: unknown }).date;
        const quote = (item as { quote?: unknown }).quote;
        const rate = (item as { rate?: unknown }).rate;

        if (
          typeof date === "string" &&
          quote === target &&
          typeof rate === "number"
        ) {
          rates.push({ date, quote, rate });
        }
      }

      return rates;
    },
    [],
  );
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
