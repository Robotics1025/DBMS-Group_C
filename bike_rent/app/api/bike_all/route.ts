import { PrismaClient } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bikes = await prisma.$queryRaw`
      SELECT b.*, l.LocationName as location_name
      FROM Bike b
      JOIN Location l ON b.LocationID = l.LocationID
    `;

    return NextResponse.json({ success: true, bikes: serializeBigInt(bikes) });
  } catch (err) {
    console.error("GET /api/bike_all error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch bikes." }, { status: 500 });
  }
}
