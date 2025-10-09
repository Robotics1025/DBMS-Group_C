import { PrismaClient, Prisma } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { serializeBigInt } from "@/lib/serializer";
import { bikeQueries, executeQuery } from "@/lib/queries";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET /api/bikes - Fetch all bikes for customer dashboard
export async function GET() {
  try {
    const result = await executeQuery(prisma, bikeQueries.getAllBikes, []);
    
    if (!result.success) {
      console.error("Failed to fetch bikes:", result.error);
      return NextResponse.json({ error: "Failed to fetch bikes" }, { status: 500 });
    }

    // The executeQuery function now handles BigInt serialization automatically
    return NextResponse.json(result.data || []);
  } catch (error) {
    console.error("GET bikes error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract fields
    const serial = formData.get("BikeSerialNumber")?.toString() || null;
    const model = formData.get("Model")?.toString() || null;
    const type = formData.get("BikeType")?.toString() || null;
    const status = formData.get("CurrentStatus")?.toString() || null;
    const lastMaintenance = formData.get("LastMaintenanceDate")?.toString() || null;
    const rate = parseFloat(formData.get("RentalRatePerMinute")?.toString() || "0");
    const locationId = parseInt(formData.get("LocationID")?.toString() || "0");

    // Handle image upload
    let uploadedImagePath = "";
    const file = formData.get("bike_image") as File | null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid file type. Only images allowed." }, { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File too large. Max size 5MB." }, { status: 400 });
      }

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);
      uploadedImagePath = `public/uploads/${fileName}`;
    }

    // Insert bike
    try {
      const result = await prisma.$executeRaw`
        INSERT INTO bike
        (BikeSerialNumber, Model, BikeType, CurrentStatus, LastMaintenanceDate, RentalRatePerMinute, LocationID, bike_image)
        VALUES (
          ${serial},
          ${model},
          ${type},
          ${status},
          ${lastMaintenance},
          ${rate},
          ${locationId},
          ${uploadedImagePath}
        )
      `;

      return NextResponse.json({ success: true, result: serializeBigInt(result) });
    } catch (err) {
      // Check for duplicate serial number
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return NextResponse.json(
          { error: "A bike with this serial number already exists." },
          { status: 400 }
        );
      }
      throw err; // Re-throw other errors
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
