import { Ripple, RippleResponse } from "@/types/types";

export async function getRippleData() {
  const res = await fetch("https://dummyjson.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch Ripple data");
  }

  return res.json() as Promise<RippleResponse>;
}

export async function getSingleRipple(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch a single ripple data");
  }

  return res.json() as Promise<Ripple>;
}
