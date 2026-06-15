import { connectDB } from "./db";
import Comment from "./models/Comment";
import Ripple from "./models/Ripple";

export async function getComments(rippleId: string) {
  await connectDB();
  void Ripple;

  const comments = await Comment.find({
    ripple: rippleId,
    parentComment: null,
  })
    .populate("creator", "fullName userName avatar")
    .populate("replies")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(comments));
}

export async function getCommentById(id: string) {
  await connectDB();
  const comment = await Comment.findById(id)
    .populate("creator", "fullName userName avatar")
    .populate("replies")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(comment));
}
