import React from "react";
import { Journey } from "@/types/types";
import CheckIn from "./CheckIn";
import { useCheckInStatus } from "@/hooks/useCheckInStatus";
import { Button } from "@/components/ui/button";
import {
  useUpdateJourneyStatus,
  useEndJourney,
  useDeleteJourney,
} from "../hooks/useJourneyActions";

const JourneyCard: React.FC<Journey> = (journey) => {
  const daysUntilTreat = 14 - (journey.streak % 14);
  const checkInStatus = useCheckInStatus(journey.id, new Date());
  const updateJourneyStatus = useUpdateJourneyStatus();
  const endJourneyMutation = useEndJourney();
  const deleteJourneyMutation = useDeleteJourney();

  const handleCheckIn = (success: boolean) => {
    updateJourneyStatus.mutate({ journeyId: journey.id, success });
  };

  const handleEndJourney = () => {
    if (confirm("Are you sure you want to end this journey?")) {
      endJourneyMutation.mutate(journey.id);
    }
  };

  const handleDeleteJourney = () => {
    if (
      confirm(
        "Are you sure you want to delete this journey? This action cannot be undone.",
      )
    ) {
      deleteJourneyMutation.mutate(journey.id);
    }
  };

  return (
    <div className="max-w-sm overflow-hidden rounded bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{journey.habitName}</div>
        <p className="text-base text-gray-700">
          <strong>Streak:</strong> {journey.streak} days
        </p>
        <p className="text-base text-gray-700">
          <strong>Lives:</strong> {journey.lives}
        </p>
        <p className="text-base text-gray-700">
          <strong>Treat Days:</strong> {journey.treatDays}
        </p>
        <p className="text-base text-gray-700">
          <strong>Days Until Treat:</strong> {daysUntilTreat}
        </p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <CheckIn journey={journey} checkInStatus={checkInStatus} />
        <Button
          onClick={handleEndJourney}
          className="mr-2 mt-2 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          End Journey
        </Button>
        <Button
          onClick={handleDeleteJourney}
          className="mt-2 bg-red-500 text-white hover:bg-red-600"
        >
          Delete Journey
        </Button>
      </div>
    </div>
  );
};

export default JourneyCard;
