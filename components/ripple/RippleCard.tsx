import { Ripple } from "@/types/types";

export default function RippleCard({ ripple }: { ripple: Ripple }) {
  return (
    <article>
      <h2>{ripple.title}</h2>
      <p>{ripple.body}</p>
      <small>{`ID: ${ripple.userId}`}</small>
    </article>
  );
}
