import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ripple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ripple",
      required: true,
    },
    content: { type: String, maxlength: 300, required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
