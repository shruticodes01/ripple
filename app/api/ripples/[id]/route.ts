import { getSingleRipple } from "@/lib/ripples";

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
