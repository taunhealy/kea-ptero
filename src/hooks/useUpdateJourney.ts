import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateJourneyParams {
  journeyId: number;
  success: boolean;
  lastCheckedIn: Date;
}

export const useUpdateJourney = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ journeyId, success }: UpdateJourneyParams) => {
      const response = await fetch(`/api/journeys/${journeyId}/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success }),
      });
      if (!response.ok) {
        throw new Error('Failed to update journey status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });

  return mutation;
};
