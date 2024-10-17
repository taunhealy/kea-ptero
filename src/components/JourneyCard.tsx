import React from "react";
import { Journey } from "@/types/types";
import CheckIn from "./CheckIn";

const JourneyCard: React.FC<Journey> = (journey) => {
  const daysUntilTreat = 14 - (journey.streak % 14);

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
        <CheckIn journey={journey} />
      </div>
    </div>
  );
};

export default JourneyCard;
