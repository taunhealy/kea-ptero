import { useState, useEffect } from 'react';
import { CHECK_IN_TIME } from '@/constants/checkIn';

export const useNextCheckIn = () => {
  const [nextCheckInTime, setNextCheckInTime] = useState<string>("");

  useEffect(() => {
    const calculateNextCheckIn = () => {
      const now = new Date();
      const [hours, minutes] = CHECK_IN_TIME.split(':').map(Number) as [number, number];
      const checkInTime = new Date(now);
      checkInTime.setHours(hours, minutes, 0, 0);

      if (now > checkInTime) {
        checkInTime.setDate(checkInTime.getDate() + 1);
      }

      return checkInTime;
    };

    const updateNextCheckIn = () => {
      const nextCheckIn = calculateNextCheckIn();
      setNextCheckInTime(nextCheckIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const timeUntilNextCheckIn = nextCheckIn.getTime() - Date.now();
      setTimeout(updateNextCheckIn, timeUntilNextCheckIn);
    };

    updateNextCheckIn();

    return () => {
      // Clean up any pending timeouts
    };
  }, []);

  return nextCheckInTime;
};
