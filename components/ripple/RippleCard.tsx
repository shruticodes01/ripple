import { Ripple } from "@/types/types";
import Button from "../ui/Button";
import { Heart, MessageCircle, Repeat, UserIcon } from "lucide-react";

export default function RippleCard({ ripple }: { ripple: Ripple }) {
  return (
    <article
      className={`w-full flex items-start gap-4 p-4 border-b border-powdered-blue-200`}
    >
      <div className="max-w-full w-fit aspect-square p-2 border border-blue rounded-full">
        <UserIcon className="shrink-0" />
      </div>{" "}
      <div className="w-full">
        <h2>
          {typeof ripple.creator === "object" ? ripple.creator.fullName : ""}
        </h2>
        <small>
          {typeof ripple.creator === "object"
            ? `@${ripple.creator.userName}`
            : ""}
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
      </div>
    </article>
  );
}
