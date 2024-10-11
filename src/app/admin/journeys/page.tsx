"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import JourneyCard from "@/components/JourneyCard";
import { Journey } from "@/types/types";

const fetchJourneys = async () => {
  const response = await fetch("/api/journeys");
  if (!response.ok) {
    throw new Error("Failed to fetch journeys");
  }
  return response.json();
};

export default function AdminJourneysPage() {
  const {
    data: journeys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["journeys"],
    queryFn: fetchJourneys,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories = Array.from(
    new Set(
      journeys.flatMap((journey: any) =>
        journey.categories.map(JSON.stringify),
      ),
    ),
  ).map((category: unknown) => JSON.parse(category as string));

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Journey Details</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((journey: Journey) => (
          <JourneyCard
            key={journey.id}
            id={journey.id}
            habitName={journey.habitName}
            streak={journey.streak}
            lives={journey.lives}
            treatDays={journey.treatDays}
          />
        ))}
      </div>
    </div>
  );
}
