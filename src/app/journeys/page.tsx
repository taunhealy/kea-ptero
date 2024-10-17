"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import JourneyList from "@/components/JourneyList";
import { Journey } from "@/types/types";
import { CheckInProvider } from "@/contexts/CheckInContext";

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
  } = useQuery<Journey[]>({
    queryKey: ["journeys"],
    queryFn: fetchJourneys,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CheckInProvider>
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold">Journey Details</h1>
        <JourneyList journeys={journeys ?? []} />
      </div>
    </CheckInProvider>
  );
}
