import React from "react";
import JourneyCard from "@/components/JourneyCard";
import { Journey } from "@/types/types";

interface JourneyListProps {
  journeys: Journey[];
}

const JourneyList: React.FC<JourneyListProps> = ({ journeys }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {journeys.length > 0 ? (
        journeys.map((journey) => (
          <JourneyCard
            key={journey.id}
            id={journey.id}
            habitName={journey.habitName}
            streak={journey.streak}
            lives={journey.lives}
            treatDays={journey.treatDays}
            status={journey.status}
            checkedIn={journey.checkedIn}
            lastCheckedIn={journey.lastCheckedIn} // Add this line
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
