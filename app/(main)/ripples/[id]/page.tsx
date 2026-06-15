import CommentsSection from "@/components/comments/CommentsSection";
import RippleCard from "@/components/ripple/RippleCard";
import { getSingleRipple } from "@/lib/ripples";

import { notFound } from "next/navigation";

export default async function Ripple({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ripple = await getSingleRipple(id);

  if (!ripple) {
    notFound();
  }

  return (
    <>
      <RippleCard ripple={ripple} />
      <CommentsSection rippleId={id} />
    </>
  );
}
