import { PrismaClient, Prisma } from "@/app/generated/prisma";
import { serializeBigInt } from "@/lib/serializer";
import { NextResponse } from "next/server";
import * as queries from "@/lib/queries";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let bikes;

    if (status && search) {
      bikes = await prisma.$queryRaw(
        Prisma.sql([queries.getBikeByStatusAndSearch]),
        status,
        `%${search}%`
      );
    } else if (status) {
      bikes = await prisma.$queryRaw(
        Prisma.sql([queries.getBikeByStatus]),
        status
      );
    } else if (search) {
      bikes = await prisma.$queryRaw(
        Prisma.sql([queries.getBikeBySearch]),
        `%${search}%`
      );
    } else {
      bikes = await prisma.$queryRaw(Prisma.sql([queries.getAllBikes]));
    }

    return NextResponse.json(serializeBigInt(bikes));
  } catch (error) {
    console.error("Error fetching bikes:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
