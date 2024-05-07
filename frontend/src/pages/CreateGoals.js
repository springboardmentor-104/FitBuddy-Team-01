import { useCallback } from "react";
import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, SplitButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// import MenuBar1 from "../components/MenuBar1";
import Userdashboard from "./Userdashboard";
// import { Button, TextField, IconButton } from '@material-ui/core';
// import TextField from '@mui/material/TextField';
import { MenuItem, TextField } from "@mui/material";

// import { Delete } from '@material-ui/icons';

const CreateGoals = () => {
  const onSAVEClick = useCallback(() => {
    //TODO: alert("saved successfully");
  }, []);

  const onSAVE1Click = useCallback(() => {
    //TODO: alert("saved successfully");
  }, []);

  const onConfirmAndSaveClick = useCallback(() => {
    //TODO: alert("confirmed");
  }, []);

  const onAddNewClick = useCallback(() => {
    //TODO: alert("added");
  }, []);

  const onAddNew1Click = useCallback(() => {
    //TODO: alert("added");
  }, []);

  const onDelete1Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete2Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete3Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete4Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const [exercises, setExercises] = useState([
    { exercise_name: "", category: "", sets: "", estimated_time: "" },
  ]);

  const [diets, setDiets] = useState([
    { diet_name: "", category: "", quantity: "", total_calories: "" },
  ]);

  const handleExerciseChange = (e, index) => {
    const { name, value } = e.target;
    const newExercises = [...exercises];
    newExercises[index][name] = value;
    setExercises(newExercises);
  };

  const handleDietChange = (e, index) => {
    const { name, value } = e.target;
    const newDiets = [...diets];
    newDiets[index][name] = value;
    setDiets(newDiets);
  };

  const addExercises = () => {
    setExercises([
      ...exercises,
      { exercise_name: "", category: "", sets: "", estimated_time: "" },
    ]);
  };
  const addDiets = () => {
    setDiets([
      ...diets,
      { exercise_name: "", category: "", sets: "", estimated_time: "" },
    ]);
  };

  const removeExercises = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    console.log("removed exercise =", newExercises);
    setExercises(newExercises);
  };

  const removeDiet = (index) => {
    const newDiets = [...diets];
    newDiets.splice(index, 1);
    console.log("removed diet =", newDiets);
    setDiets(newDiets);
  };

  const handleExerciseSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for diets and
    console.log("exercise submitted:");
  };

  const handleDietSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for diets and
    console.log("diet submitted:");
  };

  const [activeSection, setActiveSection] = useState("exercise"); // Initially set to 'exercise'

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <Userdashboard
      content={
        <div>
          <div className="d-flex justify-content-center">
            <form
              onSubmit={
                activeSection === "exercise"
                  ? handleExerciseSubmit
                  : handleDietSubmit
              }
              className="mt-5 w-100"
            >
              <div className="border border-info p-5">
                <Button
                  variant={
                    activeSection === "exercise" ? "contained" : "outlined"
                  }
                  color={activeSection === "exercise" ? "primary" : "default"}
                  style={{
                    backgroundColor:
                      activeSection === "exercise" ? "orange" : "white",
                    color: activeSection === "exercise" ? "white" : "black",
                  }}
                  onClick={() => toggleSection("exercise")}
                  className="me-3"
                >
                  Exercise
                </Button>
                <Button
                  variant={activeSection === "diet" ? "contained" : "outlined"}
                  color={activeSection === "diet" ? "primary" : "default"}
                  style={{
                    backgroundColor:
                      activeSection === "diet" ? "orange" : "white",
                    color: activeSection === "diet" ? "white" : "black",
                  }}
                  onClick={() => toggleSection("diet")}
                >
                  Diet
                </Button>
                {activeSection === "exercise" ? (
                  <>
                    <h2 className="text-center mt-2 mb-4">Create Exercises</h2>
                    {exercises.map((student, index) => (
                      <div key={index} className="row align-items-center mb-3">
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="exercise_name"
                            label="Exercise Name"
                            value={student.exercise_name}
                            onChange={(e) => handleExerciseChange(e, index)}
                            fullWidth
                          />
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="category"
                            label="Exercise Category"
                            value={student.category}
                            onChange={(e) => handleExerciseChange(e, index)}
                            fullWidth
                          />
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="sets"
                            label="Exercise Sets"
                            value={student.sets}
                            onChange={(e) => handleExerciseChange(e, index)}
                            fullWidth
                          />
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="estimated_time"
                            label="Estimated Time"
                            value={student.estimated_time}
                            onChange={(e) => handleExerciseChange(e, index)}
                            fullWidth
                          />
                        </div>
                        {exercises.length > 1 &&
                          index !== exercises.length - 1 && (
                            <div className="col-auto mt-3">
                              <Button
                                onClick={() => removeExercises(index)}
                                style={{
                                  backgroundColor: "#f74563",
                                  color: "white",
                                }}
                                className="ms-3"
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        {index === exercises.length - 1 && (
                          <div className="col-auto mt-3">
                            <Button
                              onClick={addExercises}
                              variant="contained"
                              style={{
                                backgroundColor: "#59a2eb",
                                color: "white",
                              }}
                              className="ms-3"
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h2 className="text-center mt-2 mb-4">Create Diets</h2>
                    {diets.map((student, index) => (
                      <div key={index} className="row align-items-center mb-3">
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="exercise_name"
                            label="Diet Name"
                            value={student.exercise_name}
                            onChange={(e) => handleDietChange(e, index)}
                            fullWidth
                          />
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="category"
                            label="Time to Eat"
                            select
                            value={student.category}
                            onChange={(e) => handleDietChange(e, index)}
                            fullWidth
                          >
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch">Lunch</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                          </TextField>
                        </div>

                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="Quantity"
                            label="Quantity"
                            value={student.sets}
                            onChange={(e) => handleDietChange(e, index)}
                            fullWidth
                          />
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <TextField
                            className="me-3"
                            name="Total Calories"
                            label="Total Calories"
                            value={student.estimated_time}
                            onChange={(e) => handleDietChange(e, index)}
                            fullWidth
                          />
                        </div>
                        {diets.length > 1 && index !== diets.length - 1 && (
                          <div className="col-auto mt-3">
                            <Button
                              onClick={() => removeDiet(index)}
                              style={{
                                backgroundColor: "#f74563",
                                color: "white",
                              }}
                              className="ms-3"
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                        {index === diets.length - 1 && (
                          <div className="col-auto mt-3">
                            <Button
                              onClick={addDiets}
                              variant="contained"
                              style={{
                                backgroundColor: "#59a2eb",
                                color: "white",
                              }}
                              className="ms-3"
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#59a2eb", color: "white" }}
                className="mt-4"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default CreateGoals;
