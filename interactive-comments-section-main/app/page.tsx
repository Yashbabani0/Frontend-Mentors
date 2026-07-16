"use client";

import { FormEvent, useEffect, useState } from "react";
import CommentCard, { Comment, Composer } from "@/components/CommentCard";

const STORAGE_KEY = "interactive-comments-v1";
const currentUser = {
  username: "juliusomo",
  image: "/avatars/image-juliusomo.webp",
};

function initialComments(): Comment[] {
  const now = Date.now();
  const make = (
    id: number,
    content: string,
    age: number,
    score: number,
    username: string,
    replyingTo?: string,
  ): Comment => ({
    id,
    content,
    createdAt: now - age,
    score,
    vote: 0,
    replyingTo,
    user: { username, image: `/avatars/image-${username}.webp` },
    replies: [],
  });
  const first = make(
    1,
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    30 * 86400000,
    12,
    "amyrobson",
  );
  const second = make(
    2,
    "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    14 * 86400000,
    5,
    "maxblagun",
  );
  second.replies = [
    make(
      3,
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      7 * 86400000,
      4,
      "ramsesmiron",
      "maxblagun",
    ),
    make(
      4,
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      2 * 86400000,
      2,
      "juliusomo",
      "ramsesmiron",
    ),
  ];
  return [first, second];
}

function updateTree(
  comments: Comment[],
  id: number,
  update: (comment: Comment) => Comment,
): Comment[] {
  return comments.map((comment) =>
    comment.id === id
      ? update(comment)
      : { ...comment, replies: updateTree(comment.replies, id, update) },
  );
}

function removeFromTree(comments: Comment[], id: number): Comment[] {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: removeFromTree(comment.replies, id),
    }));
}

export default function Home() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setComments(JSON.parse(saved));
      } catch {
        /* Ignore unavailable or invalid browser storage. */
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments, ready]);

  function vote(id: number, selectedVote: -1 | 1) {
    setComments((items) =>
      updateTree(items, id, (comment) => {
        if (comment.vote === selectedVote) {
          return comment;
        }

        if (selectedVote === -1 && comment.score === 0) {
          return comment;
        }

        return {
          ...comment,
          vote: selectedVote,
          score: selectedVote === 1 ? comment.score + 1 : comment.score - 1,
        };
      }),
    );
  }

  function addReply(parentId: number, content: string, replyingTo: string) {
    const reply: Comment = {
      id: Date.now(),
      content,
      createdAt: Date.now(),
      score: 0,
      vote: 0,
      replyingTo,
      user: currentUser,
      replies: [],
    };
    setComments((items) =>
      updateTree(items, parentId, (comment) => ({
        ...comment,
        replies: [...comment.replies, reply],
      })),
    );
  }

  function addComment(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setComments((items) => [
      ...items,
      {
        id: Date.now(),
        content: draft.trim(),
        createdAt: Date.now(),
        score: 0,
        vote: 0,
        user: currentUser,
        replies: [],
      },
    ]);
    setDraft("");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[778px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-16">
      <h1 className="sr-only">Interactive comments</h1>
      <section className="space-y-4 sm:space-y-5" aria-label="Comments">
        {[...comments]
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                currentUsername={currentUser.username}
                onVote={vote}
                onReply={addReply}
                onEdit={(id, content) =>
                  setComments((items) =>
                    updateTree(items, id, (item) => ({ ...item, content })),
                  )
                }
                onDelete={setDeleteId}
              />
            </div>
          ))}
      </section>
      <Composer value={draft} setValue={setDraft} onSubmit={addComment} />

      {deleteId !== null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteId(null);
          }}
        >
          <div className="w-full max-w-[400px] rounded-lg bg-white p-7 sm:p-8">
            <h2 id="delete-title" className="text-xl font-medium text-grey-800">
              Delete comment
            </h2>
            <p className="mt-4 leading-6 text-grey-500">
              Are you sure you want to delete this comment? This will remove the
              comment and can&apos;t be undone.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg bg-grey-500 px-3 py-3.5 font-medium text-white transition hover:opacity-70"
              >
                NO, CANCEL
              </button>
              <button
                onClick={() => {
                  setComments((items) => removeFromTree(items, deleteId));
                  setDeleteId(null);
                }}
                className="rounded-lg bg-pink-400 px-3 py-3.5 font-medium text-white transition hover:bg-pink-200"
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
