import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
const prisma = new PrismaClient()

// Handle POST /api/logout
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      )
    }

    // Find and deactivate the session
    const session = await prisma.usersession.updateMany({
      where: {
        SessionID: sessionId,
        IsActive: true,
      },
      data: {
        IsActive: false,
      },
    })

    if (session.count === 0) {
      return NextResponse.json(
        { error: "Invalid or already logged out session" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Logout successful" })
  } catch (err: any) {
    console.error("Logout error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
