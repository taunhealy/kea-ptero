import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import JourneyCard from "@/components/JourneyCard";

const fetchJourneyById = async (id) => {
  const response = await fetch(`/api/journeys/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch journey");
  }
  return response.json();
};

export default function JourneyPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: journey, isLoading, error } = useQuery(
    ["journey", id],
    () => fetchJourneyById(id),
    { enabled: !!id }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Journey Details</h1>
      {journey && (
        <JourneyCard
          habitName={journey.habitName}
          streak={journey.streak}
          lives={journey.lives}
          treatDays={journey.treatDays}
        />
      )}
    </div>
  );
}
