"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import FavoriteButton from "./FavoriteButton";
import EmptyState from "./EmptyState";
import type { FavoritePair } from "./types";
import { fetchPairSnapshot, formatNumber } from "./utils";

type FavoritesTabProps = {
  favorites: FavoritePair[];
  onSelectPair: (base: string, target: string) => void;
  onToggleFavorite: (base: string, target: string, rate: number) => void;
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FavoritesTab({
  favorites,
  onSelectPair,
  onToggleFavorite,
}: FavoritesTabProps) {
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});
  const [liveChanges, setLiveChanges] = useState<Record<string, number>>({});

  useEffect(() => {
    let ignore = false;

    async function loadFavoriteRates() {
      const nextRates: Record<string, number> = {};
      const nextChanges: Record<string, number> = {};

      await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const snapshot = await fetchPairSnapshot(
              favorite.base,
              favorite.target,
            );
            nextRates[favorite.id] = snapshot.rate;
            nextChanges[favorite.id] = snapshot.change24h;
          } catch {
            nextRates[favorite.id] = favorite.rate;
            nextChanges[favorite.id] = favorite.change24h ?? 0;
          }
        }),
      );

      if (!ignore) {
        setLiveRates(nextRates);
        setLiveChanges(nextChanges);
      }
    }

    loadFavoriteRates();

    return () => {
      ignore = true;
    };
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No pinned pairs yet"
        description="Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
      />
    );
  }

  return (
    <section className="mx-auto max-w-5xl rounded-xl bg-surface p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-text-muted">
        <p>Pinned pairs</p>
        <p>{favorites.length} favorites</p>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {favorites.map((favorite) => {
          const liveRate = liveRates[favorite.id] ?? favorite.rate;
          const change = liveChanges[favorite.id] ?? favorite.change24h ?? 0;

          return (
            <motion.div
              key={favorite.id}
              variants={rowVariants}
              whileHover={{ y: -1, borderColor: "#343434" }}
              className="flex items-center justify-between gap-4 rounded-lg border border-surface-raised bg-surface-light px-3 py-3"
            >
              <button
                type="button"
                onClick={() => onSelectPair(favorite.base, favorite.target)}
                className="min-w-0 flex-1 text-left font-semibold text-text focus:outline-none focus:ring-2 focus:ring-lime/60"
              >
                {favorite.base} <span className="text-text-muted">→</span>{" "}
                {favorite.target}
              </button>

              <div className="flex shrink-0 items-center gap-3 text-right">
                <div>
                  <p className="text-text">{formatNumber(liveRate, 4)}</p>
                  <p
                    className={`text-[10px] ${
                      change >= 0 ? "text-green" : "text-red"
                    }`}
                  >
                    {change >= 0 ? "+" : ""}
                    {formatNumber(change, 2)}%
                  </p>
                </div>
                <FavoriteButton
                  active
                  label={`Unpin ${favorite.base} to ${favorite.target}`}
                  onClick={() =>
                    onToggleFavorite(favorite.base, favorite.target, liveRate)
                  }
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
