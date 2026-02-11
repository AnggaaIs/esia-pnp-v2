import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Turnstile } from "@marsidev/react-turnstile";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, remember_me, turnstile_token } = body;

    if (!username || !password || !turnstile_token) {
      return NextResponse.json({ message: "missing_fields" }, { status: 400 });
    }

    const verifyEndpoint =
      "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const secretKey = process.env.TURNSTILE_SECRET_KEY!;

    if (!secretKey) {
      console.error("Turnstile secret key is not set.");
      return NextResponse.json({ message: "server_error" }, { status: 500 });
    }

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstile_token)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { message: "turnstile_verification_failed" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "invalid_credentials" },
        { status: 401 },
      );
    }

    const tokenExpiration = remember_me ? "30d" : "24h";

    const cookieMaxAge = remember_me ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

    const token = await new SignJWT({
      userId: user.id,
      role: user.role,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(tokenExpiration)
      .sign(SECRET_KEY);

    const cookieStore = await cookies();

    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: cookieMaxAge,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "server_error" }, { status: 500 });
  }
}
