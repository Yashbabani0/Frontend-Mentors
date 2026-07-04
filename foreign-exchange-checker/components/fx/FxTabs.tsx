"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import CompareTab from "./CompareTab";
import ConversionLogTab from "./ConversionLogTab";
import FavoritesTab from "./FavoritesTab";
import HistoryTab from "./HistoryTab";
import type { FxTab, FxTabsProps } from "./types";
import { readActiveTab, writeActiveTab } from "./storage";

const tabs: { id: FxTab; label: string }[] = [
  { id: "history", label: "History" },
  { id: "compare", label: "Compare" },
  { id: "favorites", label: "Favorites" },
  { id: "log", label: "Log" },
];

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(2px)",
    transition: {
      duration: 0.16,
    },
  },
};

export default function FxTabs(props: FxTabsProps) {
  const generatedId = useId();
  const [activeTab, setActiveTab] = useState<FxTab>("history");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveTab(readActiveTab());
      setHasMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function handleTabChange(tab: FxTab) {
    setActiveTab(tab);
    writeActiveTab(tab);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    const lastIndex = tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    }

    if (event.key === "ArrowLeft") {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    handleTabChange(tabs[nextIndex].id);
    document.getElementById(`${generatedId}-${tabs[nextIndex].id}-tab`)?.focus();
  }

  return (
    <section className="mt-8 w-full">
      <div
        className="flex gap-4 overflow-x-auto border-b border-surface-raised"
        role="tablist"
        aria-label="FX checker sections"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === "favorites"
              ? props.favorites.length
              : tab.id === "log"
                ? props.conversionLog.length
                : null;

          return (
            <motion.button
              key={tab.id}
              id={`${generatedId}-${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${generatedId}-${tab.id}-panel`}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex shrink-0 items-center gap-2 rounded-lg px-5 py-4 text-xs uppercase tracking-[0.22em] transition focus:outline-none focus:ring-2 focus:ring-lime/60 ${
                isActive ? "text-text" : "text-text hover:text-text"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="fx-active-tab-border"
                  className="absolute inset-0 rounded-lg border-2 border-lime"
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative z-10">{tab.label}</span>
              {count !== null ? (
                <motion.span
                  key={count}
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 rounded-full bg-lime/20 px-1.5 py-0.5 text-[9px] tracking-normal text-lime"
                >
                  {count}
                </motion.span>
              ) : null}
              {isActive ? (
                <motion.span
                  layoutId="fx-active-tab-underline"
                  className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-lime"
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        id={`${generatedId}-${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${generatedId}-${activeTab}-tab`}
        className="pt-5"
      >
        <AnimatePresence mode="wait">
          {hasMounted ? (
            <motion.div
              key={activeTab}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderActivePanel(activeTab, props)}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function renderActivePanel(activeTab: FxTab, props: FxTabsProps) {
  if (activeTab === "history") {
    return <HistoryTab base={props.base} target={props.target} rate={props.rate} />;
  }

  if (activeTab === "compare") {
    return (
      <CompareTab
        base={props.base}
        sendAmount={props.sendAmount}
        sendAmountNumber={props.sendAmountNumber}
        currencies={props.currencies}
        favorites={props.favorites}
        onToggleFavorite={props.onToggleFavorite}
      />
    );
  }

  if (activeTab === "favorites") {
    return (
      <FavoritesTab
        favorites={props.favorites}
        onSelectPair={props.onSelectPair}
        onToggleFavorite={props.onToggleFavorite}
      />
    );
  }

  return (
    <ConversionLogTab
      conversionLog={props.conversionLog}
      onDeleteLogEntry={props.onDeleteLogEntry}
      onClearLog={props.onClearLog}
    />
  );
}
