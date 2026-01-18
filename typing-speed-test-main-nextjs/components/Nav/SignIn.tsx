"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AuthButton() {
  return (
    <div className="flex items-center gap-2">
      {/* When user is NOT signed in */}
      <SignedOut>
        <div className="text-Neutral-0 border-2 border-Neutral-400 rounded-md px-6 py-1 cursor-pointer hover:opacity-80">
          <SignInButton mode="modal" />
        </div>
      </SignedOut>

      {/* When user IS signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
