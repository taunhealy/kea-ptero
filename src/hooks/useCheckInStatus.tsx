"use client";

import { useState, useEffect } from "react";

export const useCheckInStatus = (journeyId: number, lastCheckedIn: Date) => {
  const [checkInStatus, setCheckInStatus] = useState<"pending" | "success">(
    "pending",
  );

  const updateJourneyStatus = async (journeyId: number, success: boolean) => {
    const response = await fetch("/api/updateJourneyStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ journeyId, success }),
    });
    if (!response.ok) {
      throw new Error("Failed to update journey status");
    }
    return response.json();
  };

  useEffect(() => {
    const updateCheckInStatus = async () => {
      const today = new Date().setHours(0, 0, 0, 0);
      const lastCheckedInDay = new Date(lastCheckedIn).setHours(0, 0, 0, 0);

      if (lastCheckedInDay === today) {
        setCheckInStatus("success");
      } else {
        // User hasn't checked in today, they lose a life
        try {
          await updateJourneyStatus(journeyId, false);
          setCheckInStatus("pending");
        } catch (error) {
          console.error("Failed to update journey status:", error);
          // Handle error appropriately
        }
      }
    };

    updateCheckInStatus();
  }, [journeyId, lastCheckedIn]);

  return { checkInStatus };
};
