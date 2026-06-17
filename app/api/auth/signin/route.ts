import { connectDB } from "@/lib/db";
import User, { IUser } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return Response.json({ error: "Missing Credentials" }, { status: 400 });
    }

    const user = await User.findOne<IUser>({
      $or: [{ email: identifier }, { userName: identifier }],
    });
    if (!user) {
      return Response.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
    })
      .setProtectedHeader({ alg: "HS256" }) //algorithm used to create a stamp
      .setExpirationTime("7d")
      .sign(secret);

    (await cookies()).set("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json(
      {
        user: {
          id: user._id.toString(),
          email: user.email,
          userName: user.userName,
          fullName: user.fullName,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return Response.json({ message }, { status: 500 });
  }
}
