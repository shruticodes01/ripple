// import { Ripple, RippleResponse } from "@/types/types";
// import fileSystem from "node:fs/promises";
// import path from "path";

import { connectDB } from "@/lib/db";
import Ripple from "@/lib/models/Ripple";
import { NextRequest } from "next/server";

// export async function GET(): Promise<Ripple[]> {
//   const filePath = path.join(process.cwd(), "db-json");
//   const rawData = await fileSystem.readFile(filePath, { encoding: "utf8" });
//   const database: RippleResponse = JSON.parse(rawData);
//   const existingPostId = new Set(
//     database.posts?.map((post: Ripple) => post.id),
//   );

//   if (database.posts.length > 0) {
//     return Response.json(database.posts) as unknown as Promise<Ripple[]>;
//   }

//   const response = await fetch("https://dummyjson.com/posts");

//   const body = await response.json();
//   const uniqueNewPosts = body.posts.filter(
//     (post: Ripple) => !existingPostId.has(post.id),
//   );

//   database.posts.push(...uniqueNewPosts);
//   await fileSystem.writeFile(filePath, JSON.stringify(database, null, 2));

//   return Response.json(body.posts) as unknown as Promise<Ripple[]>;
// }

// CREATE

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newRipple = await Ripple.create(body);
    return Response.json(newRipple, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json(
      { error: message },
      {
        status: 500,
      },
    );
  }
}

// READ
export async function GET() {
  try {
    await connectDB();
    const ripples = await Ripple.find({});
    return Response.json(ripples, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json(
      { error: message },
      {
        status: 500,
      },
    );
  }
}

// PUT OR PATCH

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { id, ...updatedData } = await req.json();
    const updatedRipple = await Ripple.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return Response.json(updatedRipple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedRipple = Ripple.findByIdAndDelete(id);
    return Response.json(deletedRipple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json({ error: message }, { status: 500 });
  }
}
