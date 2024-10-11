import { useQuery } from "@tanstack/react-query";

const fetchJourneyById = async (id: string) => {
  const response = await fetch(`/api/journeys/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch journey");
  }
  return response.json();
};

const useJourney = (id: string) => {
  return useQuery({
    queryKey: ["journey", id],
    queryFn: () => fetchJourneyById(id),
    enabled: !!id, // Only run the query if id is provided
  });
};

export default useJourney;
