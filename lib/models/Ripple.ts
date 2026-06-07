import mongoose from "mongoose";

const RippleSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    content: { type: String, maxlength: 300, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rePost: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sharePost: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Ripple = mongoose.models.Ripple || mongoose.model("Ripple", RippleSchema);

export default Ripple;
