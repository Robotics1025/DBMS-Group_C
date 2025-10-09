import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()

export async function middleware(req: NextRequest) {
  const publicPaths = [
    "/login",
    "/signup", 
    "/landing",
    "/api/login",
    "/api/signup",
    "/api/logout",
  ]

  // Skip middleware for public routes
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const sessionId =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    req.cookies.get("sessionId")?.value

  if (!sessionId) {
    // If request is for API, return JSON
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized: No session" }, { status: 401 })
    }
    // Otherwise, redirect to login page for frontend
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const session = await prisma.usersession.findUnique({
      where: { SessionID: sessionId },
      include: { user: true },
    })

    if (!session || !session.IsActive || session.ExpiresAt < new Date()) {
      if (req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized: Invalid or expired session" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Attach user info to request headers
    req.headers.set("x-user-id", session.UserID.toString())
    req.headers.set("x-user-role", session.user.Role || "")

    return NextResponse.next()
  } catch (err) {
    console.error("Middleware error:", err)
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
