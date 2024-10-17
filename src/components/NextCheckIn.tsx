import React from 'react';

interface NextCheckInProps {
  nextCheckInTime: string;
}

const NextCheckIn: React.FC<NextCheckInProps> = ({ nextCheckInTime }) => {
  if (!nextCheckInTime) return null;

  return (
    <div className="mb-4 text-xl font-semibold">
      Next check-in time: {nextCheckInTime}
    </div>
  );
};

export default NextCheckIn;
