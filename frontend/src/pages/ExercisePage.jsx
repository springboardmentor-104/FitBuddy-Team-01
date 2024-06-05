import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import "./ExercisePage.css";
import Userdashboard from "./Userdashboard";

const ExercisePage = () => {
  const [auth, setAuth] = useAuth();
  const token = auth?.token;

  const [selectedType, setSelectedType] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [userId, setUserId] = useState(""); // State to hold user ID
  const [userExercises, setUserExercises] = useState([]); // State to hold user's exercises

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(String(storedUserId)); // Ensure userId is stored as a string
      fetchUserExercises(storedUserId); // Fetch user's exercises
    }
  }, []);

  const fetchUserExercises = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/history/today/exercise`,
        {
          headers: {
            Authorization: `${token}`, // Add token to Authorization header
          },
        }
      );

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

        console.log("data");
        console.log(userExercises);
      } else {
        console.error("Unexpected response data format:", response.data);
        setUserExercises([]); // Set an empty array in case of unexpected format
      }
    } catch (error) {
      console.error("Error fetching user exercises:", error);
      setUserExercises([]); // Set an empty array in case of error
    }
  };

  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      let url = "http://localhost:8080/api/v1/exercise/all";
      if (selectedType) {
        url += `/search/${selectedType}`;
      }
      const response = await axios.get(url);
      setExercises(response.data.exercises || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setLoading(false);
    }
  }, [selectedType]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setDropdownVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value.toLowerCase();
    setSelectedType(type);
  };

  const toggleExerciseForm = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseForm(!showExerciseForm);
  };

  return (
    <>
      <ToastContainer />
      <Userdashboard
        content={
          // <div className="exercise-page" id="exerciseSidebarAdjustment">
          <div className="exercise-page">
            <div
              className={`dropdown-container ${
                dropdownVisible ? "visible" : "hidden"
              }`}
            >
              <div className="Ex-select-wrapper">
                <select value={selectedType} onChange={handleTypeChange}>
                  <option value="">All Exercises</option>
                  <option value="strength">Strength</option>
                  <option value="yoga">Yoga</option>
                  <option value="cardio">Cardio</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div
              className="card-container"
              style={{ marginTop: dropdownVisible ? "50px" : "0" }}
            >
              {loading ? (
                <div className="loading">Loading...</div>
              ) : exercises.length === 0 ? (
                <div className="no-exercises">
                  No exercises found for the selected category.
                </div>
              ) : (
                exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    onAdd={() => toggleExerciseForm(exercise)}
                    userId={userId}
                    userExercises={userExercises} // Pass userExercises to ExerciseCard
                    token={token} // Pass token to ExerciseCard
                    fetchUserExercises={fetchUserExercises} // Pass fetchUserExercises to ExerciseCard
                  />
                ))
              )}
            </div>

            {showExerciseForm && selectedExercise && (
              <ExerciseForm
                exercise={selectedExercise}
                userId={userId}
                onClose={() => setShowExerciseForm(false)}
                fetchUserExercises={fetchUserExercises} // Pass fetchUserExercises to ExerciseCard
              />
            )}
          </div>
        }
      />
    </>
  );
};

export default ExercisePage;
