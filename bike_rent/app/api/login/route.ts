import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { Email, Password } = body

    if (!Email || !Password) {
      return NextResponse.json({ error: "Email and Password are required" }, { status: 400 })
    }

    // Make sure model name matches your Prisma schema (usually User)
    const user = await prisma.user.findUnique({
      where: { Email },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const validPassword = await bcrypt.compare(Password, user.PasswordHash)
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a session
    const sessionId = randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    // Make sure the model name matches your Prisma schema (usually UserSession)
    await prisma.usersession.create({
      data: {
        SessionID: sessionId,
        UserID: user.UserID,
        ExpiresAt: expiresAt,
        CreatedAt: new Date(),
        UserAgent: req.headers.get("user-agent") || "",
        IPAddress: req.headers.get("x-forwarded-for") || "unknown",
        IsActive: true,
      },
    })

    return NextResponse.json({
      message: "Login successful",
      sessionId,
      user: {
        id: user.UserID,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
      },
    })
  } catch (err: any) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
