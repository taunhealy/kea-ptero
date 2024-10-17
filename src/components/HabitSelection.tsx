import React, { useState } from "react";

interface HabitSelectorProps {
  onHabitChange: (habit: string) => void;
}

const habitOptions = [
  { value: "social_media", label: "Social Media" },
  { value: "coffee", label: "Coffee" },
  { value: "alcohol", label: "Alcohol" },
  { value: "smoking", label: "Smoking" },
  { value: "other", label: "Other" },
];

const HabitSelector: React.FC<HabitSelectorProps> = ({ onHabitChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const habit = e.target.value;
    onHabitChange(habit); // Directly call the prop function with the selected value
  };

  return (
    <div>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select a habit</option>
        {habitOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Add named export for HabitSelector
export { HabitSelector };
