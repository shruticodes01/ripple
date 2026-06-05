import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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
