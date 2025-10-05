import { PrismaClient } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface StationBikeRow {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  capacity: number;
  bikeId: number | null;
  serial: string | null;
  bikeName: string | null;
  type: string | null;
  status: string | null;
  image: string | null;
}

interface StationSummary {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  capacity: number;
  available: number;
  rented: number;
  maintenance: number;
  utilization: number; // %
}

export async function GET() {
  try {
    // Fetch all locations with their bikes using LEFT JOIN
    const stationsWithBikes = await prisma.$queryRaw<StationBikeRow[]>`
      SELECT 
        l.LocationID AS id,
        l.LocationName AS name,
        l.Address AS address,
        l.City AS city,
        l.PhoneNumber AS phone,
        l.Capacity AS capacity,
        b.BikeID AS bikeId,
        b.BikeSerialNumber AS serial,
        b.Model AS bikeName,
        b.BikeType AS type,
        b.CurrentStatus AS status,
        b.bike_image AS image
      FROM location l
      LEFT JOIN bike b
        ON l.LocationID = b.LocationID
    `;

    // Map stations with counters
    const stationsMap: Record<number, StationSummary> = {};

    stationsWithBikes.forEach((row) => {
      const locId = row.id;
      if (!stationsMap[locId]) {
        stationsMap[locId] = {
          id: row.id,
          name: row.name,
          address: row.address,
          city: row.city,
          phone: row.phone,
          capacity: Number(row.capacity),
          available: 0,
          rented: 0,
          maintenance: 0,
          utilization: 0,
        };
      }

      if (row.status) {
        const status = row.status.toLowerCase();
        if (status === "available") stationsMap[locId].available++;
        else if (status === "rented") stationsMap[locId].rented++;
        else if (status === "maintenance") stationsMap[locId].maintenance++;
      }
    });

    // Compute utilization %
    const stations: StationSummary[] = Object.values(stationsMap).map((s) => ({
      ...s,
      utilization: s.capacity
        ? Math.round(((s.rented + s.maintenance) / s.capacity) * 100)
        : 0,
    }));

    return NextResponse.json(
      { success: true, stations: serializeBigInt(stations) },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/station_bikes error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stations and bikes." },
      { status: 500 }
    );
  }
}
