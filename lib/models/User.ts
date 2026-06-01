import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userHandle: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    avatar: { type: String },
    banner: { type: String },
    bio: { type: String, maxlength: 160 },
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
