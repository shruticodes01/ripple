"use client";
import { useAuth } from "@/store/authContext/useAuth";
import { ArrowUp, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useTheme } from "@/store/themeContext/useTheme";
import { CommentData } from "@/types/types";
import Link from "next/link";

export default function CommentsSection({ rippleId }: { rippleId: string }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<CommentData[]>([]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    const res = await fetch(`/api/ripples/${rippleId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentText }),
    });

    if (res.ok) {
      const newCommentText = await res.json();
      setComments((prevComment) => [newCommentText, ...prevComment]);
      setCommentText("");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/ripples/${rippleId}/comments`);
      const data = await res.json();

      setComments(data);
    };
    fetchComments();
  }, [rippleId]);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      {user ? (
        <form
          className="flex gap-2 items-end mx-auto"
          noValidate
          onSubmit={handleSubmit}
        >
          <textarea
            className={`border p-2 ${theme === "light" ? "border-blue" : "border-powdered-blue-100"}`}
            cols={30}
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.currentTarget.value)}
          />
          <Button className={`shrink-0`} type="submit">
            <ArrowUp />
          </Button>
        </form>
      ) : (
        <p>
          Please <Link href="/signin">sign in</Link> to comment
        </p>
      )}

      {user?.userId && comments.length === 0 ? (
        <p className="pr-4">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="w-full flex flex-col px-4">
          {comments.map((comment: CommentData) => {
            return (
              <li
                key={comment._id}
                className={`w-full flex justify-between items-center p-1.5 gap-4 border ${theme === "light" ? "bg-blue-200 border-blue" : "bg-navy-blue/40 border-powdered-blue-100"}`}
              >
                <p className="text-wrap">{comment.content}</p>
                <Heart />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
