import { PrismaClient } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bikes = await prisma.$queryRaw`
      SELECT 
        b.BikeID AS id,
        b.BikeSerialNumber AS serial,
        b.Model AS name,
        b.BikeType AS type,
        b.CurrentStatus AS status,
        b.LastMaintenanceDate AS lastMaintenance,
        b.RentalRatePerMinute AS rate,
        b.LocationID AS locationId,
        l.LocationName AS locationName,
        b.bike_image AS image
      FROM Bike b
      LEFT JOIN Location l ON b.LocationID = l.LocationID
    `;

    return NextResponse.json({ success: true, bikes: serializeBigInt(bikes) }, { status: 200 });
  } catch (err) {
    console.error("GET /api/bike_all error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bikes." },
      { status: 500 }
    );
  }
}
