import { Ripple, RippleResponse } from "@/types/types";
import fileSystem from "node:fs/promises";
import path from "path";

export async function GET(): Promise<Ripple[]> {
  const filePath = path.join(process.cwd(), "db-json");
  const rawData = await fileSystem.readFile(filePath, { encoding: "utf8" });
  const database: RippleResponse = JSON.parse(rawData);
  const existingPostId = new Set(
    database.posts?.map((post: Ripple) => post.id),
  );

  if (database.posts.length > 0) {
    return Response.json(database.posts) as unknown as Promise<Ripple[]>;
  }

  const response = await fetch("https://dummyjson.com/posts");

  const body = await response.json();
  const uniqueNewPosts = body.posts.filter(
    (post: Ripple) => !existingPostId.has(post.id),
  );

  database.posts.push(...uniqueNewPosts);
  await fileSystem.writeFile(filePath, JSON.stringify(database, null, 2));

  return Response.json(body.posts) as unknown as Promise<Ripple[]>;
}
