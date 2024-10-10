import React, { useState } from "react";

const habitOptions = [
  { value: "social_media", label: "Social Media" },
  { value: "other", label: "Other" },
];

export default function HabitSelector() {
  const [selectedHabit, setSelectedHabit] = useState("");
  const [customHabit, setCustomHabit] = useState("");

  return (
    <div>
      <select
        value={selectedHabit}
        onChange={(e) => setSelectedHabit(e.target.value)}
      >
        {habitOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedHabit === "other" && (
        <input
          type="text"
          placeholder="Define your habit"
          value={customHabit}
          onChange={(e) => setCustomHabit(e.target.value)}
        />
      )}
    </div>
  );
}
