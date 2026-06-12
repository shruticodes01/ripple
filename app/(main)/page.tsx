"use client";

import { Ripple } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";

import { useEffect, useState } from "react";
import { useTheme } from "@/store/themeContext/useTheme";

export default function Home() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

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
    <section
      className={`w-full h-full pt-20 px-4 ${theme === "light" ? "md:shadow-blue md:shadow-[0_0_0.25rem_-0.05rem]" : "md:shadow-powdered-blue-100 md:shadow-[0_0_0.25rem_-0.05rem]"}`}
    >
      <div></div>
      <div className={``}>
        <h1 className="text-2xl md:text-3xl">For You</h1>
        <ul className="w-full flex flex-col items-start gap-3 py-6">
          {ripples.map((data: Ripple) => {
            console.log(data);

            return (
              <li
                className="w-full py-2 border-b border-powdered-blue-200"
                key={data._id}
              >
                <RippleCard ripple={data} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
