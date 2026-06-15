import { RippleData } from "@/types/types";
import { connectDB } from "./db";
import User from "./models/User";
import Ripple from "./models/Ripple";

export async function getRipples(): Promise<RippleData[]> {
  await connectDB();
  void User;
  const ripples = await Ripple.find({})
    .populate("creator", "fullName userName avatar")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(ripples));
}

export async function getSingleRipple(id: string): Promise<RippleData | null> {
  await connectDB();
  void User;
  const singleRipple = await Ripple.findById(id)
    .populate("creator", "fullName userName avatar")
    .lean();

  return singleRipple ? JSON.parse(JSON.stringify(singleRipple)) : null;
}
