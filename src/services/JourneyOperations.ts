import { prisma } from "@/lib/prisma";

export async function updateJourneyStatus(
  journeyId: number,
  success: boolean | null,
) {
  const journey = await prisma.journey.findUnique({ where: { id: journeyId } });

  if (!journey) {
    throw new Error("Journey not found");
  }

  let { streak, lives, treatDays, status } = journey;

  if (success === true) {
    streak += 1;
    if (streak % 14 === 0) {
      treatDays += 1;
    }
  } else if (success === false || success === null) {
    lives -= 1;
    if (lives <= 0) {
      status = "completed"; // Use a string value instead of a number
    }
  }

  await prisma.journey.update({
    where: { id: journeyId },
    data: { streak, lives, treatDays, status },
  });
}
