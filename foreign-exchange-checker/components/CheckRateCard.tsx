"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "motion/react";
import swapIcon from "@/public/icon-exchange.svg";
import swapIconVertical from "@/public/icon-exchange-vertical.svg";
import starFilledIcon from "@/public/icon-star-filled.svg";
import starIcon from "@/public/icon-star.svg";
import CurrencyAmountBox from "./CurrencyAmountBox";
import CurrencyPicker, { type CurrencyOption } from "./CurrencyPicker";
import FxTabs from "./fx/FxTabs";
import {
  readConversionLog,
  readFavorites,
  writeConversionLog,
  writeFavorites,
} from "./fx/storage";
import type { ConversionLogEntry, FavoritePair } from "./fx/types";
import { getPairId } from "./fx/utils";

type CurrencyApiItem = {
  code?: string;
  iso_code?: string;
  name?: string;
};

type CurrencyApiEnvelope = {
  data?: unknown;
  currencies?: unknown;
};

type CurrencyApiResponse =
  | Record<string, string>
  | CurrencyApiItem[]
  | CurrencyApiEnvelope;

type LatestRateApiResponse = {
  amount?: number;
  base?: string;
  date?: string;
  rates?: Record<string, number>;
};

type RateApiItem = {
  quote?: unknown;
  rate?: unknown;
};

type CheckRateCardProps = {
  initialSendAmount?: string;
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
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
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const defaultCurrencies: CurrencyOption[] = [
  {
    code: "USD",
    name: "US Dollar",
    flagSrc: "/flags/us.webp",
  },
  {
    code: "EUR",
    name: "Euro",
    flagSrc: "/flags/eu.webp",
  },
  {
    code: "GBP",
    name: "British Pound",
    flagSrc: "/flags/gb.webp",
  },
  {
    code: "AED",
    name: "UAE Dirham",
    flagSrc: "/flags/ae.webp",
  },
  {
    code: "ARS",
    name: "Argentine Peso",
    flagSrc: "/flags/ar.webp",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    flagSrc: "/flags/au.webp",
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    flagSrc: "/flags/bd.webp",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    flagSrc: "/flags/ca.webp",
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    flagSrc: "/flags/ch.webp",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    flagSrc: "/flags/in.webp",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    flagSrc: "/flags/jp.webp",
  },
];

const currencyFlagMap: Record<string, string> = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  INR: "in",
  JPY: "jp",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",
  AED: "ae",
  ARS: "ar",
  BDT: "bd",
};

const localFlagCodes = new Set([
  "ae",
  "ar",
  "au",
  "bd",
  "bg",
  "bh",
  "br",
  "ca",
  "ch",
  "cl",
  "cn",
  "co",
  "cy",
  "cz",
  "dk",
  "eg",
  "eu",
  "gb",
  "hk",
  "hm",
  "hn",
  "hr",
  "ht",
  "hu",
  "id",
  "in",
  "is",
  "jo",
  "jp",
  "ke",
  "kr",
  "kw",
  "lb",
  "lc",
  "lk",
  "ma",
  "mx",
  "my",
  "ng",
  "no",
  "np",
  "nz",
  "om",
  "pe",
  "ph",
  "pk",
  "pl",
  "qa",
  "ro",
  "ru",
  "sa",
  "se",
  "sg",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "vn",
  "za",
]);

function getFlagSrc(currencyCode: string) {
  const flagCode = currencyFlagMap[currencyCode] ?? currencyCode.toLowerCase();
  return localFlagCodes.has(flagCode) ? `/flags/${flagCode}.webp` : "";
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function parseAmount(value: string) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return parsedValue;
}

function parseLatestRate(data: unknown, target: string) {
  if (Array.isArray(data)) {
    const rateItem = data.find((item): item is RateApiItem => {
      if (!item || typeof item !== "object") return false;

      const quote = (item as RateApiItem).quote;
      return quote === target;
    });

    const rate = rateItem?.rate;
    return typeof rate === "number" && Number.isFinite(rate) ? rate : null;
  }

  if (!data || typeof data !== "object") {
    return null;
  }

  const rates = (data as LatestRateApiResponse).rates;
  const rate = rates?.[target];

  return typeof rate === "number" && Number.isFinite(rate) ? rate : null;
}

function normalizeCurrencies(data: unknown): CurrencyOption[] {
  if (Array.isArray(data)) {
    return data.reduce<CurrencyOption[]>((options, item: CurrencyApiItem) => {
      const code = item.code ?? item.iso_code;

      if (code && item.name) {
        options.push({
          code,
          name: item.name,
          flagSrc: getFlagSrc(code),
        });
      }

      return options;
    }, []);
  }

  if (isCurrencyEnvelope(data)) {
    return normalizeCurrencies(data.data ?? data.currencies);
  }

  if (isCurrencyRecord(data)) {
    return Object.entries(data).map(([code, name]) => {
      return {
        code,
        name,
        flagSrc: getFlagSrc(code),
      };
    });
  }

  return defaultCurrencies;
}

