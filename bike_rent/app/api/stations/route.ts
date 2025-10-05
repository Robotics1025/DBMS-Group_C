import { PrismaClient } from "@/app/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json() // parse JSON from frontend
    const { locationName, address, city, phoneNumber, capacity } = body

    if (!locationName || !address || !city) {
      return NextResponse.json(
        { success: false, error: "LocationName, Address, and City are required." },
        { status: 400 }
      )
    }

    // Raw SQL insertion
    const result = await prisma.$executeRaw`
      INSERT INTO location 
        (LocationName, Address, City, PhoneNumber, Capacity) 
      VALUES 
        (${locationName}, ${address}, ${city}, ${phoneNumber ?? null}, ${capacity ? Number(capacity) : null})
    `

    return NextResponse.json({ success: true, affectedRows: result }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Unexpected error occurred." }, { status: 500 })
  }
}
