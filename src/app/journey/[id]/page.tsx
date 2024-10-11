import React from "react";
import { useRouter } from "next/router";
import JourneyCard from "@/components/JourneyCard";
import useJourney from "@/hooks/useJourney";

export default function JourneyPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: journey, isLoading, error } = useJourney(id as string); // Use useJourney with id

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Journey Details</h1>
      {journey && (
        <JourneyCard
          id={journey.id}
          habitName={journey.habitName}
          streak={journey.streak}
          lives={journey.lives}
          treatDays={journey.treatDays}
        />
      )}
    </div>
  );
}