function isCurrencyEnvelope(value: unknown): value is CurrencyApiEnvelope {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("data" in value || "currencies" in value)
  );
}

function isCurrencyRecord(value: unknown): value is Record<string, string> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === "string")
  );
}

function getCurrencyByCode(currencies: CurrencyOption[], code: string) {
  return (
    currencies.find((currency) => currency.code === code) ?? {
      code,
      name: code,
      flagSrc: getFlagSrc(code),
    }
  );
}

export default function CheckRateCard({
  initialSendAmount = "1",
}: CheckRateCardProps) {
  const [sendAmount, setSendAmount] = useState(initialSendAmount);
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("EUR");
  const [rate, setRate] = useState<number | null>(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [currencies, setCurrencies] =
    useState<CurrencyOption[]>(defaultCurrencies);
  const [activePicker, setActivePicker] = useState<"from" | "to" | null>(null);
  const [favorites, setFavorites] = useState<FavoritePair[]>([]);
  const [conversionLog, setConversionLog] = useState<ConversionLogEntry[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFavorites(readFavorites());
      setConversionLog(readConversionLog());
      setStorageReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (storageReady) {
      writeFavorites(favorites);
    }
  }, [favorites, storageReady]);

  useEffect(() => {
    if (storageReady) {
      writeConversionLog(conversionLog);
    }
  }, [conversionLog, storageReady]);

  useEffect(() => {
    let ignore = false;

    async function fetchCurrencies() {
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v2/currencies",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }

        const data = (await response.json()) as CurrencyApiResponse;
        const normalizedCurrencies = normalizeCurrencies(data);

        if (!ignore) {
          setCurrencies(
            normalizedCurrencies.length > 0
              ? normalizedCurrencies
              : defaultCurrencies,
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCurrencies();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchRate() {
      if (fromCode === toCode) {
        setRate(1);
        setRateLoading(false);
        return;
      }

      setRate(null);
      setRateLoading(true);

      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?base=${fromCode}&quotes=${toCode}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const data: unknown = await response.json();
        const nextRate = parseLatestRate(data, toCode);

        if (!ignore && nextRate !== null) {
          setRate(nextRate);
        }
      } catch {
        if (!ignore) {
          setRate(null);
        }
      } finally {
        if (!ignore) {
          setRateLoading(false);
        }
      }
    }

    fetchRate();

    return () => {
      ignore = true;
    };
  }, [fromCode, toCode]);

  const fromCurrency = useMemo(
    () => getCurrencyByCode(currencies, fromCode),
    [currencies, fromCode],
  );
  const toCurrency = useMemo(
    () => getCurrencyByCode(currencies, toCode),
    [currencies, toCode],
  );
  const sendAmountNumber = parseAmount(sendAmount);
  const receiveAmountNumber = rate === null ? 0 : sendAmountNumber * rate;

  const receiveAmount = useMemo(() => {
    if (rate === null) return "—";

    return formatAmount(receiveAmountNumber);
  }, [rate, receiveAmountNumber]);

  const exchangeRateText = rateLoading || rate === null
    ? `Updating ${fromCode}/${toCode} rate...`
    : `1 ${fromCode} = ${rate.toFixed(4)} ${toCode}`;
  const activePairId = getPairId(fromCode, toCode);
  const isFavorited = favorites.some(
    (favorite) => favorite.id === activePairId,
  );

  function handleSendAmountChange(value: string) {
    const cleanedValue = value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*)\./g, "$1");

    const [integerPart = "", decimalPart] = cleanedValue.split(".");

    const limitedInteger = integerPart.slice(0, 9);
    const limitedDecimal = decimalPart?.slice(0, 2);

    const nextValue =
      decimalPart !== undefined
        ? `${limitedInteger}.${limitedDecimal}`
        : limitedInteger;

    setSendAmount(nextValue);
  }

  function handleSwapCurrencies() {
    setFromCode(toCode);
    setToCode(fromCode);
    setActivePicker(null);
  }

  function handleSelectPair(base: string, target: string) {
    setFromCode(base);
    setToCode(target);
    setActivePicker(null);
  }

  function handleCurrencySelect(type: "from" | "to", currency: CurrencyOption) {
    if (type === "from") {
      setFromCode(currency.code);
    } else {
      setToCode(currency.code);
    }

    setActivePicker(null);
  }

  function handleToggleFavorite(
    base: string,
    target: string,
    pairRate: number | null,
  ) {
    if (pairRate === null) return;

    const pairId = getPairId(base, target);
    const isAlreadyFavorite = favorites.some((favorite) => favorite.id === pairId);

    setStatusMessage(
      isAlreadyFavorite
        ? `${base} to ${target} removed from favorites.`
        : `${base} to ${target} added to favorites.`,
    );

    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.id === pairId)) {
        return currentFavorites.filter((favorite) => favorite.id !== pairId);
      }

      return [
        {
          id: pairId,
          base,
          target,
          rate: pairRate,
          change24h: 0,
          createdAt: new Date().toISOString(),
        },
        ...currentFavorites,
      ];
    });
  }

  function handleLogConversion() {
    if (sendAmountNumber <= 0 || rate === null) return;

    setConversionLog((currentLog) => [
      {
        id: `${activePairId}-${Date.now()}`,
        base: fromCode,
        target: toCode,
        sendAmount: sendAmountNumber,
        receiveAmount: receiveAmountNumber,
        rate,
        createdAt: new Date().toISOString(),
      },
      ...currentLog,
    ]);
    setStatusMessage(
      `${formatAmount(sendAmountNumber)} ${fromCode} conversion logged.`,
    );
  }

  function handleDeleteLogEntry(id: string) {
    setConversionLog((currentLog) =>
      currentLog.filter((entry) => entry.id !== id),
    );
  }

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto my-8 flex max-w-7xl flex-col items-start justify-center px-6 md:px-16"
    >
      <p className="sr-only" aria-live="polite">
        {statusMessage}
      </p>
      <motion.h1
        variants={itemVariants}
        className="text-2xl font-semibold uppercase text-text"
      >
        Check the rate
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="mt-8 w-full overflow-visible rounded-2xl bg-surface"
      >
        <motion.div className="flex w-full min-w-0 flex-col items-center justify-center gap-6 p-4 md:flex-row">
          <CurrencyAmountBox
            label="SEND"
            amount={sendAmount}
            currencyCode={fromCode}
            flagSrc={fromCurrency.flagSrc}
            isInput
            pickerOpen={activePicker === "from"}
            variants={itemVariants}
            onAmountChange={handleSendAmountChange}
            onCurrencyClick={() =>
              setActivePicker((current) => (current === "from" ? null : "from"))
            }
            picker={
              <CurrencyPicker
                open={activePicker === "from"}
                selectedCurrency={fromCode}
                currencies={currencies}
                onSelect={(currency) => handleCurrencySelect("from", currency)}
                onClose={() => setActivePicker(null)}
              />
            }
          />

          <motion.button
            type="button"
            variants={itemVariants}
            whileHover={{ scale: 1.08, rotate: 180 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.25 }}
            onClick={handleSwapCurrencies}
            className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-surface-raised bg-surface-light"
            aria-label="Swap currencies"
          >
            <picture>
              <source
                srcSet={swapIconVertical.src}
                media="(max-width: 768px)"
              />
              <Image src={swapIcon} width={20} height={20} alt="" />
            </picture>
          </motion.button>

          <CurrencyAmountBox
            label="RECEIVE"
            amount={receiveAmount}
            currencyCode={toCode}
            flagSrc={toCurrency.flagSrc}
            amountClassName="text-lime"
            pickerOpen={activePicker === "to"}
            variants={itemVariants}
            onCurrencyClick={() =>
              setActivePicker((current) => (current === "to" ? null : "to"))
            }
            picker={
              <CurrencyPicker
                open={activePicker === "to"}
                selectedCurrency={toCode}
                currencies={currencies}
                onSelect={(currency) => handleCurrencySelect("to", currency)}
                onClose={() => setActivePicker(null)}
              />
            }
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-2 flex flex-col gap-4 border-t border-dashed border-surface-raised p-4 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-text">{exchangeRateText}</p>

          <motion.div className="flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`flex cursor-pointer items-center border border-text-muted transition-all duration-200 ease-in-out justify-center gap-2 rounded-lg ${isFavorited ? "bg-lime text-surface" : "bg-surface-raised/50 text-text-muted"} px-3 py-2 font-semibold uppercase`}
              onClick={() => handleToggleFavorite(fromCode, toCode, rate)}
              aria-pressed={isFavorited}
              disabled={rate === null}
            >
              <Image
                src={isFavorited ? starFilledIcon : starIcon}
                width={20}
                height={20}
                alt=""
              />
              {isFavorited ? "Favorited" : "Favorite"}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogConversion}
              disabled={rate === null || sendAmountNumber <= 0}
              className="flex cursor-pointer items-center transition-all duration-300 ease-in-out justify-center gap-2 rounded-lg border border-surface-raised hover:border-lime bg-surface px-3 py-2 font-semibold uppercase text-text hover:bg-lime/10
              "
            >
              Log Conversion
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <FxTabs
        base={fromCode}
        target={toCode}
        sendAmount={sendAmount}
        sendAmountNumber={sendAmountNumber}
        rate={rate ?? 0}
        receiveAmountNumber={receiveAmountNumber}
        currencies={currencies}
        favorites={favorites}
        conversionLog={conversionLog}
        onSelectPair={handleSelectPair}
        onToggleFavorite={handleToggleFavorite}
        onDeleteLogEntry={handleDeleteLogEntry}
        onClearLog={() => setConversionLog([])}
      />
    </motion.section>
  );
}
