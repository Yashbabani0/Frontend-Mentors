"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { api } from "@/convex/_generated/api";
import type { TestResult } from "@/lib/types";

type Props = {
  result: TestResult;
};

type SubmitStatus =
  | "idle"
  | "name-required"
  | "saving-profile"
  | "submitting"
  | "created"
  | "updated"
  | "unchanged"
  | "validation-error"
  | "auth-error"
  | "server-error";

const pendingResultKey = "typing-speed-test:v1:pending-global-result";

export default function ScoreSubmission({ result }: Props) {
  const { openSignIn } = useClerk();
  const { isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const { isLoading: isConvexAuthLoading } = useConvexAuth();
  const profile = useQuery(
    api.leaderboard.getCurrentProfile,
    isSignedIn ? {} : "skip",
  );
  const upsertDisplayName = useMutation(api.leaderboard.upsertDisplayName);
  const submitScore = useMutation(api.leaderboard.submitScore);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const inputId = useId();
  const errorId = useId();
  const isPending = status === "saving-profile" || status === "submitting";

  useEffect(() => {
    const savedResult = window.sessionStorage.getItem(pendingResultKey);
    if (savedResult && isSignedIn) {
      const timeoutId = window.setTimeout(() => {
        window.sessionStorage.removeItem(pendingResultKey);
        setMessage("You're signed in. Submit your saved result when ready.");
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [isSignedIn]);

  const handleSubmit = async () => {
    setMessage("");
    setNameError("");

    if (!isClerkLoaded) {
      return;
    }

    if (!isSignedIn) {
      window.sessionStorage.setItem(pendingResultKey, JSON.stringify(result));
      setStatus("auth-error");
      setMessage("Sign in to submit this completed result.");
      openSignIn();
      return;
    }

    if (isConvexAuthLoading || profile === undefined) {
      return;
    }

    if (!profile) {
      setStatus("name-required");
      return;
    }

    await submitCurrentScore();
  };

  const handleNameAndSubmit = async () => {
    const trimmedName = displayName.trim();
    const validationMessage = getDisplayNameError(trimmedName);

    if (validationMessage) {
      setStatus("validation-error");
      setNameError(validationMessage);
      return;
    }

    try {
      setStatus("saving-profile");
      await upsertDisplayName({ displayName: trimmedName });
      await submitCurrentScore();
    } catch (error) {
      setStatus("server-error");
      setMessage(getErrorMessage(error));
    }
  };

  const submitCurrentScore = async () => {
    try {
      setStatus("submitting");
      const response = await submitScore({
        difficulty: result.difficulty,
        mode: result.mode,
        wpm: result.wpm,
        accuracy: result.accuracy,
        correctCount: result.correctCount,
        incorrectCount: result.incorrectCount,
        elapsedSeconds: result.elapsedSeconds,
        passageId: result.passageId,
      });

      setStatus(response.status);
      setMessage(getSubmitMessage(response.status));
    } catch (error) {
      setStatus("server-error");
      setMessage(getErrorMessage(error));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-7 w-full max-w-md rounded-lg border border-neutral-800 p-4 text-left"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-bold text-neutral-0">
            Global leaderboard
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Submit this completed score when you want it ranked.
          </p>
        </div>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="min-h-11 rounded-lg bg-blue-600 px-4 font-semibold text-neutral-0 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 w-60 flex items-center justify-center text-[0.7em]"
        >
          {isPending
            ? "Working..."
            : !isClerkLoaded || isConvexAuthLoading
              ? "Checking..."
              : "Submit Score"}
        </motion.button>
      </div>

      <AnimatePresence>
        {status === "name-required" || status === "validation-error" ? (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            <label
              htmlFor={inputId}
              className="mb-2 block text-sm font-bold text-neutral-400"
            >
              Leaderboard display name
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={inputId}
                value={displayName}
                maxLength={24}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                  setNameError("");
                }}
                aria-invalid={nameError ? "true" : "false"}
                aria-describedby={nameError ? errorId : undefined}
                className="min-h-11 flex-1 rounded-lg border border-neutral-500 bg-neutral-900 px-4 text-neutral-0 outline-none transition"
              />
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleNameAndSubmit}
                disabled={isPending}
                className="min-h-11 rounded-lg bg-neutral-0 px-4 font-bold text-neutral-900 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save & Submit
              </motion.button>
            </div>
            <AnimatePresence>
              {nameError ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  id={errorId}
                  className="mt-2 text-sm font-semibold text-red-500"
                >
                  {nameError}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {message ? (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`mt-3 text-sm font-semibold ${
              status === "server-error" || status === "auth-error"
                ? "text-red-500"
                : "text-green-500"
            }`}
            aria-live="polite"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function getDisplayNameError(displayName: string) {
  if (displayName.length < 1) {
    return "Display name is required.";
  }

  if (displayName.length > 24) {
    return "Display name must be 24 characters or fewer.";
  }

  if (/[\u0000-\u001f\u007f]/u.test(displayName)) {
    return "Display name cannot contain control characters.";
  }

  return "";
}

function getSubmitMessage(status: "created" | "updated" | "unchanged") {
  if (status === "created") {
    return "Score added to the leaderboard.";
  }

  if (status === "updated") {
    return "Your leaderboard best was updated.";
  }

  return "This result did not beat your current leaderboard best.";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}
