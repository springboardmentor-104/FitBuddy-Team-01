import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./ExerciseCard.css";

const ExerciseCard = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/exercises?type=${selectedType}`);
        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="card-list-container">
      <select
        className="dropdown"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">Select exercise type</option>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        {/* Add more options as needed */}
      </select>
      <div className="line"></div>
      <div className="card-list">
        {exercises.map((exercise, index) => (
          <Card key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseCard;
