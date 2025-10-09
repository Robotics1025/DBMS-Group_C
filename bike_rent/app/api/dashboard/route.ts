
// app/api/dashboard/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
import { executeQuery } from "@/lib/queries"
import { serializeBigInt } from "@/lib/serializer"

const prisma = new PrismaClient()

/**
 * GET /api/dashboard
 * Returns aggregated data for the bike rental dashboard
 */
export async function GET() {
  try {
    const startTime = Date.now()

    // Get bike statistics
    const bikeStatsQuery = `
      SELECT 
        COUNT(*) as total_bikes,
        SUM(CASE WHEN CurrentStatus = 'Available' THEN 1 ELSE 0 END) as available_bikes,
        SUM(CASE WHEN CurrentStatus = 'Rented' THEN 1 ELSE 0 END) as rented_bikes,
        SUM(CASE WHEN CurrentStatus = 'Maintenance' THEN 1 ELSE 0 END) as maintenance_bikes
      FROM bike
    `;

    // Get user statistics
    const userStatsQuery = `
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN Role = 'Customer' THEN 1 ELSE 0 END) as customers,
        SUM(CASE WHEN Role = 'Staff' THEN 1 ELSE 0 END) as staff,
        SUM(CASE WHEN Role = 'Administrator' THEN 1 ELSE 0 END) as admins
      FROM user
    `;

    // Get location statistics  
    const locationStatsQuery = `
      SELECT COUNT(*) as total_locations FROM location
    `;

    // Execute queries
    const bikeStatsResult = await executeQuery(prisma, bikeStatsQuery);
    const userStatsResult = await executeQuery(prisma, userStatsQuery); 
    const locationStatsResult = await executeQuery(prisma, locationStatsQuery);

    // Check if queries were successful
    if (!bikeStatsResult.success || !userStatsResult.success || !locationStatsResult.success) {
      throw new Error('Failed to execute dashboard queries');
    }

    const duration = Date.now() - startTime
    console.log(`Dashboard data fetched in ${duration}ms`)

    return NextResponse.json({
      success: true,
      data: {
        bikes: bikeStatsResult.data[0] || {},
        users: userStatsResult.data[0] || {},
        locations: locationStatsResult.data[0] || {},
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
