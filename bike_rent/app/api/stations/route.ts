import { PrismaClient } from "@/app/generated/prisma"
import { NextResponse } from "next/server"
import { executeQuery } from '@/lib/queries';

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get all stations with current bike counts
    const stationsQuery = `
      SELECT 
        s.StationID,
        s.StationName,
        s.Location,
        s.Capacity,
        COUNT(CASE WHEN b.CurrentStatus IN ('Available', 'Rented') THEN 1 END) as BikeCount,
        COUNT(CASE WHEN b.CurrentStatus = 'Available' THEN 1 END) as AvailableBikes,
        COUNT(CASE WHEN b.CurrentStatus = 'Rented' THEN 1 END) as RentedBikes
      FROM station s
      LEFT JOIN bike b ON s.StationID = b.LocationID
      GROUP BY s.StationID, s.StationName, s.Location, s.Capacity
      ORDER BY s.StationName
    `;

    const result = await executeQuery(prisma, stationsQuery, []);
    
    if (!result.success) {
      console.error("Failed to fetch stations:", result.error);
      return NextResponse.json({ 
        success: false, 
        error: "Failed to fetch stations" 
      }, { status: 500 });
    }

    // Serialize the station data
    const stations = (result.data || []).map((station: any) => ({
      StationID: Number(station.StationID),
      StationName: station.StationName,
      Location: station.Location,
      Capacity: Number(station.Capacity) || 0,
      BikeCount: Number(station.BikeCount) || 0,
      AvailableBikes: Number(station.AvailableBikes) || 0,
      RentedBikes: Number(station.RentedBikes) || 0
    }));

    return NextResponse.json({ 
      success: true, 
      stations: stations,
      count: stations.length
    });
  } catch (error) {
    console.error("GET stations error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}

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
