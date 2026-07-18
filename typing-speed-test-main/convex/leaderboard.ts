import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import {
  difficultyValidator,
  modeValidator,
  validateDisplayName,
  validateScore,
} from "./values";

const scoreArgs = {
  difficulty: difficultyValidator,
  mode: modeValidator,
  wpm: v.number(),
  accuracy: v.number(),
  correctCount: v.number(),
  incorrectCount: v.number(),
  elapsedSeconds: v.number(),
  passageId: v.string(),
};

export const getCurrentProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

export const upsertDisplayName = mutation({
  args: {
    displayName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated.");
    }

    const displayName = validateDisplayName(args.displayName);
    const now = Date.now();
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (profile) {
      await ctx.db.patch(profile._id, {
        displayName,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("profiles", {
        userId: identity.subject,
        displayName,
        createdAt: now,
        updatedAt: now,
      });
    }

    const entries = await ctx.db
      .query("leaderboardEntries")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    await Promise.all(
      entries.map((entry) =>
        ctx.db.patch(entry._id, {
          displayName,
          updatedAt: now,
        }),
      ),
    );

    return { displayName };
  },
});

export const submitScore = mutation({
  args: scoreArgs,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated.");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (!profile) {
      throw new Error("Create a leaderboard display name before submitting.");
    }

    const displayName = validateDisplayName(profile.displayName);
    const passageId = validateScore(args);
    const now = Date.now();
    const existing = await ctx.db
      .query("leaderboardEntries")
      .withIndex("by_user_and_board", (q) =>
        q
          .eq("userId", identity.subject)
          .eq("difficulty", args.difficulty)
          .eq("mode", args.mode),
      )
      .unique();

    if (!existing) {
      await ctx.db.insert("leaderboardEntries", {
        userId: identity.subject,
        displayName,
        difficulty: args.difficulty,
        mode: args.mode,
        wpm: args.wpm,
        accuracy: args.accuracy,
        correctCount: args.correctCount,
        incorrectCount: args.incorrectCount,
        elapsedSeconds: args.elapsedSeconds,
        passageId,
        submittedAt: now,
        updatedAt: now,
      });

      return { status: "created" as const };
    }

    if (!isBetterScore(args, existing)) {
      return { status: "unchanged" as const };
    }

    await ctx.db.patch(existing._id, {
      displayName,
      wpm: args.wpm,
      accuracy: args.accuracy,
      correctCount: args.correctCount,
      incorrectCount: args.incorrectCount,
      elapsedSeconds: args.elapsedSeconds,
      passageId,
      submittedAt: now,
      updatedAt: now,
    });

    return { status: "updated" as const };
  },
});

export const getLeaderboard = query({
  args: {
    difficulty: difficultyValidator,
    mode: modeValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const entries = await ctx.db
      .query("leaderboardEntries")
      .withIndex("by_board", (q) =>
        q.eq("difficulty", args.difficulty).eq("mode", args.mode),
      )
      .take(500);

    const sortedEntries = sortEntries(entries);
    const topEntries = sortedEntries.slice(0, 50);
    const userEntry = identity
      ? sortedEntries.find((entry) => entry.userId === identity.subject) ?? null
      : null;
    const userInTop = userEntry
      ? topEntries.some((entry) => entry._id === userEntry._id)
      : false;

    return {
      entries: topEntries.map((entry, index) => toLeaderboardRow(entry, index + 1)),
      userEntry:
        userEntry && !userInTop
          ? toLeaderboardRow(
              userEntry,
              sortedEntries.findIndex((entry) => entry._id === userEntry._id) + 1,
            )
          : null,
      userInTop,
      currentUserId: identity?.subject ?? null,
    };
  },
});

function sortEntries(entries: Doc<"leaderboardEntries">[]) {
  return [...entries].sort((a, b) => {
    if (b.wpm !== a.wpm) {
      return b.wpm - a.wpm;
    }

    if (b.accuracy !== a.accuracy) {
      return b.accuracy - a.accuracy;
    }

    if (a.elapsedSeconds !== b.elapsedSeconds) {
      return a.elapsedSeconds - b.elapsedSeconds;
    }

    return a.submittedAt - b.submittedAt;
  });
}

function isBetterScore(
  score: {
    wpm: number;
    accuracy: number;
    elapsedSeconds: number;
  },
  current: Doc<"leaderboardEntries">,
) {
  return (
    score.wpm > current.wpm ||
    (score.wpm === current.wpm && score.accuracy > current.accuracy) ||
    (score.wpm === current.wpm &&
      score.accuracy === current.accuracy &&
      score.elapsedSeconds < current.elapsedSeconds)
  );
}

function toLeaderboardRow(entry: Doc<"leaderboardEntries">, rank: number) {
  return {
    id: entry._id,
    rank,
    userId: entry.userId,
    displayName: entry.displayName,
    difficulty: entry.difficulty,
    mode: entry.mode,
    wpm: entry.wpm,
    accuracy: entry.accuracy,
    correctCount: entry.correctCount,
    incorrectCount: entry.incorrectCount,
    elapsedSeconds: entry.elapsedSeconds,
    passageId: entry.passageId,
    submittedAt: entry.submittedAt,
  };
}
