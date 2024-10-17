import React from "react";
import JourneyCard from "@/components/JourneyCard";
import { Journey } from "@/types/types";

interface JourneyListProps {
  journeys: Journey[];
}

const JourneyList: React.FC<JourneyListProps> = ({ journeys }) => {
  // Sort journeys by creation date (assuming there's a createdAt field)
  const sortedJourneys = [...journeys].sort(
    (a, b) =>
      // @ts-ignore
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedJourneys.length > 0 ? (
        sortedJourneys.map((journey) => (
          <JourneyCard
            key={journey.id}
            id={journey.id}
            habitName={journey.habitName}
            streak={journey.streak}
            lives={journey.lives}
            treatDays={journey.treatDays}
            status={journey.status}
            checkedIn={journey.checkedIn}
            lastCheckedIn={journey.lastCheckedIn}
          />
        ))
      ) : (
        <div className="text-center">
          <p>No journeys to display.</p>
        </div>
      )}
    </div>
  );
};

export default JourneyList;
