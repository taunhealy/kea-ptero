"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/api-actions/getServerAuth";

const journeySchema = z.object({
  habitName: z.string().min(1, "Habit name is required"),
  userId: z.string().min(1, "User ID is required"),
});

export async function createJourney(formData: FormData) {
  const { user } = await getServerAuth();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const journeyData = {
    habitName: formData.get("habitName") as string,
    userId: formData.get("userId") as string,
  };

  try {
    const newJourney = await prisma.journey.create({
      data: {
        ...journeyData,
        users: { connect: { id: journeyData.userId } },
      },
    });

    return { success: true, journey: newJourney };
  } catch (error) {
    console.error("Error creating journey:", error);
    return { success: false, error: "Failed to create journey" };
  }
}
