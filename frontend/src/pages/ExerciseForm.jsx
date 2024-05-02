import React, { useState } from "react";
import "./ExerciseForm.css";

const ExerciseForm = ({ exerciseName, onClose }) => {
  const [sets, setSets] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sets || !duration || !day) {
      const newErrors = {};
      if (!sets) newErrors.sets = "Please enter number of sets";
      if (!duration) newErrors.duration = "Please enter duration";
      if (!day) newErrors.day = "Please select day";
      setErrors(newErrors);
      return;
    }
    console.log("Form submitted:", { sets, duration, day });
    setSets("");
    setDuration("");
    setDay("");
    setErrors({});
    alert("Login Successfully");
  };

  return (
    <div className="exercise-form-overlay">
      <div className="exercise-form-container">
        <button className="exercise-form-close" onClick={onClose}>X</button>
        <h2 className="exercise-form-title">
          Enter {exerciseName} Set Data
        </h2>
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
            <label htmlFor="duration">Duration of Each Set (minutes):</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="exercise-form-input"
            />
            {errors.duration && (
              <span className="text-red-500 text-sm">{errors.duration}</span>
            )}
          </div>
          <div>
            <label htmlFor="day">Select Day:</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="exercise-form-input"
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            {errors.day && (
              <span className="text-red-500 text-sm">{errors.day}</span>
            )}
          </div>
          <button type="submit" className="exercise-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
