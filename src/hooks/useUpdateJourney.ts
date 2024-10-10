import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJourneyStatus } from "@/services/JourneyOperations";

export interface UpdateJourneyParams {
  journeyId: string;
  success: boolean;
}

export const useUpdateJourney = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ journeyId, success }: UpdateJourneyParams) => {
      await updateJourneyStatus(journeyId, success);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journeys"] });
    },
  });

  return mutation;
};
