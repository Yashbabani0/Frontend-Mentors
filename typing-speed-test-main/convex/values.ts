import { v } from "convex/values";

export const difficulties = ["easy", "medium", "hard"] as const;
export const testModes = ["timed", "passage"] as const;

export const difficultyValidator = v.union(
  v.literal("easy"),
  v.literal("medium"),
  v.literal("hard"),
);

export const modeValidator = v.union(v.literal("timed"), v.literal("passage"));

export function validateDisplayName(displayName: string) {
  const trimmedName = displayName.trim();

  if (trimmedName.length < 1) {
    throw new Error("Display name is required.");
  }

  if (trimmedName.length > 24) {
    throw new Error("Display name must be 24 characters or fewer.");
  }

  if (/[\u0000-\u001f\u007f]/u.test(trimmedName)) {
    throw new Error("Display name cannot contain control characters.");
  }

  return trimmedName;
}

export function validateScore(args: {
  wpm: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  elapsedSeconds: number;
  passageId: string;
}) {
  assertFiniteInRange(args.wpm, 0, 400, "WPM");
  assertFiniteInRange(args.accuracy, 0, 100, "Accuracy");
  assertIntegerInRange(args.correctCount, 0, 20_000, "Correct count");
  assertIntegerInRange(args.incorrectCount, 0, 20_000, "Incorrect count");
  assertFiniteInRange(args.elapsedSeconds, Number.MIN_VALUE, 7_200, "Elapsed time");

  const passageId = args.passageId.trim();
  if (passageId.length < 1 || passageId.length > 80) {
    throw new Error("Passage ID must be between 1 and 80 characters.");
  }

  return passageId;
}

function assertFiniteInRange(
  value: number,
  min: number,
  max: number,
  label: string,
) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label} is outside the allowed range.`);
  }
}

function assertIntegerInRange(
  value: number,
  min: number,
  max: number,
  label: string,
) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${label} is outside the allowed range.`);
  }
}
