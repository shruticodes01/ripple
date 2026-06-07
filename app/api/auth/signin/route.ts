import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { validateSignin } from "@/utils/validateForms";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationErrors = validateSignin(body);
  if (Object.keys(validationErrors).length > 0) {
    return Response.json(
      { message: "All fields are required" },
      { status: 422 },
    );
  }

  try {
    await connectDB();
    const user = await User.findOne({
      $or: [{ email: body.identifier }, { userName: body.identifier }],
    });
    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 409 });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 409 });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
