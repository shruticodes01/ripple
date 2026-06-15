import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Ripple from "@/lib/models/Ripple";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const ripple = await Ripple.findById(id);
    if (!ripple) {
      return Response.json({ error: "Ripple not found" }, { status: 404 });
    }

    return Response.json({ likedBy: ripple.likedBy }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}

export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ripple = await Ripple.findById(id);
    if (!ripple) {
      return Response.json({ error: "Ripple not found" }, { status: 404 });
    }

    const userId = authUser.userId;
    let updatedRipple;
    if (ripple.likedBy.includes(userId)) {
      updatedRipple = await Ripple.findByIdAndUpdate(
        id,
        { $pull: { likedBy: userId } },
        { new: true },
      );
    } else {
      updatedRipple = await Ripple.findByIdAndUpdate(
        id,
        { $addToSet: { likedBy: userId } },
        { new: true },
      );
    }

    return Response.json(updatedRipple, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
