import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Ripple from "@/lib/models/Ripple";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

// const TEMP_USER_ID = "6507f1f77bcf86cd79943901";

// CREATE

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({
      $or: [{ email: session.user.email }, { userName: session.user.userName }],
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { content } = body;

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
    const ripples = await Ripple.find({})
      .populate("creator", "fullName userName avatar")
      .sort({ createdAt: -1 });
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

// PUT OR PATCH

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { id, ...updatedData } = await req.json();
    const updatedRipple = await Ripple.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return Response.json(updatedRipple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedRipple = await Ripple.findByIdAndDelete(id);
    return Response.json(deletedRipple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json({ error: message }, { status: 500 });
  }
}
