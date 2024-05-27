// SingleExercisePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleExercisePage.css";
import Userdashboard from "./Userdashboard";
import ExerciseForm from "./ExerciseForm";
import { useAuth } from "../context/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleExercisePage() {
  const [auth, setAuth] = useAuth();
  const token = auth?.token;

  const [exerciseData, setExerciseData] = useState(null);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [userExercises, setUserExercises] = useState([]); // State to hold user's exercises


  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(String(storedUserId));
      fetchUserExercises(storedUserId);
    }
  }, []);

  const fetchUserExercises = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/history/today/exercise`, {
        headers: {
          "Authorization": `${token}`, // Add token to Authorization header
        },
      });

      // Log the response data to understand its structure
      console.log(response.data);

      // Adjust this part based on the actual structure of response.data
      const exercisesArray = response.data.exercises || response.data; // Adjust this line based on the log
      if (Array.isArray(exercisesArray)) {
        const exerciseDetails = exercisesArray.map((exercise) => ({
          name: exercise.goalId.name,
          goalId: exercise.goalId._id,
          key: exercise.goalId.key,
        }));
        setUserExercises(exerciseDetails); // Set the state with the array of objects

        console.log("data")
        console.log(userExercises)
      } else {
        console.error("Unexpected response data format:", response.data);
        setUserExercises([]); // Set an empty array in case of unexpected format
      }
    } catch (error) {
      console.error("Error fetching user exercises:", error);
      setUserExercises([]); // Set an empty array in case of error
    }
  };

  const isExerciseAdded = userExercises.some(userExercise => userExercise.key === id);
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/exercise/exercises/${id}`
        );
        if (response.status === 200) {
          setExerciseData(response.data.exercise);
          console.log(response);
        } else {
          console.error("Exercise not found");
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchExerciseData();

    return () => {
      // Cleanup function
    };
    // eslint-disable-line no-console
  }, [id]);

  const handleRemoveButtonClick = async () => {
    try {
      // Find the exercise object from userExercises with matching _id
      const userExercise = userExercises.find(userExercise => userExercise.key === id);
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

  return (
    <>
    <ToastContainer/>
      <Userdashboard />
      <div className="exercise-page" id="exerciseSidebarAdjustment">
        <div className="App">
          {exerciseData ? (
            <div className="container">
              {/* Exercise details */}
              <div className="image-container">
                <img src={exerciseData.photo} alt={exerciseData.name} />
              </div>
              <div className="text-container">
                {/* Exercise name */}
                <div className="label">
                  <center id="exerciseSidebarAdjustment">
                    {exerciseData.name}
                  </center>
                </div>
                {/* Exercise instructions */}
                <h2>Instructions</h2>
                <p className="instruction-para">
                  {exerciseData.description}
                </p>
                {/* Buttons */}
                <div className="button-container">
                  <button
                    className="add-button"
                    onClick={() => setShowExerciseForm(true)}
                    disabled={isExerciseAdded}
                    style={{ opacity: isExerciseAdded ? 0.5 : 1, cursor: isExerciseAdded ? "not-allowed" : "pointer" }}

                  >
                    Add
                  </button>
                  <button className="remove-button" onClick={handleRemoveButtonClick}
                    disabled={!isExerciseAdded}
                    style={{ opacity: !isExerciseAdded ? 0.5 : 1, cursor: !isExerciseAdded ? "not-allowed" : "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {/* Exercise form */}
      {showExerciseForm && (
        <>
          <ExerciseForm
            exercise={exerciseData}
            userId={userId}
            onClose={() => setShowExerciseForm(false)}
            fetchUserExercises={fetchUserExercises} // Pass fetchUserExercises to ExerciseCard
          />
        </>
      )}
    </>
  );
}

export default SingleExercisePage;
