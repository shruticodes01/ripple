import { getAuthUser } from "@/lib/auth";
import { getComments } from "@/lib/comments";
import { connectDB } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import Ripple from "@/lib/models/Ripple";
import { NextRequest } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const comments = await getComments(id);
    return Response.json(comments, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content) {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    const newComment = await Comment.create({
      content,
      creator: authUser.userId,
      ripple: id,
      parentComment: null,
    });
    await Ripple.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    return Response.json(newComment, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
