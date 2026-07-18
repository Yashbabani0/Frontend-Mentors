import type { Difficulty, Passage, PassageData, TestMode } from "./types";

export const PERSONAL_BEST_KEY = "typing-speed-test:v1:personal-best-wpm";
export const TIMED_DURATION_SECONDS = 60;

export function formatMode(mode: TestMode) {
  return mode === "timed" ? "Timed (60s)" : "Passage";
}

export function formatDifficulty(difficulty: Difficulty) {
  return difficulty[0].toUpperCase() + difficulty.slice(1);
}

export function getRandomPassage(
  data: PassageData,
  difficulty: Difficulty,
  previousId?: string,
) {
  const passages = data[difficulty];
  const pool =
    passages.length > 1
      ? passages.filter((passage) => passage.id !== previousId)
      : passages;

  return pool[Math.floor(Math.random() * pool.length)] ?? passages[0];
}

export function calculateWpm(correctCount: number, elapsedSeconds: number) {
  if (correctCount <= 0 || elapsedSeconds <= 0) {
    return 0;
  }

  return Math.round(correctCount / 5 / (elapsedSeconds / 60));
}

export function calculateAccuracy(totalAttempts: number, totalMistakes: number) {
  if (totalAttempts <= 0) {
    return 100;
  }

  return Math.max(
    0,
    Math.round(((totalAttempts - totalMistakes) / totalAttempts) * 100),
  );
}

export function countCharacters(typedValue: string, passage: Passage) {
  return typedValue.split("").reduce(
    (counts, character, index) => {
      if (character === passage.text[index]) {
        counts.correctCount += 1;
      } else {
        counts.incorrectCount += 1;
      }

      return counts;
    },
    { correctCount: 0, incorrectCount: 0 },
  );
}

export function readPersonalBest() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(PERSONAL_BEST_KEY);
  if (!storedValue) {
    return null;
  }

  const parsedValue = Number.parseInt(storedValue, 10);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : null;
}
