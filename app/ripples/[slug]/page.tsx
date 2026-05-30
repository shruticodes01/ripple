import Button from "@/components/ui/Button";
import { getSingleRipple } from "@/lib/ripplesAPI";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default async function SingleRippleData({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const singleRipple = await getSingleRipple(Number(slug));

  return (
    <div>
      <h1>Single Ripple</h1>
      <article>
        <h2>{singleRipple.title}</h2>
        <p>{singleRipple.body}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            <p className="flex items-center gap-2">
              <Button>
                <ThumbsUp className="w-5 h-5" />
              </Button>
              <span>{singleRipple.reactions.likes}</span>
            </p>

            <p className="flex items-center gap-2">
              <Button>
                <ThumbsDown className="w-5 h-5" />
              </Button>
              <span>{singleRipple.reactions.dislikes}</span>
            </p>
          </div>
          <p className="text-gray-500">{singleRipple.views} views</p>
        </div>
        <ul className="flex gap-2 mt-4">
          {singleRipple.tags.map((tag, i) => {
            return (
              <li className="text-blue" key={i}>
                #{tag}
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
