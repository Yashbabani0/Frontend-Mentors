"use client";

type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-14 text-center">
      <h2 className="text-base text-text md:text-lg">{title}</h2>
      <p className="mt-4 max-w-md text-xs leading-relaxed text-text-muted md:text-sm">
        {description}
      </p>
    </div>
  );
}
