"use client";

import { Ripple } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";
import { UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRipples = async () => {
      //add dynamic loader
      const res = await fetch("/api/ripples");
      const data = await res.json();
      setRipples(data);
    };

    fetchRipples();
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
                    key={data._id}
                  >
                    <div className="p-2 border border-blue rounded-full">
                      <UserIcon className="shrink-0" />
                    </div>{" "}
                    <div>
                      <RippleCard ripple={data} />
                    </div>
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
