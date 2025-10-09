// app/api/signup/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@/app/generated/prisma"
import { randomUUID } from "crypto"
import { userQueries, sessionQueries, executeQuery, executeInsertQuery } from "@/lib/queries"

// Initialize Prisma Client
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { NationalID, FirstName, LastName, Email, Password, PhoneNumber, DateOfBirth, Role } = body

    // Validate required fields
    if (!NationalID || !FirstName || !LastName || !Email || !Password) {
      return NextResponse.json(
        { error: "NationalID, FirstName, LastName, Email, and Password are required" },
        { status: 400 }
      )
    }

    // Check if user exists using raw SQL
    const existingUserResult = await executeQuery(prisma, userQueries.getUserByEmail, [Email])
    if (existingUserResult.success && existingUserResult.data && existingUserResult.data.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(Password, 10)

    // Create user using raw SQL
    const userResult = await executeInsertQuery(prisma, userQueries.createUser, [
      NationalID,
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      passwordHash,
      DateOfBirth ? new Date(DateOfBirth).toISOString().slice(0, 10) : null,
      Role || 'Customer'  // Use provided role or default to Customer
    ])

    if (!userResult.success) {
      console.error("Failed to create user:", userResult.error)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    const newUserId = userResult.insertId

    // Create session using raw SQL
    const sessionId = randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    const sessionResult = await executeInsertQuery(prisma, sessionQueries.createSession, [
      sessionId,
      newUserId,
      expiresAt.toISOString().slice(0, 19).replace('T', ' '),
      request.headers.get("user-agent") || "",
      request.headers.get("x-forwarded-for") || "unknown"
    ])

    if (!sessionResult.success) {
      console.error("Failed to create session:", sessionResult.error)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }

    console.log("Signup successful for user:", Email)

    // Return user + session
    return NextResponse.json({
      success: true,
      message: "Signup successful",
      sessionId,
      user: {
        id: newUserId,
        name: `${FirstName} ${LastName}`,
        nationalId: NationalID,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        role: Role || 'Customer',
        phoneNumber: PhoneNumber
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  } finally {
    await prisma.$disconnect() // Close the connection after request
  }
}
