import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateJourneyStatus = async ({
  journeyId,
  success,
}: {
  journeyId: number;
  success: boolean;
}) => {
  const response = await fetch(`/api/journeys/${journeyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "updateStatus", success }),
  });
  if (!response.ok) {
    throw new Error("Failed to update journey status");
  }
  return response.json();
};

const endJourney = async (journeyId: number) => {
  const response = await fetch(`/api/journeys/${journeyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "end" }),
  });
  if (!response.ok) {
    throw new Error("Failed to end journey");
  }
  return response.json();
};

const deleteJourney = async (journeyId: number) => {
  const response = await fetch(`/api/journeys/${journeyId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete journey");
  }
  return response.json();
};

export const useUpdateJourneyStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJourneyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });
};

export const useEndJourney = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endJourney,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });
};

export const useDeleteJourney = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJourney,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });
};
