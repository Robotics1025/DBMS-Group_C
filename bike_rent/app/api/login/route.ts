import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { userQueries, sessionQueries, executeQuery, executeInsertQuery } from "@/lib/queries"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { Email, Password } = body

    if (!Email || !Password) {
      return NextResponse.json({ error: "Email and Password are required" }, { status: 400 })
    }

    // Get user by email using raw SQL
    const userResult = await executeQuery(prisma, userQueries.getUserByEmail, [Email])
    
    if (!userResult.success || !userResult.data || userResult.data.length === 0) {
      console.log("User not found for email:", Email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = userResult.data[0]
    console.log("Found user:", { id: user.UserID, email: user.Email, role: user.Role })

    const validPassword = await bcrypt.compare(Password, user.PasswordHash)
    if (!validPassword) {
      console.log("Invalid password for user:", Email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a session using raw SQL
    const sessionId = randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    const sessionResult = await executeInsertQuery(prisma, sessionQueries.createSession, [
      sessionId,
      user.UserID,
      expiresAt.toISOString().slice(0, 19).replace('T', ' '),
      req.headers.get("user-agent") || "",
      req.headers.get("x-forwarded-for") || "unknown"
    ])

    if (!sessionResult.success) {
      console.error("Failed to create session:", sessionResult.error)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }

    console.log("Login successful for user:", Email)

    return NextResponse.json({
      success: true,
      message: "Login successful",
      sessionId,
      user: {
        id: user.UserID,
        name: `${user.FirstName} ${user.LastName}`,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        role: user.Role,
        loyaltyPoints: user.LoyaltyPoints || 0
      },
    })
  } catch (err: any) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
