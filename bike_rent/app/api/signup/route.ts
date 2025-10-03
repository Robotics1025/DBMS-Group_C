// app/api/signup/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { PrismaClient } from "@/app/generated/prisma"

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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { Email } })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(Password, 10)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        NationalID,
        FirstName,
        LastName,
        Email,
        PasswordHash: passwordHash,
        PhoneNumber,
        DateOfBirth: DateOfBirth ? new Date(DateOfBirth) : null,
        Role,
        RegistrationDate: new Date(),
      },
    })

    // Create session
    const sessionId = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    await prisma.usersession.create({
      data: {
        SessionID: sessionId,
        UserID: newUser.UserID,
        ExpiresAt: expiresAt,
        IsActive: true,
      },
    })

    // Return user + session
    return NextResponse.json({
      message: "Signup successful",
      user: {
        id: newUser.UserID,
        NationalID: newUser.NationalID,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        Email: newUser.Email,
        Role: newUser.Role,
      },
      session: {
        sessionId,
        expiresAt,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  } finally {
    await prisma.$disconnect() // Close the connection after request
  }
}
