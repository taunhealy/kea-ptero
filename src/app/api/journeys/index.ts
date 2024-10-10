import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const journeys = await prisma.journey.findMany();
        res.status(200).json(journeys);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch journeys" });
      }
      break;
    case "POST":
      try {
        const { habitName, userId } = req.body;
        const newJourney = await prisma.journey.create({
          data: {
            habitName,
            users: { connect: { id: userId } },
          },
        });
        res.status(201).json(newJourney);
      } catch (error) {
        res.status(500).json({ error: "Failed to create journey" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
