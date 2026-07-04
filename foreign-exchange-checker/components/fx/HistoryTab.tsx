"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

type HistoryTooltipProps = {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string | number;
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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-surface-raised bg-surface p-4"
      >
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
      </motion.div>
    </section>
  );
}

function HistoryChart({ points }: { points: HistoryPoint[] }) {
  const rates = points.map((point) => point.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const yPadding = (maxRate - minRate || maxRate || 1) * 0.08;
  const domainMin = minRate - yPadding;
  const domainMax = maxRate + yPadding;

  return (
    <div className="h-[22rem] w-full" role="img" aria-label="Rate history chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={points}
          margin={{ top: 14, right: 8, bottom: 10, left: 0 }}
        >
          <defs>
            <linearGradient id="history-chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#cef739" stopOpacity={0.52} />
              <stop offset="72%" stopColor="#cef739" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#cef739" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#2e2e2e"
            strokeDasharray="2 8"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            minTickGap={54}
            tick={{ fill: "#9a9a9a", fontSize: 11 }}
            tickFormatter={formatChartDate}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={54}
            domain={[domainMin, domainMax]}
            tick={{ fill: "#9a9a9a", fontSize: 11 }}
            tickFormatter={(value) => formatNumber(Number(value), 4)}
          />
          <Tooltip content={<HistoryTooltip />} cursor={{ stroke: "#cef739" }} />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#cef739"
            strokeWidth={3}
            fill="url(#history-chart-fill)"
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#cef739",
              strokeWidth: 2,
              fill: "#171719",
            }}
            isAnimationActive
            animationDuration={650}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function HistoryTooltip({ active, payload, label }: HistoryTooltipProps) {
  if (!active || !payload?.length) return null;

  const rate = payload[0]?.value;

  return (
    <div className="rounded-lg border border-surface-raised bg-surface px-3 py-2 text-xs shadow-2xl">
      <p className="text-text-muted">{formatChartDate(String(label))}</p>
      <p className="mt-1 font-semibold text-lime">
        {typeof rate === "number" ? formatNumber(rate, 4) : "—"}
      </p>
    </div>
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

function formatChartDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(parsedDate);
}
