"use client";

import { getRippleData } from "@/lib/ripplesAPI";
import { Ripple } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTweets = async () => {
      //add dynamic loader
      const rippleData = await getRippleData();
      console.log(rippleData);
      console.log("type:", typeof rippleData);
      setRipples(rippleData.posts);
    };

    fetchTweets();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section>
          <div>
            <h1>Ripples</h1>
            <ul>
              {ripples.map((data: Ripple) => {
                console.log(data);

                return (
                  <li
                    className="flex items-start gap-3 py-2 border-b border-powdered-blue"
                    key={data.id}
                  >
                    <div className="p-2 border border-blue rounded-full">
                      <User className="shrink-0" />
                    </div>{" "}
                    <RippleCard ripple={data} />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
