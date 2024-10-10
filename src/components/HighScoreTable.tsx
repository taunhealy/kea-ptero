import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const habitOptions = ["Social Media", "Other"];

// Define the type for a high score
interface HighScore {
  id: string;
  userName: string;
  streak: number;
  habitName: string;
  score: number;
}

export default function HighScoreTable() {
  const [selectedHabit, setSelectedHabit] = useState("");

  const fetchHighScores = async () => {
    const response = await fetch(
      `/api/high-scores${selectedHabit ? `?habit=${selectedHabit}` : ""}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch high scores");
    }
    return response.json();
  };

  const {
    data: highScores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["highScores", selectedHabit],
    queryFn: fetchHighScores,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <select
        onChange={(e) => setSelectedHabit(e.target.value)}
        value={selectedHabit}
      >
        <option value="">All</option>
        {habitOptions.map((habit) => (
          <option key={habit} value={habit}>
            {habit}
          </option>
        ))}
      </select>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">User</th>
            <th className="py-2">Streak</th>
            <th className="py-2">Habit</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score: HighScore, index: number) => (
            <tr key={score.id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{score.userName}</td>
              <td className="py-2">{score.streak}</td>
              <td className="py-2">{score.habitName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
