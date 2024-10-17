import { useState, useEffect } from "react";
import { CHECK_IN_TIME } from "@/constants/checkIn";
import { updateJourneyStatus } from "@/services/JourneyOperations";

export const useCheckInStatus = (journeyId: number, streak: number) => {
  const [checkInStatus, setCheckInStatus] = useState<"pending" | "success">(
    "pending",
  );

  useEffect(() => {
    const updateCheckInStatus = async () => {
      const now = new Date();
      const [hours = 0, minutes = 0] = CHECK_IN_TIME.split(":").map(Number); // Provide default values
      const checkInDeadline = new Date(now);
      checkInDeadline.setHours(hours, minutes, 0, 0);

      const today = new Date().setHours(0, 0, 0, 0);
      const streakDate = new Date(
        Date.now() - streak * 24 * 60 * 60 * 1000,
      ).setHours(0, 0, 0, 0);

      if (streakDate === today) {
        setCheckInStatus("success");
      } else if (now > checkInDeadline) {
        // Missed check-in, update journey status
        await updateJourneyStatus(journeyId, null);
        setCheckInStatus("pending"); // Reset to pending for next day
      } else {
        setCheckInStatus("pending");
      }
    };

    updateCheckInStatus();
    const interval = setInterval(updateCheckInStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [journeyId, streak]);

  return checkInStatus;
};
