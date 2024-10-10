import React from "react";
import { useJourneys } from "@/hooks/useJourneys";
import { useUpdateJourney } from "@/hooks/useUpdateJourney";
import JourneyCard from "@/components/JourneyCard";
import { UpdateJourneyParams } from "@/hooks/useUpdateJourney";

interface Journey {
  id: string;
  habitName: string;
  streak: number;
  lives: number;
  treatDays: number;
}

export default function JourneyList() {
  const { data: journeys, isLoading, error } = useJourneys();
  const updateJourney = useUpdateJourney();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCheckIn = (journeyId: string, success: boolean) => {
    const journeyData: UpdateJourneyParams = {
      journeyId: 'someId', // Replace 'someId' with the actual journey ID
      success: true,       // Set this to the appropriate value
      // Add any other required properties here
    };

    updateJourney.mutate(journeyData);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Journey Details</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((journey: Journey) => (
          <JourneyCard
            key={journey.id}
            habitName={journey.habitName}
            streak={journey.streak}
            lives={journey.lives}
            treatDays={journey.treatDays}
            onClick={() => handleCheckIn(journey.id, true)} // Example check-in
          />
        ))}
      </div>
    </div>
  );
}
