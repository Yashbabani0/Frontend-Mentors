"use client";

import Image from "next/image";
import starFilledIcon from "@/public/icon-star-filled.svg";
import starIcon from "@/public/icon-star.svg";

type FavoriteButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

export default function FavoriteButton({
  active,
  label,
  onClick,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-lime/60 ${
        active
          ? "border-lime bg-lime/10"
          : "border-surface-raised bg-surface hover:border-lime"
      }`}
      aria-label={label}
      aria-pressed={active}
    >
      <Image
        src={active ? starFilledIcon : starIcon}
        width={14}
        height={14}
        alt=""
      />
    </button>
  );
}
