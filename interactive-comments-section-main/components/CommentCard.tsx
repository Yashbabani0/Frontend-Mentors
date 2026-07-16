"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export type Comment = {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  vote: -1 | 0 | 1;
  replyingTo?: string;
  user: { username: string; image: string };
  replies: Comment[];
};

type Props = {
  comment: Comment;
  currentUsername: string;
  nested?: boolean;
  threadId?: number;
  onVote: (id: number, vote: -1 | 1) => void;
  onReply: (parentId: number, content: string, replyingTo: string) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
};

function relativeTime(timestamp: number) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;
  const units: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [size, name] of units) {
    if (seconds >= size) {
      const amount = Math.floor(seconds / size);
      return `${amount} ${name}${amount === 1 ? "" : "s"} ago`;
    }
  }
  return "just now";
}

export default function CommentCard({
  comment,
  currentUsername,
  nested = false,
  threadId,
  onVote,
  onReply,
  onEdit,
  onDelete,
}: Props) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState(comment.content);
  const [time, setTime] = useState(() => relativeTime(comment.createdAt));
  const voteLocked = useRef(false);
  const own = comment.user.username === currentUsername;

  useEffect(() => {
    const refresh = () => setTime(relativeTime(comment.createdAt));
    refresh();
    const timer = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(timer);
  }, [comment.createdAt]);

  function submitReply(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    onReply(threadId ?? comment.id, text.trim(), comment.user.username);
    setText("");
    setReplying(false);
  }

  function submitEdit(event: FormEvent) {
    event.preventDefault();
    if (!editText.trim()) return;
    onEdit(comment.id, editText.trim());
    setEditing(false);
  }

  function handleVote(vote: -1 | 1) {
    if (voteLocked.current) return;
    voteLocked.current = true;
    onVote(comment.id, vote);
    window.setTimeout(() => {
      voteLocked.current = false;
    }, 350);
  }

  return (
    <>
      <article className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 rounded-lg bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,.02)] sm:grid-cols-[40px_1fr] sm:gap-x-6 sm:p-6">
        <div className="order-3 flex h-10 w-25 items-center justify-between rounded-xl bg-grey-50 px-3 sm:order-1 sm:h-25 sm:w-10 sm:flex-col sm:px-0 sm:py-3">
          <button
            className={`grid h-6 w-6 place-items-center transition hover:brightness-75 ${comment.vote === 1 ? "brightness-50" : ""}`}
            onClick={() => handleVote(1)}
            aria-label="Upvote comment"
            aria-pressed={comment.vote === 1}
          >
            <Image src="/icon-plus.svg" width={11} height={11} alt="" />
          </button>
          <span className="font-medium text-purple-600">{comment.score}</span>
          <button
            type="button"
            disabled={comment.score === 0}
            className={`grid h-6 w-6 place-items-center transition
    ${
      comment.score === 0
        ? "cursor-not-allowed opacity-40"
        : "hover:brightness-75"
    }
    ${comment.vote === -1 ? "brightness-50" : ""}
  `}
            onClick={() => handleVote(-1)}
            aria-label="Downvote comment"
            aria-pressed={comment.vote === -1}
          >
            <Image src="/icon-minus.svg" width={11} height={3} alt="" />
          </button>
        </div>

        <div className="contents sm:order-2 sm:block sm:min-w-0">
          <header className="order-1 col-span-2 flex min-w-0 items-center gap-4 sm:col-span-1">
            <Image
              className="shrink-0 rounded-full"
              src={comment.user.image}
              width={32}
              height={32}
              alt={`${comment.user.username}'s avatar`}
            />
            <strong className="truncate font-medium text-grey-800">
              {comment.user.username}
            </strong>
            {own && (
              <span className="rounded-sm bg-purple-600 px-1.5 py-0.5 text-[13px] font-medium leading-none text-white">
                you
              </span>
            )}
            <span className="whitespace-nowrap text-grey-500">{time}</span>
            <div className="ml-auto hidden items-center gap-5 sm:flex">
              {own ? (
                <OwnerActions
                  onDelete={() => onDelete(comment.id)}
                  onEdit={() => setEditing(true)}
                />
              ) : (
                <ReplyButton onClick={() => setReplying((value) => !value)} />
              )}
            </div>
          </header>

          {editing ? (
            <form
              onSubmit={submitEdit}
              className="order-2 col-span-2 mt-4 flex flex-col items-end gap-3"
            >
              <textarea
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-24 w-full resize-none rounded-lg border border-grey-100 px-5 py-3 leading-6 outline-none transition focus:border-purple-600"
                aria-label="Edit comment"
              />
              <button className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-200">
                UPDATE
              </button>
            </form>
          ) : (
            <p className="order-2 col-span-2 mt-3 leading-6 text-grey-500 sm:col-span-1">
              {comment.replyingTo && (
                <span className="font-medium text-purple-600">
                  @{comment.replyingTo}{" "}
                </span>
              )}
              {comment.content}
            </p>
          )}
        </div>

        <div className="order-3 col-start-2 ml-auto flex items-center gap-5 sm:hidden">
          {own ? (
            <OwnerActions
              onDelete={() => onDelete(comment.id)}
              onEdit={() => setEditing(true)}
            />
          ) : (
            <ReplyButton onClick={() => setReplying((value) => !value)} />
          )}
        </div>
      </article>

      {replying && (
        <Composer
          value={text}
          setValue={setText}
          onSubmit={submitReply}
          button="REPLY"
          autoFocus
        />
      )}

      {comment.replies.length > 0 && (
        <div
          className={`ml-0 border-l-2 border-grey-100 pl-4 sm:ml-11 sm:pl-11 ${nested ? "mt-4" : "mt-5"}`}
        >
          <div className="space-y-4 sm:space-y-6">
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                currentUsername={currentUsername}
                nested
                threadId={threadId ?? comment.id}
                onVote={onVote}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ReplyButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 font-medium text-purple-600 transition hover:text-purple-200"
    >
      <Image src="/icon-reply.svg" width={14} height={13} alt="" />
      Reply
    </button>
  );
}

