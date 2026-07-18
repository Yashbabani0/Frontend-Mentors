import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { difficultyValidator, modeValidator } from "./values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    displayName: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
  leaderboardEntries: defineTable({
    userId: v.string(),
    displayName: v.string(),
    difficulty: difficultyValidator,
    mode: modeValidator,
    wpm: v.number(),
    accuracy: v.number(),
    correctCount: v.number(),
    incorrectCount: v.number(),
    elapsedSeconds: v.number(),
    passageId: v.string(),
    submittedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_board", ["difficulty", "mode"])
    .index("by_user_and_board", ["userId", "difficulty", "mode"]),
});
