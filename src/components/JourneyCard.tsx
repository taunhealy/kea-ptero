import React from "react";
import { Journey } from "@/types/types";

const JourneyCard: React.FC<Journey> = ({
  habitName,
  streak,
  lives,
  treatDays,
}) => {
  return (
    <div className="max-w-sm cursor-pointer overflow-hidden rounded bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{habitName}</div>
        <p className="text-base text-gray-700">
          <strong>Streak:</strong> {streak} days
        </p>
        <p className="text-base text-gray-700">
          <strong>Lives:</strong> {lives}
        </p>
        <p className="text-base text-gray-700">
          <strong>Treat Days:</strong> {treatDays}
        </p>
      </div>
      <div className="px-6 pb-2 pt-4">
        {lives > 0 ? (
          <span className="mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-700">
            Active
          </span>
        ) : (
          <span className="mr-2 inline-block rounded-full bg-red-200 px-3 py-1 text-sm font-semibold text-red-700">
            Game Over
          </span>
        )}
      </div>
    </div>
  );
};

export default JourneyCard;
