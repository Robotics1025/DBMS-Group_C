import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/queries";

const prisma = new PrismaClient();

// GET /api/bikes/[id] - Fetch a single bike by BikeSerialNumber or BikeID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bikeIdentifier = params.id;

    if (!bikeIdentifier) {
      return NextResponse.json(
        { success: false, error: "Bike identifier is required" },
        { status: 400 }
      );
    }

    // Check if the identifier is a number (BikeID) or string (BikeSerialNumber)
    const isNumericId = /^\d+$/.test(bikeIdentifier);

    // Enhanced query to fetch by either BikeID or BikeSerialNumber
    const bikeQuery = isNumericId 
      ? `
        SELECT 
          b.BikeID,
          b.BikeSerialNumber,
          b.Model,
          b.BikeType,
          b.CurrentStatus,
          b.LastMaintenanceDate,
          b.RentalRatePerMinute,
          b.bike_image,
          b.LocationID,
          l.LocationName,
          l.Address,
          l.City,
          l.PhoneNumber,
          l.Capacity
        FROM bike b
        LEFT JOIN location l ON b.LocationID = l.LocationID
        WHERE b.BikeID = ?
      `
      : `
        SELECT 
          b.BikeID,
          b.BikeSerialNumber,
          b.Model,
          b.BikeType,
          b.CurrentStatus,
          b.LastMaintenanceDate,
          b.RentalRatePerMinute,
          b.bike_image,
          b.LocationID,
          l.LocationName,
          l.Address,
          l.City,
          l.PhoneNumber,
          l.Capacity
        FROM bike b
        LEFT JOIN location l ON b.LocationID = l.LocationID
        WHERE b.BikeSerialNumber = ?
      `;

    const result = await executeQuery(prisma, bikeQuery, [bikeIdentifier]);

    if (!result.success) {
      console.error("Failed to fetch bike:", result.error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch bike" },
        { status: 500 }
      );
    }

    if (!result.data || result.data.length === 0) {
      return NextResponse.json(
        { success: false, error: "Bike not found" },
        { status: 404 }
      );
    }

    const bike = result.data[0];

    // Serialize the bike data
    const serializedBike = {
      BikeID: Number(bike.BikeID),
      BikeSerialNumber: bike.BikeSerialNumber,
      Model: bike.Model,
      BikeType: bike.BikeType,
      CurrentStatus: bike.CurrentStatus,
      LastMaintenanceDate: bike.LastMaintenanceDate,
      RentalRatePerMinute: Number(bike.RentalRatePerMinute),
      bike_image: bike.bike_image,
      LocationID: bike.LocationID ? Number(bike.LocationID) : null,
      LocationName: bike.LocationName,
      Address: bike.Address,
      City: bike.City,
      PhoneNumber: bike.PhoneNumber,
      Capacity: bike.Capacity ? Number(bike.Capacity) : null,
    };

    return NextResponse.json({
      success: true,
      bike: serializedBike,
    });
  } catch (error) {
    console.error("GET bike by ID error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
