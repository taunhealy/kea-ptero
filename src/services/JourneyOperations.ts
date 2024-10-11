import { prisma } from "@/lib/prisma";

export async function updateJourneyStatus(journeyId: string, success: boolean) {
  const journey = await prisma.journey.findUnique({ where: { id: journeyId } });

  if (!journey) {
    throw new Error("Journey not found");
  }

  let { streak, lives, treatDays, status } = journey;

  if (success) {
    streak += 1;
    if (streak % 14 === 0) {
      treatDays += 1;
    }
  } else {
    lives -= 1;
    if (lives <= 0) {
      status = "completed"; // Mark as completed if lives are exhausted
    }
  }

  await prisma.journey.update({
    where: { id: journeyId },
    data: { streak, lives, treatDays, status },
  });
}
