import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Ripple from "@/lib/models/Ripple";
import User from "@/lib/models/User";
import { NextRequest } from "next/server";

// CREATE

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const { content } = await req.json();
    if (!content.trim()) {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    const newRipple = await Ripple.create({ content, creator: user._id });
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

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const ripples = await Ripple.find({ creator: user._id })
      .populate("creator", "fullName userName avatar")
      .sort({ createdAt: -1 })
      .lean();
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
