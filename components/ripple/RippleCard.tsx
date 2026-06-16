"use client";
import { RippleData } from "@/types/types";
import Button from "../ui/Button";
import { Bookmark, Heart, MessageCircle, Repeat, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/store/themeContext/useTheme";
import { formatTime } from "@/utils/formattedTimestamp";
import React, { useState } from "react";

export default function RippleCard({ ripple }: { ripple: RippleData }) {
  const router = useRouter();
  const { theme } = useTheme();
  const [likes, setLikes] = useState(ripple.likedBy);

  const creator = typeof ripple.creator === "object" ? ripple.creator : null;
  const capitalizedName = creator?.fullName
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

  const formattedTime = formatTime(ripple.createdAt);

  const handleLikeBtnToggle = async () => {
    const res = await fetch(`/api/ripples/${ripple._id}/likedBy`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      return;
    }
    const updatedRipple = await res.json();
    setLikes(updatedRipple.likedBy);
  };

  return (
    <article
      className={`w-full h-fit flex items-start gap-4 p-6 border cursor-pointer rounded-lg ${theme === "light" ? "bg-blue-200 border-blue" : "bg-navy-blue/40 border-powdered-blue-100"}`}
      onClick={() => router.push(`/ripples/${ripple._id}`)}
    >
      <div
        className={`max-w-full w-fit aspect-square p-2 border rounded-full ${theme === "light" ? "border-blue" : "border-powdered-blue-100"}`}
      >
        <UserIcon className="shrink-0 max-[30rem]:w-5 max-[30rem]:h-5 w-7 h-7" />
      </div>{" "}
      <div className="w-full">
        <Link
          href={`/profile/${creator?.userName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{capitalizedName}</h2>
          <small>{`@${creator?.userName}`}</small>
        </Link>

        <p>{ripple.content}</p>
        <div className="py-2 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex gap-1.5 items-center">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleLikeBtnToggle();
                }}
              >
                <Heart />
              </Button>
              <span>{likes.length}</span>
            </div>

            <div className="flex gap-1.5 items-center">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  router.push(`/ripples/${ripple._id}`);
                }}
              >
                <MessageCircle />
              </Button>
              <span>{ripple.comments.length}</span>
            </div>

            <div className="flex gap-1.5 items-center">
              <Button>
                <Repeat />
              </Button>
              <span>{ripple.rePost.length}</span>
            </div>
          </div>
          <div className="flex gap-1.5.5 items-center">
            <Bookmark />
            <span>{ripple.bookmark.length}</span>
          </div>
        </div>
        <div className="text-sm">
          {/* <small>{`${ripple.views} views`}</small> */}
          <time>{formattedTime}</time>
        </div>
      </div>
    </article>
  );
}
