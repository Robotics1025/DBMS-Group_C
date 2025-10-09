import { PrismaClient } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";
import { bikeQueries, executeQuery } from "@/lib/queries";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const location = url.searchParams.get("location");
    const search = url.searchParams.get("search");

    let bikes;

    if (status === "Available") {
      // Get available bikes
      const result = await executeQuery(prisma, bikeQueries.getAvailableBikes);
      bikes = result.data;
    } else if (location) {
      // For location filtering, use getAllBikes and filter in code
      const result = await executeQuery(prisma, bikeQueries.getAllBikes);
      bikes = result.data?.filter((bike: any) => 
        bike.LocationName?.toLowerCase().includes(location.toLowerCase())
      );
    } else if (search) {
      // For search, use getAllBikes and filter by model/type
      const result = await executeQuery(prisma, bikeQueries.getAllBikes);
      bikes = result.data?.filter((bike: any) => 
        bike.Model?.toLowerCase().includes(search.toLowerCase()) ||
        bike.BikeType?.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      // Default: fetch all bikes
      const result = await executeQuery(prisma, bikeQueries.getAllBikes);
      bikes = result.data;
    }

    return NextResponse.json({
      success: true,
      bikes: serializeBigInt(bikes || []),
    });
  } catch (err) {
    console.error("GET /api/bikes error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bikes." },
      { status: 500 }
    );
  }
}
