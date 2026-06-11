"use client";

import RippleCard from "@/components/ripple/RippleCard";
import Button from "@/components/ui/Button";
import { Ripple } from "@/types/types";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function UserProfile() {
  const [ripplePost, setRipplePost] = useState("");
  const [userRipples, setUserRipples] = useState<Ripple[]>([]);

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
      console.log(`type: ${typeof userRipples}`);
      setRipplePost("");
    }
  };

  useEffect(() => {
    async function fetchUserRipples() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      console.log("API response:", data);
      setUserRipples(data);
    }

    fetchUserRipples();
  }, []);

  return (
    <>
      <section className={`w-full pt-20`}>
        <div className="relative mb-12">
          <div className={`w-full h-125 bg-blue-300 flex justify-end`}>
            <div className="w-full h-full p-4">
              <Image
                className=""
                src="/"
                alt="profile-banner"
                width={1500}
                height={500}
              />
              <Button className={``} label="+ Add Banner" />
            </div>
          </div>
          <div
            className={`w-50 h-50 border-2 border-black rounded-full absolute -bottom-12`}
          >
            <Button>
              <Image
                className="rounded-full text-center"
                src="/"
                width={200}
                height={200}
                alt="avatar"
              />
            </Button>
          </div>
          <div className="w-full h-12 flex justify-end items-center">
            <Button label="Follow" />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-10">
          <div className="flex justify-between">
            <p>Bio</p>
            <div>
              <Button label="Edit Profile" />
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
      <section className="py-10">
        <form
          className="flex max-md:gap-2 md:gap-4 items-baseline-last"
          onSubmit={handleRippleSubmit}
        >
          <label className="flex flex-col gap-4" htmlFor="ripplePost">
            Create a wave of ripples by sharing your thoughts
            <textarea
              className="w-full border border-blueish-black rounded-md max-md:p-2 md:p-4"
              id="ripplePost"
              name="ripplePost"
              rows={5}
              cols={40}
              onChange={handleChange}
              value={ripplePost}
            />
          </label>
          <Button className="self-end" type="submit">
            <SendHorizonal />
          </Button>
        </form>
      </section>
      <section>
        <ul className="mt-8">
          {userRipples.map((ripple) => {
            return (
              <li key={ripple._id}>
                <RippleCard ripple={ripple} />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
