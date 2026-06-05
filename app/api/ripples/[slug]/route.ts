import { connectDB } from "@/lib/db";
import Ripple from "@/lib/models/Ripple";

export async function GET({ params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const ripple = await Ripple.findById(params.slug);
    if (!ripple) {
      return Response.json({ error: "Ripple Not Found" }, { status: 404 });
    }
    return Response.json(ripple, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Erro";
    return Response.json({ error: message }, { status: 500 });
  }
}
