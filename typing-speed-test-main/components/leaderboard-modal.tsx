"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useConvexConnectionState, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Difficulty, TestMode } from "@/lib/types";
import { difficulties, testModes } from "@/lib/types";
import { formatDifficulty, formatMode } from "@/lib/typing-utils";

type Props = {
  isOpen: boolean;
  defaultDifficulty: Difficulty;
  defaultMode: TestMode;
  onClose: () => void;
};

type LeaderboardRow = {
  id: string;
  rank: number;
  userId: string;
  displayName: string;
  wpm: number;
  accuracy: number;
  elapsedSeconds: number;
  submittedAt: number;
};

export default function LeaderboardModal({
  isOpen,
  defaultDifficulty,
  defaultMode,
  onClose,
}: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  const [mode, setMode] = useState<TestMode>(defaultMode);
  const [showConnectionHelp, setShowConnectionHelp] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const connectionState = useConvexConnectionState();
  const leaderboard = useQuery(
    api.leaderboard.getLeaderboard,
    isOpen ? { difficulty, mode } : "skip",
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;
    const timeoutId = window.setTimeout(() => {
      setDifficulty(defaultDifficulty);
      setMode(defaultMode);
      setShowConnectionHelp(false);
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [defaultDifficulty, defaultMode, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || leaderboard !== undefined) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowConnectionHelp(true);
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, leaderboard]);

  const rows = leaderboard?.entries ?? [];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/80 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.section
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="leaderboard-title"
            className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-5 shadow-2xl sm:p-8"
          >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="leaderboard-title" className="text-3xl font-bold">
              Leaderboard
            </h2>
            <p className="mt-2 text-sm font-semibold text-neutral-400">
              Top scores by board
            </p>
          </div>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-500 px-3 py-2 text-sm font-bold text-neutral-0 transition hover:border-blue-400 hover:text-blue-400"
          >
            Close
          </motion.button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <SelectControl
            label="Leaderboard difficulty"
            value={difficulty}
            onChange={(value) => setDifficulty(value as Difficulty)}
            options={difficulties.map((item) => ({
              value: item,
              label: formatDifficulty(item),
            }))}
          />
          <SelectControl
            label="Leaderboard mode"
            value={mode}
            onChange={(value) => setMode(value as TestMode)}
            options={testModes.map((item) => ({
              value: item,
              label: formatMode(item),
            }))}
          />
        </div>

        <div className="mt-6" aria-live="polite">
          <AnimatePresence mode="wait">
            {leaderboard === undefined && showConnectionHelp ? (
              <StateMessage
                key="connection"
                title="Leaderboard is not connected."
                message={
                  connectionState.hasEverConnected
                    ? "Convex connected once, but this query is still waiting. Check that the leaderboard functions are deployed to the Convex project in NEXT_PUBLIC_CONVEX_URL."
                    : "Set NEXT_PUBLIC_CONVEX_URL to your existing Convex deployment and run Convex dev/deploy for this project."
                }
              />
            ) : leaderboard === undefined ? (
              <StateMessage key="loading" title="Loading scores..." />
            ) : rows.length === 0 ? (
              <StateMessage
                key="empty"
                title="No scores yet."
                message="Be the first to post a result for this board."
              />
            ) : (
              <motion.div
                key={`${difficulty}-${mode}-rows`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <LeaderboardTable
                  rows={rows}
                  currentUserId={leaderboard.currentUserId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {leaderboard?.userEntry ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-5 rounded-lg border border-blue-600/60 bg-blue-600/10 p-4"
          >
            <p className="text-sm font-bold text-blue-400">
              Your best on this board is outside the visible top 50.
            </p>
            <div className="mt-3">
              <LeaderboardTable
                rows={[leaderboard.userEntry]}
                currentUserId={leaderboard.currentUserId}
                compact
              />
            </div>
          </motion.div>
          ) : null}
        </AnimatePresence>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LeaderboardTable({
  rows,
  currentUserId,
  compact = false,
}: {
  rows: LeaderboardRow[];
  currentUserId: string | null;
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-140 border-separate border-spacing-y-2 text-left">
        <thead className="text-sm text-neutral-400">
          <tr>
            <th scope="col" className="px-3 py-2">
              Rank
            </th>
            <th scope="col" className="px-3 py-2">
              Name
            </th>
            <th scope="col" className="px-3 py-2">
              WPM
            </th>
            <th scope="col" className="px-3 py-2">
              Accuracy
            </th>
            <th scope="col" className="px-3 py-2">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isCurrentUser = currentUserId === row.userId;

            return (
              <motion.tr
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: Math.min(index * 0.025, 0.22) }}
                key={row.id}
                className={
                  isCurrentUser
                    ? "bg-blue-600/15 outline-1 outline-blue-600"
                    : "bg-neutral-800/70"
                }
              >
                <td className="rounded-l-lg px-3 py-3 font-bold">
                  #{row.rank}
                </td>
                <td className="px-3 py-3 font-semibold">
                  {row.displayName}
                  {isCurrentUser ? (
                    <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-neutral-0">
                      You
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-3 font-bold text-green-500">
                  {row.wpm}
                </td>
                <td className="px-3 py-3 font-bold">{row.accuracy}%</td>
                <td className="rounded-r-lg px-3 py-3 text-neutral-400">
                  {compact
                    ? `${row.elapsedSeconds}s`
                    : formatSeconds(row.elapsedSeconds)}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-neutral-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-neutral-500 bg-neutral-900 px-4 text-base font-semibold text-neutral-0 outline-none transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function StateMessage({ title, message }: { title: string; message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="rounded-lg border border-neutral-800 p-8 text-center"
    >
      <p className="text-xl font-bold">{title}</p>
      {message ? <p className="mt-2 text-neutral-400">{message}</p> : null}
    </motion.div>
  );
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(Math.round(totalSeconds % 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
