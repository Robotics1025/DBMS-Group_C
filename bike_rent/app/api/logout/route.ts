import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
import { sessionQueries, executeQuery } from "@/lib/queries"

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

    // Deactivate the session using raw SQL
    const result = await executeQuery(prisma, sessionQueries.deactivateSession, [sessionId])

    if (!result.success) {
      console.error("Failed to deactivate session:", result.error)
      return NextResponse.json({ error: "Failed to logout" }, { status: 500 })
    }

    console.log("Logout successful for session:", sessionId)
    return NextResponse.json({ success: true, message: "Logout successful" })
  } catch (err: any) {
    console.error("Logout error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
