"use client";

import React, { createContext, useContext, useState } from 'react';
import { Journey } from '@/types/types';
import { useUpdateJourney } from '@/hooks/useUpdateJourney';

interface CheckInContextType {
  handleCheckIn: (journeyId: number) => Promise<void>;
  handleMissedCheckIn: (journeyId: number, currentLives: number) => Promise<void>;
  pendingJourneyId: number | null;
}

const CheckInContext = createContext<CheckInContextType | undefined>(undefined);

export const CheckInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pendingJourneyId, setPendingJourneyId] = useState<number | null>(null);
  const updateJourney = useUpdateJourney();

  const handleCheckIn = async (journeyId: number) => {
    console.log(`Attempting to check in for journey ID: ${journeyId}`);
    setPendingJourneyId(journeyId);
    try {
      const response = await updateJourney.mutateAsync({
        journeyId,
        success: true,
        lastCheckedIn: new Date(),
      });
      console.log(`Checked in successfully for journey ID: ${journeyId}`);
      return response; // Return the updated journey
    } catch (error) {
      console.error("Error checking in:", error);
      throw error;
    } finally {
      setPendingJourneyId(null);
    }
  };

  const handleMissedCheckIn = async (journeyId: number, currentLives: number) => {
    if (currentLives > 0) {
      console.log(`Missed check-in for journey ID: ${journeyId}. Lives left: ${currentLives}`);
      setPendingJourneyId(journeyId);
      try {
        await updateJourney.mutateAsync({
          journeyId,
          success: false,
          lastCheckedIn: new Date(),
        });
        console.log(`Missed check-in for journey ID: ${journeyId}. Life reduced.`);
      } catch (error) {
        console.error("Error updating journey status:", error);
      } finally {
        setPendingJourneyId(null);
      }
    } else {
      console.log("No lives left to reduce.");
    }
  };

  return (
    <CheckInContext.Provider value={{ handleCheckIn, handleMissedCheckIn, pendingJourneyId }}>
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckIn = () => {
  const context = useContext(CheckInContext);
  if (context === undefined) {
    throw new Error('useCheckIn must be used within a CheckInProvider');
  }
  return context;
};
