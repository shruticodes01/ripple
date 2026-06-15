import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface AuthPayload {
  userId: string;
  email: string;
  userName: string;
  fullName: string;
}

export async function getAuthUser(): Promise<AuthPayload | null> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}
