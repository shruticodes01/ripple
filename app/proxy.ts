import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtectedPage = pathname.startsWith("/profile");
  const isProtectedAPI = pathname.startsWith("/api/profile");

  if ((isProtectedPage || isProtectedAPI) && !token) {
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
  matcher: ["/profile/:path*", "/api/profile/:path*"],
};
