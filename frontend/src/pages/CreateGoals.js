import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import CreateGoalsExerciseTable from "./../components/CreateGoalsExerciseTable";
import CreateGoalsDietTable from "./../components/CreateGoalsDietTable";

// import MenuBar1 from "../components/MenuBar1";
import Userdashboard from "./Userdashboard";
// import { Button, TextField, IconButton } from '@material-ui/core';
// import TextField from '@mui/material/TextField';
import { MenuItem, TextField } from "@mui/material";

// import { Delete } from '@material-ui/icons';

const CreateGoals = () => {

  const [exercises, setExercises] = useState([
    { name: "", category: "", sets: "", time: "" },
  ]);

  const [diets, setDiets] = useState([
    { name: "", timeToEat: "", quantity: "", calories: "" },
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
      { name: "", category: "", sets: "", time: "" },
    ]);
  };
  const addDiets = () => {
    setDiets([
      ...diets,
      { name: "", timeToEat: "", quantity: "", calories: "" },
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
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.userId;
    const token = userData.token;
    const data = {
      userId: userId,
      exerciseArr: exercises,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/goal/exercise",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`, // Add token to Authorization header
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Exercise has been saved successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        alert("Something went wrong. Please try again later ");}
      });
  };

  const handleDietSubmit = (e) => {
    e.preventDefault();
    // Send diet data to backend
    console.log(diets);
    // Handle form submission for diets
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.userId;
    const token = userData.token;
    const data = {
      userId: userId,
      dietArr: diets,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/goal/diet",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`, // Add token to Authorization header
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Diet has been saved successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          alert("Something went wrong. Please try again later ");}  
      });
  };

  const [activeSection, setActiveSection] = useState("exercise"); // Initially set to 'exercise'

  const toggleSection = (section) => {
    setActiveSection(section);
  };


  return (
    <>
      <Userdashboard
        content={
          <>
            {/* <div className="d-flex justify-content-center"> */}
            <div>
              <form
                onSubmit={
                  activeSection === "exercise"
                    ? handleExerciseSubmit
                    : handleDietSubmit
                }
                // className="mt-5 w-75"
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
                    variant={
                      activeSection === "diet" ? "contained" : "outlined"
                    }
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
                      <h2 className="text-center mt-2 mb-4">
                        Create Exercises
                      </h2>
                      {exercises.map((student, index) => (
                        <div
                          key={index}
                          className="row align-items-center mb-3"
                        >
                          <div className="col-lg-3 col-md-6">
                            <TextField
                              className="me-3"
                              name="name"
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
                              name="time"
                              label="Estimated Time(Mins)"
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
                        <div
                          key={index}
                          className="row align-items-center mb-3"
                        >
                          <div className="col-lg-3 col-md-6">
                            <TextField
                              className="me-3"
                              name="name"
                              label="Diet Name"
                              value={student.exercise_name}
                              onChange={(e) => handleDietChange(e, index)}
                              fullWidth
                            />
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <TextField
                              className="me-3"
                              name="timeToEat"
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
                              name="quantity"
                              label="Quantity"
                              value={student.sets}
                              onChange={(e) => handleDietChange(e, index)}
                              fullWidth
                            />
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <TextField
                              className="me-3"
                              name="calories"
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
              {(() => {
                if (activeSection === "exercise") {
                  return <CreateGoalsExerciseTable />;
                }
                if (activeSection === "diet") {
                  return <CreateGoalsDietTable />;
                }
                return "";
              })()}
            </div>
          </>
        }
      />
    </>
  );
};

export default CreateGoals;
