"use client";
import { RippleData } from "@/types/types";
import Button from "../ui/Button";
import {
  ArrowUp,
  Bookmark,
  Edit,
  Ellipsis,
  Heart,
  MessageCircle,
  Repeat,
  Trash2,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/store/themeContext/useTheme";
import { formatTime } from "@/utils/formattedTimestamp";
import React, { useState } from "react";
import { useAuth } from "@/store/authContext/useAuth";
import { formatName } from "@/utils/formattedName";

export default function RippleCard({ ripple }: { ripple: RippleData }) {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [likes, setLikes] = useState(ripple.likedBy);

  // ellipsis button
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(ripple.content);

  const [isDeleted, setIsDeleted] = useState(false);

  const creator = typeof ripple.creator === "object" ? ripple.creator : null;
  const capitalizedName = formatName(creator?.fullName as string);

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

  const handleEditedPostSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const res = await fetch(`/api/ripples/${ripple._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: currentContent }),
    });

    const data = await res.json();

    if (res.ok) {
      setCurrentContent(data.content);
      setIsEditing(false);
    }
  };

  const handleDeletePost = async () => {
    if (!user) {
      console.log("no user");
      return;
    }
    const res = await fetch(`/api/ripples/${ripple._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <article
      className={`w-full max-w-160 h-fit flex items-start justify-between gap-4 py-6 px-4 border cursor-pointer rounded-lg ${theme === "light" ? "bg-blue-200 border-blue" : "bg-navy-blue/40 border-powdered-blue-100"}`}
      onClick={() => {
        if (!isEditing) {
          router.push(`/ripples/${ripple._id}`);
        }
      }}
    >
      <div
        className={`max-w-full w-fit aspect-square p-2 border rounded-full ${theme === "light" ? "border-blue" : "border-powdered-blue-100"}`}
      >
        <UserIcon className="shrink-0 max-[30rem]:w-5 max-[30rem]:h-5 w-7 h-7" />
      </div>{" "}
      <div className="w-full max-w-84">
        <div className={`${isEditing ? "mb-3" : "mb-2"}`}>
          <Link
            href={`/profile/${creator?.userName}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{capitalizedName}</h2>
            <small>{`@${creator?.userName}`}</small>
          </Link>
        </div>

        {isEditing ? (
          <form
            className="flex gap-2 items-end"
            noValidate
            onSubmit={handleEditedPostSubmit}
          >
            <textarea
              className="bg-light-gray text-blueish-black px-2 py-1 rounded-md"
              value={currentContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCurrentContent(e.target.value)
              }
            />
            <Button type="submit">
              <ArrowUp className="w-5 h-5" />
            </Button>
          </form>
        ) : (
          <p>{currentContent}</p>
        )}

        <div className="py-2 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex gap-1.5 items-center">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleLikeBtnToggle();
                }}
              >
                <Heart
                  className={`${theme === "light" && likes.length > 0 ? "stroke-red-700 fill-red-700" : theme === "dark" && likes.length > 0 ? "stroke-red-600 fill-red-600" : ""}`}
                />
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
      <div className="flex flex-col justify-end px-4 pb-2 relative">
        {user && creator && user.userId === creator._id && (
          <Button
            className="self-end"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setCardMenuOpen((menuOpen) => !menuOpen);
            }}
          >
            <Ellipsis />
          </Button>
        )}

        {cardMenuOpen && (
          <div
            className={`w-full max-w-fit flex gap-2 p-2 rounded-lg absolute right-0 top-full ${theme === "light" ? "bg-light-gray" : "bg-powdered-blue"}`}
          >
            <Button
              className="shrink-0"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              className="shrink-0"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleDeletePost();
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
