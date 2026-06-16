"use client";

import { RippleData } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";

export default function RippleList({ ripples }: { ripples: RippleData[] }) {
  return (
    <section className="w-full h-full">
      <ul className="w-full flex flex-col items-start gap-3">
        {ripples.map((data: RippleData) => {
          console.log(data);

          return (
            <li className="w-full" key={data._id}>
              <RippleCard ripple={data} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
