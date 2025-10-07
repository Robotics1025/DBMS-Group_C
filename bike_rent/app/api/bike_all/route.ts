import { PrismaClient } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";
import * as queries from "@/lib/queries";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const location = url.searchParams.get("location");
    const search = url.searchParams.get("search");

    let bikes;

    if (status) {
      // Filter by status
      bikes = await prisma.$queryRawUnsafe(queries.getBikeByStatus, status);
    } else if (location) {
      // Filter by location
      bikes = await prisma.$queryRawUnsafe(queries.getBikeByLocation, location);
    } else if (search) {
      // Search by model name
      bikes = await prisma.$queryRawUnsafe(queries.getBikeBySearch, `%${search}%`);
    } else {
      // Default: fetch all bikes
      bikes = await prisma.$queryRawUnsafe(queries.getAllBikes);
    }

    return NextResponse.json({
      success: true,
      bikes: serializeBigInt(bikes),
    });
  } catch (err) {
    console.error("GET /api/bikes error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bikes." },
      { status: 500 }
    );
  }
}
