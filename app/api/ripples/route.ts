import { getRipples } from "@/lib/ripples";

// READ
export async function GET() {
  try {
    const ripples = await getRipples();
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
