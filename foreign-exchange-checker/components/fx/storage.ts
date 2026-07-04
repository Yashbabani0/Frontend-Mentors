"use client";

import type { ConversionLogEntry, FavoritePair, FxTab } from "./types";

export const FAVORITES_STORAGE_KEY = "fx-checker:favorites";
export const CONVERSION_LOG_STORAGE_KEY = "fx-checker:conversion-log";
export const ACTIVE_TAB_STORAGE_KEY = "fx-checker:active-tab";

function readJsonArray<T>(key: string, validate: (value: unknown) => value is T) {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return [];

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(validate);
  } catch {
    return [];
  }
}

export function readFavorites() {
  return readJsonArray<FavoritePair>(FAVORITES_STORAGE_KEY, isFavoritePair);
}

export function readConversionLog() {
  return readJsonArray<ConversionLogEntry>(
    CONVERSION_LOG_STORAGE_KEY,
    isConversionLogEntry,
  );
}

export function writeFavorites(favorites: FavoritePair[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function writeConversionLog(log: ConversionLogEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONVERSION_LOG_STORAGE_KEY, JSON.stringify(log));
}

export function readActiveTab(): FxTab {
  if (typeof window === "undefined") return "history";

  const storedTab = window.localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
  return isFxTab(storedTab) ? storedTab : "history";
}

export function writeActiveTab(tab: FxTab) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tab);
}

function isFxTab(value: unknown): value is FxTab {
  return (
    value === "history" ||
    value === "compare" ||
    value === "favorites" ||
    value === "log"
  );
}

function isFavoritePair(value: unknown): value is FavoritePair {
  if (!value || typeof value !== "object") return false;

  const pair = value as Partial<FavoritePair>;
  return (
    typeof pair.id === "string" &&
    typeof pair.base === "string" &&
    typeof pair.target === "string" &&
    typeof pair.rate === "number" &&
    typeof pair.createdAt === "string"
  );
}

function isConversionLogEntry(value: unknown): value is ConversionLogEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<ConversionLogEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.base === "string" &&
    typeof entry.target === "string" &&
    typeof entry.sendAmount === "number" &&
    typeof entry.receiveAmount === "number" &&
    typeof entry.rate === "number" &&
    typeof entry.createdAt === "string"
  );
}
