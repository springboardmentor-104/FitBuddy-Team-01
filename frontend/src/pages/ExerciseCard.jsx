import React from "react";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const ExerciseCard = ({ exercise, onAdd, userId, userExercises, token, fetchUserExercises }) => {
  const { _id, name, photo, category } = exercise;

  // Check if the exercise ID is in the userExercises list
  const isExerciseAdded = userExercises.some(userExercise => userExercise.key === _id);

  const handleAddButtonClick = () => {
    onAdd(name, _id, category, userId); // Pass exercise name, ID, category, and userId to ExercisePage
  };
  const handleRemoveButtonClick = async () => {
    try {
      // Find the exercise object from userExercises with matching _id
      const userExercise = userExercises.find(userExercise => userExercise.key === _id);
      const res = await axios.delete(`http://localhost:8080/api/v1/goal/exercise/${userExercise.goalId}`, {
        headers: {
          "Authorization": `${token}`, // Add token to Authorization header
        }
      });
      toast.success("Exercise deleted successfully");
      setTimeout(() => {
        fetchUserExercises(userId); // Update the user's exercises after deletion
      }, 1000);
      
    } catch (error) {
      console.error("Error deleting exercise:", error);
      toast.error("Failed to delete exercise");
    }
  };
  return (<>
    <div className="exercise-card">
      <Link to={`/SingleExercisePage/${_id}`} className="exercise-link">
        {/* Pass _id as parameter */}
        <div
          className="exercise-image"
          style={{ backgroundImage: `url(${photo})` }}
        >
          <div className="overlay">
            <div className="exercise-name">{name}</div>
          </div>
        </div>
      </Link>
      <div className="button-container">
        <button
          className="add-button"
          onClick={handleAddButtonClick}
          disabled={isExerciseAdded}
          style={{ opacity: isExerciseAdded ? 0.5 : 1, cursor: isExerciseAdded ? "not-allowed" : "pointer" }}
        >
          Add
        </button>

        <button
          className="remove-button"
          onClick={handleRemoveButtonClick}
          disabled={!isExerciseAdded}
          style={{ opacity: !isExerciseAdded ? 0.5 : 1, cursor: !isExerciseAdded ? "not-allowed" : "pointer" }}
        >
          Remove
        </button>
      </div>
    </div>
    </>
  );
};

export default ExerciseCard;
