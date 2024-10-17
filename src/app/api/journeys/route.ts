import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const journeySchema = z.object({
  habitName: z.string().min(1, "Habit name is required"),
});

// Handle GET requests
export async function GET() {
  try {
    const journeys = await prisma.journey.findMany();

    const journeysWithCheckedInStatus = journeys.map((journey) => {
      const lastCheckedIn = new Date(journey.lastCheckedIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Set to beginning of day for comparison
      const checkedIn = lastCheckedIn >= today;

      return {
        ...journey,
        checkedIn,
      };
    });

    return NextResponse.json(journeysWithCheckedInStatus);
  } catch (error) {
    console.error("Error fetching journeys:", error);
    return NextResponse.json(
      { error: "Failed to fetch journeys" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("Received data:", body);
    const validatedFields = journeySchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { habitName } = validatedFields.data;

    const newJourney = await prisma.journey.create({
      data: {
        habitName,
        users: { connect: { id: session.user.id } },
        lastCheckedIn: new Date(0),  // Set this to a past date
      },
    });

    return NextResponse.json(newJourney, { status: 201 });
  } catch (error) {
    console.error("Error creating journey:", error);
    return NextResponse.json(
      { error: "Failed to create journey" },
      { status: 500 },
    );
  }
}
