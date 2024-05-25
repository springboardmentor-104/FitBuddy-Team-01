// SingleExercisePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleExercisePage.css";
import Userdashboard from "./Userdashboard";
import ExerciseForm2 from "./ExerciseForm2";

function SingleExercisePage() {
  const [exerciseData, setExerciseData] = useState(null);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const { id } = useParams();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

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

    fetchUserData();
    fetchExerciseData();

    return () => {
      // Cleanup function
    };
  }, [id]);

  const handleSubmitExercise = async (sets, timeToPerformExercise) => {
    // Your submission logic
  };

  return (
    <>
      <Userdashboard
        content={
          <div>
            {/* <div className="exercise-page" id="exerciseSidebarAdjustment"> */}
            <div className="exercise-page" style={{ marginTop: "30px" }}>
              <div className="App">
                {exerciseData ? (
                  <div className="container">
                    <div className="label">
                      {/* <center> */}
                      {exerciseData.name}
                      {/* </center> */}
                    </div>
                    <div className="d-flex justify-content-center">
                      {/* Exercise details */}
                      <div className="image-container">
                        <img src={exerciseData.photo} alt={exerciseData.name} />
                      </div>
                      <div className="text-container">
                        {/* Exercise name */}

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
                          >
                            Add
                          </button>
                          <button className="remove-button" onClick={() => {}}>
                            Remove
                          </button>
                        </div>
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
                <div
                  className="exercise-form-overlay"
                  onClick={() => setShowExerciseForm(false)}
                ></div>
                <ExerciseForm2
                  exercise={exerciseData}
                  userId={userId}
                  onSubmit={handleSubmitExercise}
                  onClose={() => setShowExerciseForm(false)}
                />
              </>
            )}
          </div>
        }
      />
    </>
  );
}

export default SingleExercisePage;
