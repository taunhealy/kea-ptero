import React from "react";
import { useCheckIn } from "@/contexts/CheckInContext";
import { Button } from "@/components/ui/button";
import { Journey } from "@/types/types";

interface CheckInProps {
  journey: Journey;
}

const CheckIn: React.FC<CheckInProps> = ({ journey }) => {
  const { handleCheckIn, handleMissedCheckIn, pendingJourneyId } = useCheckIn();

  return (
    <div className="mt-2 flex gap-2">
      <Button
        onClick={() => handleCheckIn(journey.id)}
        className={`bg-green-500 text-white hover:bg-green-600 ${pendingJourneyId === journey.id ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={pendingJourneyId === journey.id}
      >
        {pendingJourneyId === journey.id ? "Checking In..." : "Check In"}
      </Button>
      <Button
        onClick={() => handleMissedCheckIn(journey.id, journey.lives)}
        className={`bg-red-500 text-white hover:bg-red-600 ${pendingJourneyId === journey.id ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={pendingJourneyId === journey.id}
      >
        Missed Check-In
      </Button>
    </div>
  );
};

export default CheckIn;
