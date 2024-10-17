import React from "react";
import { useCheckIn } from "@/contexts/CheckInContext";
import { Button } from "@/components/ui/button";
import { Journey } from "@/types/types";

interface CheckInProps {
  journey: Journey;
  checkInStatus: {
    checkInStatus: "pending" | "success";
  };
}

const CheckIn: React.FC<CheckInProps> = ({ journey, checkInStatus }) => {
  const { handleCheckIn, pendingJourneyId } = useCheckIn();

  const isCheckedIn = checkInStatus.checkInStatus === "success";
  const isLoading = pendingJourneyId === journey.id;

  const handleClick = async () => {
    if (!isCheckedIn) {
      await handleCheckIn(journey.id);
    }
  };

  return (
    <div className="mt-2">
      <Button
        onClick={handleClick}
        className={`bg-green-500 text-white hover:bg-green-600 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        } ${isCheckedIn ? "bg-gray-500 hover:bg-gray-600" : ""}`}
        disabled={isLoading || isCheckedIn}
      >
        {isLoading ? "Checking In..." : isCheckedIn ? "Checked In" : "Check In"}
      </Button>
    </div>
  );
};

export default CheckIn;
