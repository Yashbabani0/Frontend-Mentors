"use client";

export type HistoryRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

const ranges: HistoryRange[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

type RangeSelectorProps = {
  value: HistoryRange;
  onChange: (range: HistoryRange) => void;
};

export default function RangeSelector({ value, onChange }: RangeSelectorProps) {
  return (
    <div className="flex rounded-lg bg-surface" aria-label="Chart range">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          className={`min-w-12 rounded-lg px-3 py-2 text-[10px] uppercase text-text-muted transition focus:outline-none focus:ring-2 focus:ring-lime/60 ${
            value === range ? "bg-surface-raised text-text" : "hover:text-text"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
