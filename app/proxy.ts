import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const isValid = token ? await verifyToken(token) : false;

  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");
  if (isAuthPage && isValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtectedPage = pathname.startsWith("/profile");
  const isProtectedAPI = pathname.startsWith("/api/profile");

  if ((isProtectedPage || isProtectedAPI) && !isValid) {
    if (isProtectedAPI) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to access your profile" },
        { status: 401 },
      );
    }

    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/api/profile/:path*",
    "/bookmarks/:path*",
    "/messages/:path*",
  ],
};
