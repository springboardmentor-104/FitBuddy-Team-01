import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import "./ExercisePage.css";
import Userdashboard from "./Userdashboard";

import { MenuItem, TextField } from "@mui/material";

const ExercisePage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [userId, setUserId] = useState(""); // State to hold user ID
  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(String(storedUserId)); // Ensure userId is stored as a string
    }
  }, []);

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
      <Userdashboard
        content={
          // <div className="exercise-page" id="exerciseSidebarAdjustment">
          <div className="exercise-page">
            <div
              className={`dropdown-container ${
                dropdownVisible ? "visible" : "hidden"
              }`}
            >
              {/* <div className="select-wrapper">
                <select value={selectedType} onChange={handleTypeChange}>
                  <option value="">All Exercises</option>
                  <option value="strength">Strength</option>
                  <option value="yoga">Yoga</option>
                  <option value="cardio">Cardio</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="other">Other</option>
                </select>
              </div> */}

              {/* New Code for Select Option by Shivankush */}
              <div className="d-flex justify-content-center">
                <div
                  // className="col-lg-3 col-md-6"
                  style={{ width: 225, marginTop: "20px" }}
                >
                  <TextField
                    className="me-3"
                    name="SelectExercises"
                    label="Select Exercises"
                    select
                    value={selectedType}
                    onChange={handleTypeChange}
                    fullWidth
                  >
                    <MenuItem value="">All Exercises</MenuItem>
                    <MenuItem value="strength">Strength</MenuItem>
                    <MenuItem value="yoga">Yoga</MenuItem>
                    <MenuItem value="cardio">Cardio</MenuItem>
                    <MenuItem value="powerlifting">Powerlifting</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </div>
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
                  />
                ))
              )}
            </div>

            {showExerciseForm && selectedExercise && (
              <ExerciseForm
                exercise={selectedExercise}
                userId={userId}
                onClose={() => setShowExerciseForm(false)}
              />
            )}
          </div>
        }
      />
    </>
  );
};

export default ExercisePage;
