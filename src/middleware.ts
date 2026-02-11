import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { defaultLocale } from "./i18n/config";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const PROTECTED_ROUTES = ["/dashboard"];
const PUBLIC_ROUTES = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("session_token");
  const token = tokenCookie?.value;

  let isValidToken = false;
  let userPayload: any = null;

  if (token) {
    try {
      const verified = await jwtVerify(token, SECRET_KEY);
      isValidToken = true;
      userPayload = verified.payload;
    } catch (error) {
      isValidToken = false;
      if (process.env.NODE_ENV === "development") {
        console.log("JWT verification failed:", error instanceof Error ? error.message : error);
      }
    }
  }

  let response: NextResponse;

  if (pathname === "/") {
    const target = isValidToken ? "/dashboard" : "/login";
    response = NextResponse.redirect(new URL(target, request.url));

    if (!isValidToken && token) {
      response.cookies.delete("session_token");
    }
  }
  else if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isValidToken) {
      response = NextResponse.redirect(new URL("/login", request.url));
      if (token) {
        response.cookies.delete("session_token");
      }
    } else {
      response = NextResponse.next();
    }
  }
  else if (PUBLIC_ROUTES.includes(pathname)) {
    if (isValidToken) {
      response = NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      response = NextResponse.next();
    }
  }
  else {
    response = NextResponse.next();
  }

  if (!request.cookies.get("locale")) {
    response.cookies.set("locale", defaultLocale, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
