import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExerciseForm.css"; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';

const ExerciseForm = ({ exercise, userId, onClose, fetchUserExercises }) => {
  const [auth] = useAuth();
  const token = auth?.token;

  const [sets, setSets] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sets || !time) {
      setErrors({
        sets: !sets ? "Please enter number of sets" : "",
        time: !time ? "Please enter time to perform exercise" : "",
      });
      return;
    }

    try {
      const exerciseData = [
        {
          userId,
          name: exercise.name,
          key: exercise._id,
          category: exercise.category,
          sets,
          time,
        },
      ];

      const response = await axios.post(
        "http://localhost:8080/api/v1/goal/exercise",
        { exerciseArr: exerciseData },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`, // Add token to Authorization header
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message)
      }        
      fetchUserExercises(auth?.userId)


      // Reset form fields and errors
      setSets("");
      setTime("");
      setErrors({});
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Error submitting exercise data:", error.message);
      toast.error("Failed to submit exercise data. Please try again later.");
    }
  };

  return (<>
  
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
            <label htmlFor="time">Time to Perform Exercise (minutes):</label>
            <input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="exercise-form-input"
            />
            {errors.time && (
              <span className="text-red-500 text-sm">{errors.time}</span>
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
  </>

  );
};

export default ExerciseForm;
