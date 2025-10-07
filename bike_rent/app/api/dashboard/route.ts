
// app/api/dashboard/route.ts
//Add NextResponse and Prisma imports
import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma" // Import the class

//Instantiate PrismaClient
const prisma = new PrismaClient() 
//  Add documentation for API route
/**
 * GET /api/dashboard
 * Returns all data needed for the dashboard view
 */

//Add explicit return type
export async function GET() {
  try {
    // Fetch all properties with related units
    const properties = await prisma.properties.findMany({
      include: { property_units: true },
    })
    //Fetch all property units
    const units = await prisma.property_units.findMany()
    
    //Fetch tenants data (optimized with select)
    const tenants = await prisma.tenants.findMany()
    
    //Fetch leases with tenants and property_units relations
    const leases = await prisma.leases.findMany({
      include: { tenants: true, property_units: true },
    })
    //Fetch rent_schedules with lease relations
    const rentSchedules = await prisma.rent_schedules.findMany({
      include: { leases: true },
    })
    // Log how long the request took
    const duration = Date.now() - startTime
    console.log(`Dashboard data fetched in ${duration}ms`)
    
    //Add caching header to response
    return new NextResponse(
      JSON.stringify({
         properties,
        propertyUnits,
        tenants,
        leases,
        rentSchedules,

    return NextResponse.json({ properties, units, tenants, leases, rentSchedules })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
