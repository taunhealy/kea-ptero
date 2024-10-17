"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HabitSelector } from "@/components/HabitSelection"; // Import the HabitSelector
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function CreateJourneyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedHabit, setSelectedHabit] = useState("");
  const [customHabit, setCustomHabit] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleHabitChange = (habit: string) => {
    console.log("Habit selected:", habit);
    setSelectedHabit(habit);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!session) {
      setError("You must be logged in to create a journey");
      return;
    }

    if (!selectedHabit) {
      setError("Please select a habit.");
      return;
    }

    const habitName = selectedHabit === "other" ? customHabit : selectedHabit;

    if (selectedHabit === "other" && !customHabit) {
      setError("Please enter a custom habit.");
      return;
    }

    console.log("Request Body:", JSON.stringify({ habitName }));

    try {
      const response = await fetch("/api/journeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData); // Log the error data
        setError(errorData.error || "Failed to create journey");
        return;
      }

      const journey = await response.json();
      router.push(`/admin/journeys/${journey.id}`);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  console.log("Selected Habit:", selectedHabit);

  return (
    <Card className="mx-auto mt-8 max-w-md bg-white text-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="habitName" className="text-gray-700">
              Habit
            </Label>
            <HabitSelector onHabitChange={handleHabitChange} />{" "}
            {/* Use HabitSelector */}
          </div>
          {selectedHabit === "other" && (
            <div className="mb-4">
              <Label htmlFor="customHabit" className="text-gray-700">
                Custom Habit
              </Label>
              <Input
                id="customHabit"
                value={customHabit}
                onChange={(e) => setCustomHabit(e.target.value)}
                required
                className="mt-1 text-gray-800"
                placeholder="Enter your custom habit"
              />
            </div>
          )}
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <CardFooter className="px-0">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Create Journey
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
