"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import EmptyState from "./EmptyState";
import RangeSelector, { type HistoryRange } from "./RangeSelector";
import StatCard from "./StatCard";
import { formatNumber } from "./utils";

type HistoryPoint = {
  date: string;
  rate: number;
};

type HistoryTabProps = {
  base: string;
  target: string;
  rate: number;
};

const rangeDays: Record<HistoryRange, number> = {
  "1D": 2,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  "5Y": 365 * 5,
};

export default function HistoryTab({ base, target, rate }: HistoryTabProps) {
  const [range, setRange] = useState<HistoryRange>("1M");
  const [points, setPoints] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadHistory() {
      if (base === target) {
        setPoints([
          { date: new Date().toISOString().slice(0, 10), rate: 1 },
          { date: new Date().toISOString().slice(0, 10), rate: 1 },
        ]);
        setHasError(false);
        return;
      }

      setLoading(true);
      setHasError(false);

      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - rangeDays[range]);

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?from=${formatDate(
            startDate,
          )}&to=${formatDate(endDate)}&base=${base}&quotes=${target}`,
        );

        if (!response.ok) {
          if (!ignore) {
            setPoints([]);
            setHasError(true);
          }
          return;
        }

        const data: unknown = await response.json();
        const nextPoints = parseHistoryPoints(data, target);

        if (!ignore) {
          setPoints(nextPoints);
          setHasError(nextPoints.length < 2);
        }
      } catch {
        if (!ignore) {
          setPoints([]);
          setHasError(true);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadHistory();

    return () => {
      ignore = true;
    };
  }, [base, range, target]);

  const stats = useMemo(() => {
    const open = points[0]?.rate ?? rate;
    const last = points.at(-1)?.rate ?? rate;
    const change = last - open;
    const percentChange = open === 0 ? 0 : (change / open) * 100;

    return { open, last, change, percentChange };
  }, [points, rate]);

  if (hasError && !loading) {
    return (
      <div>
        <div className="mb-4 flex justify-end">
          <RangeSelector value={range} onChange={setRange} />
        </div>
        <EmptyState
          title="No chart data available"
          description={`We couldn't load rate history for ${base}/${target} right now. This usually clears up in a minute.`}
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 grid gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))_auto] md:items-end">
        <StatCard label="Open" value={formatNumber(stats.open, 4)} />
        <StatCard label="Last" value={formatNumber(stats.last, 4)} />
        <StatCard
          label="Change"
          value={`${stats.change >= 0 ? "+" : ""}${formatNumber(
            stats.change,
            4,
          )}`}
          valueClassName={stats.change >= 0 ? "text-green" : "text-red"}
        />
        <StatCard
          label="% Change"
          value={`▲ ${stats.percentChange >= 0 ? "+" : ""}${formatNumber(
            stats.percentChange,
            2,
          )}%`}
          valueClassName={stats.percentChange >= 0 ? "text-green" : "text-red"}
        />
        <div className="md:justify-self-end">
          <RangeSelector value={range} onChange={setRange} />
        </div>
      </div>

      <div className="rounded-xl bg-surface p-4">
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-text">
          <p>
            {base}/{target}
          </p>
          <p className="text-[10px] text-text-muted">
            {formatNumber(stats.last, 4)}
          </p>
        </div>
        {loading ? (
          <div className="flex h-64 items-center justify-center text-sm text-text-muted">
            Loading chart data...
          </div>
        ) : (
          <HistoryChart points={points.length > 1 ? points : mockPoints(rate)} />
        )}
      </div>
    </section>
  );
}

function HistoryChart({ points }: { points: HistoryPoint[] }) {
  const width = 900;
  const height = 260;
  const padding = 18;
  const rates = points.map((point) => point.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const range = maxRate - minRate || 1;

  const coordinates = points.map((point, index) => {
    const x =
      padding +
      (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((point.rate - minRate) / range) * (height - padding * 2);

    return `${x},${y}`;
  });

  const line = coordinates.join(" ");
  const area = `${padding},${height - padding} ${line} ${width - padding},${
    height - padding
  }`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-64 w-full overflow-visible"
      role="img"
      aria-label="Rate history chart"
    >
      <defs>
        <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cef739" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#cef739" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1={padding}
        x2={width - padding}
        y1={padding}
        y2={padding}
        stroke="#2e2e2e"
        strokeDasharray="2 6"
      />
      <line
        x1={padding}
        x2={width - padding}
        y1={height / 2}
        y2={height / 2}
        stroke="#2e2e2e"
        strokeDasharray="2 6"
      />
      <line
        x1={padding}
        x2={width - padding}
        y1={height - padding}
        y2={height - padding}
        stroke="#2e2e2e"
        strokeDasharray="2 6"
      />
      <motion.polygon
        key={`area-${line}`}
        points={area}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
      <motion.polyline
        key={`line-${line}`}
        points={line}
        fill="none"
        stroke="#cef739"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function parseHistoryPoints(data: unknown, target: string): HistoryPoint[] {
  if (Array.isArray(data)) {
    return data.reduce<HistoryPoint[]>((points, item) => {
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
          points.push({ date, rate });
        }
      }

      return points;
    }, []);
  }

  if (!data || typeof data !== "object" || !("rates" in data)) {
    return [];
  }

  const rates = (data as { rates?: unknown }).rates;
  if (!rates || typeof rates !== "object" || Array.isArray(rates)) {
    return [];
  }

  return Object.entries(rates)
    .map(([date, values]) => {
      if (!values || typeof values !== "object" || !(target in values)) {
        return null;
      }

      const rate = (values as Record<string, unknown>)[target];
      return typeof rate === "number" ? { date, rate } : null;
    })
    .filter((point): point is HistoryPoint => point !== null);
}

function mockPoints(rate: number): HistoryPoint[] {
  return Array.from({ length: 24 }, (_, index) => {
    const wave = Math.sin(index * 0.7) * 0.01 + Math.cos(index * 0.23) * 0.006;
    return {
      date: String(index),
      rate: rate * (1 + wave),
    };
  });
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
