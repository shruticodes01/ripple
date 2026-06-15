"use client";

import { RippleData } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";
import { useTheme } from "@/store/themeContext/useTheme";

export default function RippleList({ ripples }: { ripples: RippleData[] }) {
  const { theme } = useTheme();

  return (
    <section
      className={`w-full h-full border border-b-transparent px-1 py-1 rounded-t-lg ${theme === "light" ? "border-t-blue border-l-blue border-r-blue" : "border-t-powdered-blue-100 border-l-powdered-blue-100 border-r-powdered-blue-100"}`}
    >
      <ul className="w-full flex flex-col items-start gap-3">
        {ripples.map((data: RippleData) => {
          console.log(data);

          return (
            <li
              className="w-full border-b border-powdered-blue-200"
              key={data._id}
            >
              <RippleCard ripple={data} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
