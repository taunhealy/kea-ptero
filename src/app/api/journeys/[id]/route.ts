import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const journey = await prisma.journey.findUnique({
          where: { id: Number(id) },
        });
        if (!journey) {
          return res.status(404).json({ error: "Journey not found" });
        }
        res.status(200).json(journey);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch journey" });
      }
      break;
    case "PUT":
      try {
        const { habitName, streak, lives, treatDays } = req.body;
        const updatedJourney = await prisma.journey.update({
          where: { id: Number(id) },
          data: { habitName, streak, lives, treatDays },
        });
        res.status(200).json(updatedJourney);
      } catch (error) {
        res.status(500).json({ error: "Failed to update journey" });
      }
      break;
    case "DELETE":
      try {
        await prisma.journey.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete journey" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
