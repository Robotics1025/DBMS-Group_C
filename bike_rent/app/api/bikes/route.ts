import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { serializeBigInt } from "@/lib/serializer";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Not needed for formData, but safe
  },
};

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
    const location = parseInt(formData.get("LocationID")?.toString() || "0");

    // Handle file upload
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
      uploadedImagePath = `/uploads/${fileName}`;
    }

    // Insert into MySQL using Prisma raw SQL
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
        ${location},
        ${uploadedImagePath}
      )
    `;

    return NextResponse.json({ success: true, result: serializeBigInt(result) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
