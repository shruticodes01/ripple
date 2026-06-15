// import { connectDB } from "@/lib/db";
// import Ripple from "@/lib/models/Ripple";
// import User from "@/lib/models/User";
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

// // CREATE

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const newRipple = await Ripple.create(body);
//     return Response.json(newRipple, { status: 201 });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unknown Error";
//     return Response.json(
//       { error: message },
//       {
//         status: 500,
//       },
//     );
//   }
// }

// // PUT OR PATCH

// export async function PUT(req: NextRequest) {
//   try {
//     await connectDB();
//     const { id, ...updatedData } = await req.json();
//     const updatedRipple = await Ripple.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });
//     return Response.json(updatedRipple, { status: 200 });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unknown Error";
//     return Response.json({ error: message }, { status: 500 });
//   }
// }

// // DELETE

// export async function DELETE(req: NextRequest) {
//   try {
//     await connectDB();
//     const { id } = await req.json();
//     const deletedRipple = Ripple.findByIdAndDelete(id);
//     return Response.json(deletedRipple, { status: 200 });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unknown Error";
//     return Response.json({ error: message }, { status: 500 });
//   }
// }
