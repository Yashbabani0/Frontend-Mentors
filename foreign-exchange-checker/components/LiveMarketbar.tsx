"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

type RateRecord = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type MarketItem = {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
};

const baseCurrency = "USD";

const marketSymbols = ["EUR", "INR", "JPY", "GBP", "AUD", "CAD", "CHF"];

function getDateNDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

function formatRate(rate: number) {
  if (rate >= 100) return rate.toFixed(2);
  if (rate >= 10) return rate.toFixed(3);
  return rate.toFixed(4);
}

async function getMarketRates(): Promise<MarketItem[]> {
  const from = getDateNDaysAgo(14);
  const to = getDateNDaysAgo(1);
  const quotes = marketSymbols.join(",");

  const url = `https://api.frankfurter.dev/v2/rates?from=${from}&to=${to}&base=${baseCurrency}&quotes=${quotes}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to fetch market rates: ${response.status} ${errorText}`,
    );
  }

  const data: RateRecord[] = await response.json();

  return marketSymbols
    .map((symbol) => {
      const records = data
        .filter((item) => item.quote === symbol)
        .sort((a, b) => a.date.localeCompare(b.date));

      const latest = records.at(-1);
      const previous = records.at(-2);

      if (!latest || !previous) {
        return null;
      }

      const change = latest.rate - previous.rate;
      const changePercent = (change / previous.rate) * 100;

      return {
        pair: `${baseCurrency}/${symbol}`,
        rate: latest.rate,
        change,
        changePercent,
      };
    })
    .filter((item): item is MarketItem => item !== null);
}

export default function LiveMarketBar() {
  const [markets, setMarkets] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchMarkets() {
      try {
        setLoading(true);

        const results = await getMarketRates();

        if (!ignore) {
          setMarkets(results);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setMarkets([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchMarkets();

    return () => {
      ignore = true;
    };
  }, []);

  const tickerItems = useMemo(() => {
    if (markets.length === 0) return [];
    return [...markets, ...markets];
  }, [markets]);

  return (
    <section className="flex h-12 overflow-hidden bg-surface text-xs uppercase tracking-[0.18em] text-text-muted">
      <div className="flex shrink-0 items-center bg-lime px-5 font-bold text-black">
        <span className="mr-2 size-1.5 rounded-full bg-black" />
        Live Markets
      </div>

      <div className="relative flex min-w-0 flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center px-5 text-text-muted">
            Loading market rates...
          </div>
        ) : markets.length === 0 ? (
          <div className="flex items-center px-5 text-red">
            Market rates unavailable
          </div>
        ) : (
          <motion.div
            className="flex min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {tickerItems.map((item, index) => {
              const isPositive = item.change >= 0;

              return (
                <div
                  key={`${item.pair}-${index}`}
                  className="flex items-center gap-3 border-l border-border/50 px-5"
                >
                  <span>{item.pair}</span>

                  <span className="font-semibold text-text">
                    {formatRate(item.rate)}
                  </span>

                  <span className={isPositive ? "text-green" : "text-red"}>
                    {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
