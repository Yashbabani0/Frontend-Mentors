"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convex) {
    return (
      <div className="min-h-dvh bg-neutral-900 text-neutral-0">
        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold">Convex is not configured</h1>
          <p className="mt-4 text-neutral-400">
            Add <code>NEXT_PUBLIC_CONVEX_URL</code> to your environment to run
            the authenticated leaderboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
