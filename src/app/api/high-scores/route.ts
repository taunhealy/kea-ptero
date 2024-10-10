import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { habit } = req.query; // Get the habit filter from query parameters

      const highScores = await prisma.journey.findMany({
        where: habit ? { habitName: habit } : {}, // Apply filter if habit is specified
        orderBy: { streak: "desc" },
        take: 10,
        include: {
          users: {
            select: { name: true },
          },
        },
      });

      const formattedScores = highScores.map((journey) => ({
        id: journey.id,
        userName: journey.users.map((user) => user.name).join(", "),
        streak: journey.streak,
        habitName: journey.habitName,
      }));

      res.status(200).json(formattedScores);
    } catch (error) {
      console.error("Error fetching high scores:", error);
      res.status(500).json({ error: "Error fetching high scores" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
