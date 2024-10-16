import { useQuery } from "@tanstack/react-query";

const fetchJourneys = async () => {
  const response = await fetch("/api/journeys");
  if (!response.ok) {
    throw new Error("Failed to fetch journeys");
  }
  return response.json();
};

const useJourneys = () => {
  return useQuery({
    queryKey: ["journeys"],
    queryFn: fetchJourneys,
  });
};

export default useJourneys;
