"use server"
import { NextRequest, NextResponse } from "next/server" // Import NextRequest and NextResponse from next/server
import { PrismaClient } from "@/app/generated/prisma";// Import PrismaClient from the generated Prisma client
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient() // Create a new instance of PrismaClient
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const properties = await prisma.properties.findMany({
      include: { owners: true, property_units: true }
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}