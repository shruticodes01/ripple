import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true },
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

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
