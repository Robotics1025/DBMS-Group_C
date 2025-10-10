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

// GET /api/bikes - Fetch all bikes with maintenance information
export async function GET() {
  try {
    // Enhanced query to include maintenance and location information
    const enhancedBikesQuery = `
      SELECT 
        b.BikeID,
        b.BikeSerialNumber,
        b.Model,
        b.BikeType,
        b.CurrentStatus as Status,
        b.LastMaintenanceDate,
        b.RentalRatePerMinute,
        b.bike_image,
        l.LocationName as StationName,
        l.LocationID as StationID,
        CASE 
          WHEN b.CurrentStatus = 'In_Maintenance' THEN 1
          ELSE 0
        END as NeedsMaintenance,
        (SELECT COUNT(*) FROM maintenance m WHERE m.BikeID = b.BikeID) as PendingMaintenance
      FROM bike b
      LEFT JOIN location l ON b.LocationID = l.LocationID
      ORDER BY b.BikeSerialNumber
    `;

    const result = await executeQuery(prisma, enhancedBikesQuery, []);
    
    if (!result.success) {
      console.error("Failed to fetch bikes:", result.error);
      return NextResponse.json({ error: "Failed to fetch bikes" }, { status: 500 });
    }

    // Serialize the bike data with maintenance information
    const bikes = (result.data || []).map((bike: any) => ({
      BikeID: Number(bike.BikeID),
      BikeSerialNumber: bike.BikeSerialNumber,
      Model: bike.Model,
      BikeType: bike.BikeType,
      Status: bike.Status,
      LastMaintenance: bike.LastMaintenanceDate,
      RentalRatePerMinute: Number(bike.RentalRatePerMinute),
      bike_image: bike.bike_image,
      StationName: bike.StationName,
      StationID: bike.StationID ? Number(bike.StationID) : null,
      NeedsMaintenance: Boolean(bike.NeedsMaintenance),
      PendingMaintenance: Number(bike.PendingMaintenance)
    }));

    return NextResponse.json({ 
      success: true, 
      bikes: bikes,
      count: bikes.length
    });
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
