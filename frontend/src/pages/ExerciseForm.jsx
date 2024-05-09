import React, { useState } from "react";
import axios from "axios";
import "./ExerciseForm.css"; // Import the CSS file

const ExerciseForm = ({ exercise, userId, onClose }) => {
  const [sets, setSets] = useState("");
  const [timeToPerformExercise, setTimeToPerformExercise] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sets || !timeToPerformExercise) {
      setErrors({
        sets: !sets ? "Please enter number of sets" : "",
        timeToPerformExercise: !timeToPerformExercise
          ? "Please enter time to perform exercise"
          : "",
      });
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      const formData = {
        userId,
        name: exercise.name,
        category: exercise.category,
        sets: parseInt(sets),
        timeToPerformExercise: parseInt(timeToPerformExercise),
        date: currentDate,
      };
      
      const response = await axios.post(
        "http://localhost:8080/api/exercises/userSelectExercises",
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit exercise data');
      }

      // Reset form fields and errors
      setSets("");
      setTimeToPerformExercise("");
      setErrors({});

      // Show success message
      alert("Exercise data submitted successfully");

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error submitting exercise data:", error.message);
      // Show error message
      alert("Failed to submit exercise data. Please try again later.");
    }
  };

  return (
    <div className="exercise-form-overlay">
      <div className="exercise-form-container">
        <h2 className="exercise-form-title">Enter {exercise.name} Set Data</h2>
        <form onSubmit={handleSubmit} className="exercise-form">
          <div>
            <label htmlFor="sets">Number of Sets:</label>
            <input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="exercise-form-input"
            />
            {errors.sets && (
              <span className="text-red-500 text-sm">{errors.sets}</span>
            )}
          </div>
          <div>
            <label htmlFor="timeToPerformExercise">Time to Perform Exercise (minutes):</label>
            <input
              id="timeToPerformExercise"
              type="number"
              value={timeToPerformExercise}
              onChange={(e) => setTimeToPerformExercise(e.target.value)}
              className="exercise-form-input"
            />
            {errors.timeToPerformExercise && (
              <span className="text-red-500 text-sm">{errors.timeToPerformExercise}</span>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          &ensp;
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
