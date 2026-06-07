import { Ripple } from "@/types/types";
import Button from "../ui/Button";
import { Heart, MessageCircle, Repeat } from "lucide-react";

export default function RippleCard({ ripple }: { ripple: Ripple }) {
  return (
    <article className={`w-full p-4 border-b border-powdered-blue-200`}>
      <h2>{typeof ripple.creator === "object" ? ripple.creator.name : ""}</h2>
      <small>
        {typeof ripple.creator === "object" ? ripple.creator.userName : ""}
      </small>
      <p>{ripple.content}</p>
      <div className="py-2 flex gap-2">
        <span>
          <Button>
            <Heart />
          </Button>
        </span>
        <span>
          <Button>
            <MessageCircle />
          </Button>
        </span>
        <span>
          <Button>
            <Repeat />
          </Button>
        </span>
      </div>
      <small>{ripple.views}</small>
      <time>{ripple.createdAt}</time>
    </article>
  );
}
