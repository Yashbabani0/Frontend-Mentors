"use client";

type StatCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export default function StatCard({
  label,
  value,
  valueClassName = "text-text",
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-surface px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>
      <p className={`mt-3 text-lg ${valueClassName}`}>{value}</p>
    </div>
  );
}
