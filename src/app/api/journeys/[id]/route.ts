import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const journey = await prisma.journey.findUnique({
      where: { id: Number(id) },
    });
    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }
    return NextResponse.json(journey);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch journey" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { action, ...data } = await request.json();

  try {
    let updatedJourney;

    switch (action) {
      case "update":
        updatedJourney = await prisma.journey.update({
          where: { id: Number(id) },
          data: data,
        });
        break;
      case "updateStatus":
        updatedJourney = await prisma.journey.update({
          where: { id: Number(id) },
          data: {
            streak: data.success ? { increment: 1 } : data.streak,
            lives: data.success ? data.lives : { decrement: 1 },
            treatDays: data.success && (data.streak + 1) % 14 === 0 ? { increment: 1 } : data.treatDays,
            status: data.lives <= 1 && !data.success ? "completed" : "active",
          },
        });
        break;
      case "end":
        updatedJourney = await prisma.journey.update({
          where: { id: Number(id) },
          data: { status: "completed" },
        });
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(updatedJourney);
  } catch (error) {
    console.error("Error updating journey:", error);
    return NextResponse.json({ error: "Failed to update journey" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.journey.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Journey deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting journey:", error);
    return NextResponse.json({ error: "Failed to delete journey" }, { status: 500 });
  }
}
