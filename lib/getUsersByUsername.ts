import { connectDB } from "./db";
import Ripple from "./models/Ripple";
import User from "./models/User";

export const getUserByUsername = async (username: string) => {
  await connectDB();
  const user = await User.findOne({ userName: username }).lean();
  if (!user) {
    return null;
  }

  const ripples = await Ripple.find({ creator: user._id })
    .populate("creator", "fullName userName avatar")
    .sort({ createdAt: -1 })
    .lean();

  return user ? JSON.parse(JSON.stringify({ ...user, ripples })) : null;
};
