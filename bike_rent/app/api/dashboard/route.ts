// app/api/dashboard/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma" // Import the class

const prisma = new PrismaClient() // Instantiate PrismaClient

export async function GET() {
  try {
    const properties = await prisma.properties.findMany({
      include: { property_units: true },
    })
    const units = await prisma.property_units.findMany()
    const tenants = await prisma.tenants.findMany()
    const leases = await prisma.leases.findMany({
      include: { tenants: true, property_units: true },
    })
    const rentSchedules = await prisma.rent_schedules.findMany({
      include: { leases: true },
    })

    return NextResponse.json({ properties, units, tenants, leases, rentSchedules })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
