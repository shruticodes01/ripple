import { getAuthUser } from "@/lib/auth";
import Ripple from "@/lib/models/Ripple";
import User from "@/lib/models/User";
import { getSingleRipple } from "@/lib/ripples";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ripple = await getSingleRipple(id);
    if (!ripple) {
      return Response.json({ error: "Ripple Not Found" }, { status: 404 });
    }
    return Response.json(ripple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { content } = await req.json();

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const ripple = await getSingleRipple(id);
    if (!ripple) {
      return Response.json({ error: "Ripple not found" }, { status: 404 });
    }

    const creatorId = (ripple.creator as { _id: string })._id.toString();
    if (creatorId !== user._id.toString()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedRipple = await Ripple.findByIdAndUpdate(
      id,
      { content },
      {
        returnDocument: "after",
      },
    );
    return Response.json(updatedRipple, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const allCookies = await cookies();
    console.log("all coookies:", allCookies);
    const { id } = await params;

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const ripple = await getSingleRipple(id);
    if (!ripple) {
      return Response.json({ error: "Ripple not found" }, { status: 404 });
    }

    const creatorId = (ripple.creator as { _id: string })._id.toString();
    if (creatorId.toString() !== user._id.toString()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const deletedRipple = await Ripple.findByIdAndDelete(id);
    return Response.json(deletedRipple, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
