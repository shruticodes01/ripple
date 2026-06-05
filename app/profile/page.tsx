"use client";

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

  const handleRippleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ripplePost.trim()) {
      return;
    }

    const res = await fetch("api/ripple", {
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
    async function fetchUserRipples() {
      const res = await fetch("api/ripples");
      const data = await res.json();
      setUserRipples(data);
    }

    fetchUserRipples();
  }, []);

  return (
    <>
      <section className={``}>
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
        <div className="py-4">
          <div>
            <p>Bio</p>
          </div>
          <div className="flex gap-4 relative left-60">
            <p>
              <strong>0</strong> Following
            </p>
            <p>
              <strong>0</strong> Followers
            </p>
          </div>
          <div>
            <Button label="Edit Profile" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex gap-4 items-baseline-last">
          <label htmlFor="ripplePost">
            Create a wave of ripples by sharing your thoughts
            <textarea
              className="w-full border border-blueish-black rounded-md p-4"
              id="ripplePost"
              name="ripplePost"
              rows={5}
              cols={45}
              onChange={handleChange}
              value={ripplePost}
            />
          </label>
          <Button type="submit" onClick={() => handleRippleSubmit}>
            <SendHorizonal />
          </Button>
        </div>
      </section>
      <section>
        <div>
          <ul>
            {userRipples.map((ripple) => {
              return <li key={ripple.id}>{ripple.content}</li>;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
