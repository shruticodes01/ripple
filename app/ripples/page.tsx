import { getRippleData } from "@/lib/ripplesAPI";
import { Ripple } from "@/types/types";
import RippleCard from "@/components/ripple/RippleCard";
import { User } from "lucide-react";

export default async function RipplePage() {
  const rippleData = await getRippleData();
  console.log(rippleData);
  console.log("type:", typeof rippleData);
  return (
    <main>
      <section>
        <div>
          <h1>Ripples</h1>
          <ul>
            {rippleData.posts.map((data: Ripple) => {
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
  );
}