function OwnerActions({
  onDelete,
  onEdit,
}: {
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <>
      <button
        onClick={onDelete}
        className="flex items-center gap-2 font-medium text-pink-400 transition hover:text-pink-200"
      >
        <Image src="/icon-delete.svg" width={12} height={14} alt="" />
        Delete
      </button>
      <button
        onClick={onEdit}
        className="flex items-center gap-2 font-medium text-purple-600 transition hover:text-purple-200"
      >
        <Image src="/icon-edit.svg" width={14} height={14} alt="" />
        Edit
      </button>
    </>
  );
}

export function Composer({
  value,
  setValue,
  onSubmit,
  button = "SEND",
  autoFocus = false,
}: {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  button?: string;
  autoFocus?: boolean;
}) {
  function submitWithEnter(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return;

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-2 grid grid-cols-[32px_1fr] gap-4 rounded-lg bg-white p-4 sm:grid-cols-[40px_1fr_auto] sm:items-start sm:p-6"
    >
      <Image
        className="order-2 rounded-full sm:order-1"
        src="/avatars/image-juliusomo.webp"
        width={40}
        height={40}
        alt="Your avatar"
      />
      <textarea
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={submitWithEnter}
        placeholder="Add a comment…"
        className="order-1 col-span-2 min-h-24 resize-none rounded-lg border border-grey-100 px-5 py-3 leading-6 outline-none transition placeholder:text-grey-500 focus:border-purple-600 sm:order-2 sm:col-span-1"
        aria-label="Comment text"
      />
      <button className="order-2 ml-auto rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-200 sm:order-3">
        {button}
      </button>
    </form>
  );
}
