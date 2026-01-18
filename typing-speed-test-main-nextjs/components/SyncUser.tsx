"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SyncUser() {
  const { user, isSignedIn } = useUser();
  const insertUser = useMutation(api.users.insertUser);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    insertUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName ?? undefined,
      image: user.imageUrl,
    });
  }, [isSignedIn, user, insertUser]);

  return null;
}
