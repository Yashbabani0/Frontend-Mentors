"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import completedIcon from "@/public/images/icon-completed.svg";
import downArrowIcon from "@/public/images/icon-down-arrow.svg";
import newPersonalBestIcon from "@/public/images/icon-new-pb.svg";
import personalBestIcon from "@/public/images/icon-personal-best.svg";
import restartIcon from "@/public/images/icon-restart.svg";
import logoLarge from "@/public/images/logo-large.svg";
import logoSmall from "@/public/images/logo-small.svg";
import LeaderboardModal from "@/components/leaderboard-modal";
import ScoreSubmission from "@/components/score-submission";
import type {
  Difficulty,
  Passage,
  PassageData,
  ResultKind,
  TestMode,
  TestResult,
  TestStatus,
} from "@/lib/types";
import { difficulties, testModes } from "@/lib/types";
import {
  calculateAccuracy,
  calculateWpm,
  countCharacters,
  formatDifficulty,
  formatMode,
  getRandomPassage,
  PERSONAL_BEST_KEY,
  readPersonalBest,
  TIMED_DURATION_SECONDS,
} from "@/lib/typing-utils";

type Props = {
  passageData: PassageData;
};

export default function TypingSpeedTest({ passageData }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [mode, setMode] = useState<TestMode>("timed");
  const [passage, setPassage] = useState<Passage>(() =>
    getRandomPassage(passageData, "hard"),
  );
  const [typedValue, setTypedValue] = useState("");
  const [status, setStatus] = useState<TestStatus>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { correctCount } = useMemo(
    () => countCharacters(typedValue, passage),
    [typedValue, passage],
  );
  const displaySeconds =
    mode === "timed"
      ? Math.max(TIMED_DURATION_SECONDS - elapsedSeconds, 0)
      : elapsedSeconds;
  const wpm = calculateWpm(correctCount, Math.max(elapsedSeconds, 1));
  const accuracy = calculateAccuracy(totalAttempts, totalMistakes);
  const isComplete = status === "complete";

  const resetTest = useCallback(
    (nextDifficulty = difficulty) => {
      setPassage((currentPassage) =>
        getRandomPassage(passageData, nextDifficulty, currentPassage.id),
      );
      setTypedValue("");
      setStatus("idle");
      setElapsedSeconds(0);
      setTotalAttempts(0);
      setTotalMistakes(0);
      setResult(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [difficulty, passageData],
  );

  const finishTest = useCallback(() => {
    setStatus((currentStatus) => {
      if (currentStatus === "complete") {
        return currentStatus;
      }

      const finalElapsed = Math.max(elapsedSeconds, 1);
      const finalWpm = calculateWpm(correctCount, finalElapsed);
      const finalAccuracy = calculateAccuracy(totalAttempts, totalMistakes);
      const resultKind: ResultKind =
        personalBest === null
          ? "first"
          : finalWpm > personalBest
            ? "new-best"
            : "normal";

      if (resultKind !== "normal") {
        window.localStorage.setItem(PERSONAL_BEST_KEY, String(finalWpm));
        setPersonalBest(finalWpm);
      }

      setResult({
        difficulty,
        mode,
        passageId: passage.id,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        correctCount,
        incorrectCount: totalMistakes,
        elapsedSeconds: finalElapsed,
        resultKind,
      });

      return "complete";
    });
  }, [
    correctCount,
    difficulty,
    elapsedSeconds,
    mode,
    passage.id,
    personalBest,
    totalAttempts,
    totalMistakes,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPersonalBest(readPersonalBest());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (status !== "active") {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [status]);

  useEffect(() => {
    if (
      status === "active" &&
      (typedValue.length >= passage.text.length ||
        (mode === "timed" && elapsedSeconds >= TIMED_DURATION_SECONDS))
    ) {
      const timeoutId = window.setTimeout(finishTest, 0);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [
    elapsedSeconds,
    finishTest,
    mode,
    passage.text.length,
    status,
    typedValue.length,
  ]);

  const startTest = () => {
    if (status === "complete") {
      resetTest();
    }

    setStatus("active");
    inputRef.current?.focus();
  };

  const handleDifficultyChange = (nextDifficulty: Difficulty) => {
    setDifficulty(nextDifficulty);
    resetTest(nextDifficulty);
  };

  const handleModeChange = (nextMode: TestMode) => {
    setMode(nextMode);
    resetTest();
  };

  const handleInputChange = (value: string) => {
    if (status === "complete") {
      return;
    }

    const nextValue = value.slice(0, passage.text.length);
    const wasAddition = nextValue.length > typedValue.length;

    if (wasAddition) {
      const addedCharacters = nextValue.slice(typedValue.length);
      let mistakes = 0;

      addedCharacters.split("").forEach((character, offset) => {
        if (character !== passage.text[typedValue.length + offset]) {
          mistakes += 1;
        }
      });

      setTotalAttempts((current) => current + addedCharacters.length);
      setTotalMistakes((current) => current + mistakes);
    }

    if (status === "idle" && nextValue.length > 0) {
      setStatus("active");
    }

    setTypedValue(nextValue);
  };

  return (
    <main className="min-h-dvh overflow-hidden bg-neutral-900 px-4 py-5 text-neutral-0 sm:px-8 lg:px-28 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-304 flex-col">
        <Header
          personalBest={personalBest}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />

        <section className="mt-9 border-b border-neutral-800 pb-4 lg:mt-16">
          <StatsBar
            wpm={wpm}
            accuracy={accuracy}
            time={displaySeconds}
            mode={mode}
          />
          {!isComplete ? (
            <Controls
              difficulty={difficulty}
              mode={mode}
              onDifficultyChange={handleDifficultyChange}
              onModeChange={handleModeChange}
            />
          ) : null}
        </section>

        <AnimatePresence mode="wait">
          {isComplete && result ? (
            <ResultsScreen
              key="results"
              result={result}
              personalBest={personalBest}
              onRestart={() => resetTest()}
            />
          ) : (
            <motion.section
              key="test"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-1 flex-col"
            >
              <TypingPassage
                passage={passage}
                typedValue={typedValue}
                status={status}
                inputRef={inputRef}
                onChange={handleInputChange}
                onFocusRequest={() => inputRef.current?.focus()}
              />

              {status === "idle" ? <StartOverlay onStart={startTest} /> : null}

              <div className="mt-auto flex justify-center border-t border-neutral-800 py-6 lg:py-8">
                <ActionButton variant="dark" onClick={() => resetTest()}>
                  Restart Test
                  <Image src={restartIcon} width={20} height={20} alt="" />
                </ActionButton>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        <LeaderboardModal
          isOpen={isLeaderboardOpen}
          defaultDifficulty={difficulty}
          defaultMode={mode}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      </div>
    </main>
  );
}

function Header({
  personalBest,
  onOpenLeaderboard,
}: {
  personalBest: number | null;
  onOpenLeaderboard: () => void;
}) {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <Image
          src={logoLarge}
          width={293}
          height={62}
          alt="Typing Speed Test"
          priority
          className="hidden h-auto w-73.25 sm:block"
        />
        <Image
          src={logoSmall}
          width={34}
          height={34}
          alt="Typing Speed Test"
          priority
          className="h-8.5 w-8.5 sm:hidden"
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 pt-1 text-sm font-semibold text-neutral-400 sm:text-xl">
        <div className="flex items-center gap-2">
          <Image
            src={personalBestIcon}
            width={24}
            height={24}
            alt=""
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
          <span>
            {personalBest === null
              ? "No best yet"
              : `Best: ${personalBest} WPM`}
          </span>
        </div>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onOpenLeaderboard}
          className="rounded-lg border border-neutral-500 px-3 py-3 text-base! font-semibold leading-none text-neutral-0 transition hover:border-blue-400 hover:text-blue-400"
        >
          Leaderboard
        </motion.button>
        {isLoaded && !isSignedIn ? (
          <SignInButton mode="modal">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="rounded-lg bg-neutral-0 px-6 py-[0.5em] font-medium! text-[0.8em]! leading-none text-neutral-900 transition hover:bg-yellow-400"
            >
              Sign in
            </motion.button>
          </SignInButton>
        ) : null}
        {isLoaded && isSignedIn ? <UserButton /> : null}
      </div>
    </header>
  );
}

function StatsBar({
  wpm,
  accuracy,
  time,
  mode,
}: {
  wpm: number;
  accuracy: number;
  time: number;
  mode: TestMode;
}) {
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");
  const values = [
    { label: "WPM:", value: wpm, tone: "text-neutral-0" },
    {
      label: "Accuracy:",
      value: `${accuracy}%`,
      tone: accuracy < 98 ? "text-red-500" : "text-neutral-0",
    },
    {
      label: "Time:",
      value: mode === "timed" ? `${minutes}:${seconds}` : `${time}s`,
      tone: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 text-center lg:flex lg:text-left">
      {values.map((stat, index) => (
        <div
          key={stat.label}
          className="border-r border-neutral-800 px-4 first:pl-0 lg:px-6"
          aria-live="polite"
        >
          <span className="block text-base text-neutral-400 sm:inline sm:text-xl">
            {stat.label}
          </span>
          <motion.strong
            key={String(stat.value)}
            initial={{ opacity: 0.5, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-1 block text-2xl font-bold sm:ml-3 sm:inline sm:text-2xl ${stat.tone}`}
          >
            {stat.value}
          </motion.strong>
          {index === values.length - 1 ? null : null}
        </div>
      ))}
    </div>
  );
}

function Controls({
  difficulty,
  mode,
  onDifficultyChange,
  onModeChange,
}: {
  difficulty: Difficulty;
  mode: TestMode;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onModeChange: (mode: TestMode) => void;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 lg:mt-[-2.65rem] lg:flex lg:justify-end lg:gap-4">
      <fieldset className="hidden items-center gap-2 lg:flex">
        <legend className="mr-2 text-neutral-400">Difficulty:</legend>
        {difficulties.map((item) => (
          <OptionButton
            key={item}
            selected={difficulty === item}
            onClick={() => onDifficultyChange(item)}
          >
            {formatDifficulty(item)}
          </OptionButton>
        ))}
      </fieldset>
      <fieldset className="hidden items-center gap-2 border-l border-neutral-800 pl-4 lg:flex">
        <legend className="mr-2 text-neutral-400">Mode:</legend>
        {testModes.map((item) => (
          <OptionButton
            key={item}
            selected={mode === item}
            onClick={() => onModeChange(item)}
          >
            {formatMode(item)}
          </OptionButton>
        ))}
      </fieldset>
      <SelectControl
        label="Difficulty"
        value={difficulty}
        onChange={(value) => onDifficultyChange(value as Difficulty)}
        options={difficulties.map((item) => ({
          value: item,
          label: formatDifficulty(item),
        }))}
      />
      <SelectControl
        label="Mode"
        value={mode}
        onChange={(value) => onModeChange(value as TestMode)}
        options={testModes.map((item) => ({
          value: item,
          label: formatMode(item),
        }))}
      />
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-base font-semibold transition ${
        selected
          ? "border-blue-600 text-blue-400 shadow-[0_0_0_1px_hsl(214_100%_55%/0.35)]"
          : "border-neutral-500 text-neutral-0 hover:border-blue-400 hover:text-blue-400"
      } `}
    >
      {children}
    </motion.button>
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
    <label className="relative lg:hidden">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full appearance-none rounded-lg border border-neutral-500 bg-neutral-900 px-4 text-center text-base font-semibold text-neutral-0 outline-none transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Image
        src={downArrowIcon}
        width={12}
        height={8}
        alt=""
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
      />
    </label>
  );
}

function TypingPassage({
  passage,
  typedValue,
  status,
  inputRef,
  onChange,
  onFocusRequest,
}: {
  passage: Passage;
  typedValue: string;
  status: TestStatus;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onFocusRequest: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onFocusRequest}
        className="typing-scrollbar mt-8 max-h-[55dvh] w-full overflow-y-auto text-left text-[2.45rem] font-normal leading-[1.45] tracking-normal text-neutral-400 outline-none sm:text-[3.25rem] lg:mt-9 lg:max-h-none lg:text-[2.6rem] xl:text-[3rem]"
        aria-label="Typing passage. Click to focus the input."
      >
        <span
          aria-hidden="true"
          className={status === "idle" ? "passage-starting block" : "block"}
        >
          {passage.text.split("").map((character, index) => {
            const typedCharacter = typedValue[index];
            const isCurrent = index === typedValue.length;
            const isCorrect =
              typedCharacter !== undefined && typedCharacter === character;
            const isIncorrect =
              typedCharacter !== undefined && typedCharacter !== character;

            return (
              <span
                key={`${passage.id}-${index}`}
                className={`relative ${
                  isCorrect ? "text-green-500" : ""
                } ${isIncorrect ? "text-red-500 underline decoration-red-500 decoration-4 underline-offset-8" : ""}`}
              >
                {isCurrent && status !== "idle" ? (
                  <span className="cursor-mark absolute left-0 top-1/2 h-[1.08em] w-[0.62em] -translate-y-1/2 rounded bg-neutral-400/35" />
                ) : null}
                {character}
              </span>
            );
          })}
        </span>
      </button>
      <textarea
        ref={inputRef}
        value={typedValue}
        onChange={(event) => onChange(event.target.value)}
        disabled={status === "complete"}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Type the displayed passage"
        className="sr-only"
      />
    </div>
  );
}

function StartOverlay({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pointer-events-none absolute inset-x-4 top-[43%] z-10 flex -translate-y-1/2 flex-col items-center gap-5"
    >
      <ActionButton onClick={onStart} className="pointer-events-auto">
        Start Typing Test
      </ActionButton>
      <p className="text-center text-lg font-semibold text-neutral-0">
        Or click the text and start typing
      </p>
    </motion.div>
  );
}

function ResultsScreen({
  result,
  personalBest,
  onRestart,
}: {
  result: TestResult;
  personalBest: number | null;
  onRestart: () => void;
}) {
  const copy = {
    first: {
      title: "Baseline Established!",
      message: "Your first score is saved. Now you have a target to chase.",
      icon: completedIcon,
      button: "Try Again",
    },
    "new-best": {
      title: "High Score Smashed!",
      message: "You're getting faster. That was incredible typing.",
      icon: newPersonalBestIcon,
      button: "Beat This Score",
    },
    normal: {
      title: "Test Complete!",
      message: "Great effort. Keep practicing to push that score higher.",
      icon: completedIcon,
      button: "Restart Test",
    },
  }[result.resultKind];

  return (
    <motion.section
      key="results"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="relative flex flex-1 flex-col items-center pt-16 text-center sm:pt-20"
    >
      {result.resultKind === "new-best" ? <Confetti /> : null}
      <Image src={copy.icon} width={56} height={56} alt="" className="mb-8" />
      <h1 className="text-4xl font-bold text-neutral-0 sm:text-5xl">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg font-semibold text-neutral-400">
        {copy.message}
      </p>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="mt-12 grid w-full max-w-130 gap-4 sm:grid-cols-3"
      >
        <ResultCard label="WPM:" value={result.wpm} />
        <ResultCard
          label="Accuracy:"
          value={`${result.accuracy}%`}
          tone={result.accuracy < 98 ? "text-red-500" : "text-green-500"}
        />
        <ResultCard
          label="Characters"
          value={
            <>
              <span className="text-green-500">{result.correctCount}</span>
              <span className="text-neutral-0">/</span>
              <span className="text-red-500">{result.incorrectCount}</span>
            </>
          }
        />
      </motion.div>
      <p className="mt-5 text-sm text-neutral-500">
        {personalBest === null ? "" : `Personal best: ${personalBest} WPM`}
      </p>
      <ScoreSubmission result={result} />
      <ActionButton variant="light" onClick={onRestart} className="mt-10">
        {copy.button}
        <Image src={restartIcon} width={20} height={20} alt="" />
      </ActionButton>
    </motion.section>
  );
}

function ResultCard({
  label,
  value,
  tone = "text-neutral-0",
}: {
  label: string;
  value: React.ReactNode;
  tone?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg border border-neutral-800 p-6 text-left"
    >
      <p className="text-xl text-neutral-400">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p>
    </motion.div>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "dark" | "light";
  className?: string;
}) {
  const variants = {
    primary: "bg-blue-600 text-neutral-0 hover:bg-blue-400",
    dark: "bg-neutral-800 text-neutral-0 hover:bg-neutral-500",
    light: "bg-neutral-0 text-neutral-900 hover:bg-yellow-400",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-6 text-xl font-bold! transition ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 90 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 18) * -0.17}s`,
    duration: `${3.2 + (index % 9) * 0.18}s`,
    drift: `${index % 2 === 0 ? "" : "-"}${24 + (index % 7) * 12}px`,
    spin: `${180 + (index % 10) * 36}deg`,
    color: ["bg-blue-600", "bg-green-500", "bg-red-500", "bg-yellow-400"][
      index % 4
    ],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece absolute top-1/2 h-3 w-1.5 ${piece.color}`}
          style={
            {
              left: piece.left,
              "--fall-delay": piece.delay,
              "--fall-duration": piece.duration,
              "--drift": piece.drift,
              "--spin": piece.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
