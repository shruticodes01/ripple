import RippleList from "@/components/ripple/RippleList";
import { getRipples } from "@/lib/ripples";

export const revalidate = 60;

export default async function Home() {
  const ripples = await getRipples();
  return (
    <div className={`w-full h-full flex flex-col gap-5`}>
      <h1 className="text-2xl md:text-3xl">For You</h1>
      <RippleList ripples={ripples} />
    </div>
  );
}
