import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const journeyId = parseInt(params.id);
  const { success } = await request.json();

  try {
    const journey = await prisma.journey.findUnique({ where: { id: journeyId } });

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    let { streak, lives, treatDays, status } = journey;

    if (success === true) {
      streak += 1;
      if (streak % 14 === 0) {
        treatDays += 1;
      }
    } else if (success === false) {
      lives -= 1;
      if (lives <= 0) {
        status = "completed";
      }
    }

    const updatedJourney = await prisma.journey.update({
      where: { id: journeyId },
      data: { streak, lives, treatDays, status },
    });

    return NextResponse.json(updatedJourney);
  } catch (error) {
    console.error("Error updating journey status:", error);
    return NextResponse.json({ error: "Failed to update journey status" }, { status: 500 });
  }
}
