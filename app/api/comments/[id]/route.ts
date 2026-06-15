import { getAuthUser } from "@/lib/auth";
import { getCommentById } from "@/lib/comments";
import Comment from "@/lib/models/Comment";
import Ripple from "@/lib/models/Ripple";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUser();
    if (!authUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comment = await getCommentById(id);
    if (!comment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.creator._id.toString() !== authUser.userId.toString()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await Comment.findByIdAndDelete(id);
    //$pull mongoDB method to remove an item from an array
    await Ripple.findByIdAndUpdate(comment.ripple, {
      $pull: { comments: id },
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
