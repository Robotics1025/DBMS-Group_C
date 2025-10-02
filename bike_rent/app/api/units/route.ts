import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const units = await prisma.property_units.findMany({
        include: { properties: true, leases: true },
      });
      return res.status(200).json(units);
    }

    if (req.method === "POST") {
      const { property_id, unit_number, bedrooms, bathrooms, has_store, rent_amount, status } = req.body;

      const newUnit = await prisma.property_units.create({
        data: { property_id, unit_number, bedrooms, bathrooms, has_store, rent_amount, status },
      });

      return res.status(201).json(newUnit);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to process request" });
  }
}
