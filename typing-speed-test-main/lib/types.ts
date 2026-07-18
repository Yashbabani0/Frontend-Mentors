export const difficulties = ["easy", "medium", "hard"] as const;
export const testModes = ["timed", "passage"] as const;

export type Difficulty = (typeof difficulties)[number];
export type TestMode = (typeof testModes)[number];

export type Passage = {
  id: string;
  text: string;
};

export type PassageData = Record<Difficulty, Passage[]>;

export type TestStatus = "idle" | "active" | "complete";

export type ResultKind = "first" | "new-best" | "normal";

export type TestResult = {
  difficulty: Difficulty;
  mode: TestMode;
  passageId: string;
  wpm: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  elapsedSeconds: number;
  resultKind: ResultKind;
};
