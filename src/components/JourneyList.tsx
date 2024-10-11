import React from "react";
import useJourneys from "@/hooks/useJourneys"; // Updated import
import JourneyCard from "@/components/JourneyCard";
import { Journey } from "@/types/types";

export default function JourneyList() {
  const { data: journeys, isLoading, error } = useJourneys(); // Updated hook

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter journeys based on their status
  const activeJourneys = journeys.filter(
    (journey: Journey) => journey.status === "active",
  );
  const completedJourneys = journeys.filter(
    (journey: Journey) => journey.status === "completed",
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Active Journeys</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeJourneys.map((journey: Journey) => (
          <JourneyCard
            key={journey.id}
            id={journey.id}
            status={journey.status} // Add this line to include the status property
            habitName={journey.habitName}
            streak={journey.streak}
            lives={journey.lives}
            treatDays={journey.treatDays}
          />
        ))}
      </div>
      <h1 className="mb-6 text-3xl font-bold">Completed Journeys</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {completedJourneys.map((journey: Journey) => (
          <JourneyCard
            key={journey.id}
            id={journey.id}
            status={journey.status}
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
