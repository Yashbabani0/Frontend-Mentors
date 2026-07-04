"use client";

import type { CurrencyOption } from "../CurrencyPicker";

export type FxTab = "history" | "compare" | "favorites" | "log";

export type FavoritePair = {
  id: string;
  base: string;
  target: string;
  rate: number;
  change24h?: number;
  createdAt: string;
};

export type ConversionLogEntry = {
  id: string;
  base: string;
  target: string;
  sendAmount: number;
  receiveAmount: number;
  rate: number;
  createdAt: string;
};

export type FxTabsProps = {
  base: string;
  target: string;
  sendAmount: string;
  sendAmountNumber: number;
  rate: number;
  receiveAmountNumber: number;
  currencies: CurrencyOption[];
  favorites: FavoritePair[];
  conversionLog: ConversionLogEntry[];
  onSelectPair: (base: string, target: string) => void;
  onToggleFavorite: (base: string, target: string, rate: number) => void;
  onDeleteLogEntry: (id: string) => void;
  onClearLog: () => void;
};
