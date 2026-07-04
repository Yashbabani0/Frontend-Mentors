"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type CurrencyFlagProps = {
  code: string;
  src: StaticImageData | string;
  size?: number;
  className?: string;
};

export default function CurrencyFlag({
  code,
  src,
  size = 20,
  className = "",
}: CurrencyFlagProps) {
  const [failedSrc, setFailedSrc] = useState<StaticImageData | string | null>(
    null,
  );

  if (!src || failedSrc === src) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-surface-raised text-[9px] font-semibold text-text ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {code.slice(0, 2)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={`${code} flag`}
      className={`shrink-0 rounded-full ${className}`}
      onError={() => setFailedSrc(src)}
    />
  );
}
