import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { validateSignupData } from "@/utils/validateForms";
import bcrypt from "bcryptjs";

interface ExistingUserError {
  email?: string;
  userName?: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationErrors = validateSignupData(body);

  if (Object.keys(validationErrors).length > 0) {
    return Response.json({ validationErrors }, { status: 422 });
  }

  try {
    await connectDB();
    // find whether an email or userName already exists
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { userName: body.userName }],
    });

    if (existingUser) {
      const errors: ExistingUserError = {};
      if (existingUser.email === body.email) {
        errors.email = "User already exists";
      }
      if (existingUser.userName === body.userName) {
        errors.userName = "Username already taken";
      }
      return Response.json({ errors }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await User.create({
      fullName: body.fullName,
      userName: body.userName,
      email: body.email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
