"use client";

import RippleList from "@/components/ripple/RippleList";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/authContext/useAuth";
import { useTheme } from "@/store/themeContext/useTheme";
import { RippleData } from "@/types/types";
import { formatName } from "@/utils/formattedName";
import { SendHorizonal, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserProfile() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const [ripplePost, setRipplePost] = useState("");
  const [userRipples, setUserRipples] = useState<RippleData[]>([]);

  const router = useRouter();

  const capitalizedName = formatName(user?.fullName as string);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRipplePost(e.target.value);
  };

  const handleRippleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ripplePost.trim()) {
      return;
    }

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: ripplePost }),
    });

    if (res.ok) {
      const newRipple = await res.json();
      setUserRipples((prev) => [newRipple, ...prev]);
      setRipplePost("");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function fetchUserRipples() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setUserRipples(data);
    }

    fetchUserRipples();
  }, [user]);

  return (
    <>
      <section
        className={`pb-10 border-b ${theme === "light" ? "border-blue" : "border-powdered-blue-100"}`}
      >
        <div className="relative mb-12">
          <div className={`w-full max-md:h-80 md:h-125 bg-blue-300 `}>
            <div className="w-full h-full flex justify-end p-4">
              <Button
                className={`self-end text-navy-blue`}
                label="+ Add Banner"
              />
            </div>
          </div>
          <div
            className={`max-md:w-30 max-md:h-30 md:w-50 md:h-50 border-2 rounded-full absolute max-md:-bottom-4 md:-bottom-12 ${theme === "light" ? "border-blueish-black" : "border-light-gray"}`}
          >
            <UserIcon
              className="w-24 h-24 md:w-32 md:h-32 absolute max-md:bottom-4 max-md:right-3 md:right-9 bottom-9"
              strokeWidth={0.5}
            />
          </div>
          <div className="w-full h-12 flex justify-end items-center pt-4 pr-3">
            <Button
              className={`max-md:px-2.5 max-md:py-1 md:px-4 md:py-2 rounded-full ${theme === "light" ? "bg-blueish-black text-light-gray" : "bg-light-gray text-blueish-black"}`}
              label="Follow"
            />
          </div>
        </div>
        <div className={` flex flex-col gap-4 pt-10 px-3 `}>
          <div className="flex justify-between">
            <div>
              <h3 className="mb-3 font-bold">Bio</h3>
              {user?.userId && (
                <ul>
                  <li>{capitalizedName}</li>
                  <li
                    className={`font-normal ${theme === "light" ? "text-blue" : "text-powdered-blue-100"}`}
                  >
                    @{user.userName}
                  </li>
                </ul>
              )}
            </div>
            <div>
              <Button
                className={`max-md:px-2.5 max-md:py-1 md:px-4 md:py-2 rounded-full ${theme === "light" ? "bg-blueish-black text-light-gray" : "bg-light-gray text-blueish-black"}`}
                label="Edit Profile"
              />
            </div>
          </div>
          <div className="flex flex-wrap wrap-normal gap-4">
            <p>
              <strong>0</strong> Following
            </p>
            <p>
              <strong>0</strong> Followers
            </p>
          </div>
        </div>
      </section>
      <section className={`py-10`}>
        <form
          className="flex max-md:gap-2 md:gap-4 items-baseline-last"
          onSubmit={handleRippleSubmit}
        >
          <label className="flex flex-col gap-4" htmlFor="ripplePost">
            Create a wave of ripples by sharing your thoughts
            <textarea
              className={`w-full max-w-150 border rounded-md max-md:p-2 md:p-4 ${theme === "light" ? "border-blueish-black" : "border-light-gray"}`}
              id="ripplePost"
              name="ripplePost"
              rows={5}
              cols={55}
              onChange={handleChange}
              value={ripplePost}
            />
          </label>
          <Button className="self-end shrink-0" type="submit">
            <SendHorizonal />
          </Button>
        </form>
      </section>
      <>
        <RippleList ripples={userRipples} />
      </>
    </>
  );
}
