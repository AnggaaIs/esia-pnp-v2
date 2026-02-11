import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");

    if (!token) {
      return NextResponse.json(
        { message: "unauthorized" },
        { status: 401 }
      );
    }

    let payload;
    try {
      const verified = await jwtVerify(token.value, SECRET_KEY);
      payload = verified.payload;
    } catch (error) {
      return NextResponse.json(
        { message: "unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        mahasiswa: {
          select: {
            id: true,
            nim: true,
            namaLengkap: true,
            fotoProfil: true,
            statusMahasiswa: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "success",
        data: user
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(
      { message: "error" },
      { status: 500 }
    );
  }
}
