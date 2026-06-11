"use client";

import { Ripple } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";

import { useEffect, useState } from "react";

export default function Home() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRipples = async () => {
      //add dynamic loader
      const res = await fetch("/api/ripples");
      const data = await res.json();
      console.log("Home ripples:", JSON.stringify(data[0], null, 2));
      setRipples(data);
    };

    fetchRipples();
  }, []);

  return (
    <section className="w-full py-20 px-4">
      <div>
        <h1 className="text-xl">Trending Ripples</h1>
        <ul className="w-full flex flex-col items-start gap-3 py-6">
          {ripples.map((data: Ripple) => {
            console.log(data);

            return (
              <li className="w-full py-2" key={data._id}>
                <RippleCard ripple={data} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
