import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Userdashboard from "./Userdashboard";
import "./Histo.css";
import ExerciseStatusTypography from "./ExerciseStatusTypography";
import DietStatusTypography from "./DietStatusTypography";

const Histo = (props) => {
  const [activeTab, setActiveTab] = useState("exercise");
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [dietHistory, setDietHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const exerciseResponse = await fetch("https://fakestoreapi.com/products");
      if (exerciseResponse.status !== 200) {
        throw new Error("Failed to fetch exercise data");
      }
      const exerciseData = await exerciseResponse.json();
      setExerciseHistory(exerciseData);

      const dietResponse = await fetch("https://fakestoreapi.com/products");
      if (dietResponse.status !== 200) {
        throw new Error("Failed to fetch diet data");
      }
      const dietData = await dietResponse.json();
      setDietHistory(dietData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Userdashboard
        content={
          <>
            <Card className="h-full w-full overflow-scroll">
              <div className="flex flex-col h-screen">
                {/* Navbar */}
                {/* <nav className="bg-white-800 border-black-50px text-blue p-2 flex justify-between">
                  <div className="text-lg font-bold">Fit Buddy</div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
                    Logout
                  </button>
                </nav> */}

                {/* Sidebar */}
                {/* <aside className="bg-green-200 p-2">
                  <ul>
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">My Profile</li>
                    <li
                      className="cursor-pointer"
                      onClick={() => handleTabChange("history")}
                    >
                      History
                    </li>
                  </ul>
                </aside> */}

                {/* Main Content */}
                <main className="flex-1 p-4">
                  {/* Buttons for Exercise and Diet History */}
                  <div
                    className="flex justify-end space-x-4 mb-4"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <button
                      className={`btn btn-outline-primary ${
                        activeTab === "exercise"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("exercise")}
                      style={{
                        borderRadius: "0px",
                        ...(activeTab === "exercise"
                          ? {
                              color: `#fff`,
                              backgroundColor: `#0d6efd`,
                              borderColor: `#0d6efd`,
                            }
                          : {}),
                      }}
                    >
                      Exercise History
                    </button>
                    <button
                      className={`btn btn-outline-success ${
                        activeTab === "diet"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("diet")}
                      style={{
                        borderRadius: "0px",
                        ...(activeTab === "diet"
                          ? {
                              color: `#fff`,
                              backgroundColor: `#198754`,
                              borderColor: `#198754`,
                            }
                          : {}),
                      }}
                    >
                      Diet History
                    </button>
                  </div>

                  {/* Display Exercise or Diet History */}
                  {activeTab === "exercise" && (
                    <div>
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: "#4154f1" }}
                      >
                        <strong>Exercise History</strong>
                      </h4>
                      {/* Exercise History Table */}
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <table
                          className="w-full min-w-max table-auto text-left sm:w-auto"
                          style={{
                            width: "100%",
                            height: "500px",
                            marginTop: "25px",
                          }}
                        >
                          {/* Table headers */}
                          <thead>
                            <tr style={{ borderBottom: "1px solid gray" }}>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>Exercise Name</center>
                                </Typography>
                              </th>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                // style={{ width: "" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>Category</center>
                                </Typography>
                              </th>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                // style={{ width: "" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>Sets</center>
                                </Typography>
                              </th>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>Estimated Time</center>
                                </Typography>
                              </th>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>
                                    {/* Done */}
                                    Status
                                  </center>
                                </Typography>
                              </th>
                              <th
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  <center>Date</center>
                                </Typography>
                              </th>
                            </tr>
                          </thead>
                          {/* Table body (data to be dynamically rendered) */}
                          <tbody>
                            {exerciseHistory.map((exercise, index) => (
                              <tr
                                key={index}
                                style={{ borderBottom: "1px solid gray" }}
                              >
                                <td
                                  className="border-b border-blue-gray-100 p-4"
                                  style={{ width: "20%" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>{exercise.name}</center>
                                  </Typography>
                                </td>
                                <td
                                  className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                  // style={{ width: "" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>{exercise.category}</center>
                                  </Typography>
                                </td>
                                <td
                                  className="border-b border-blue-gray-100 p-4"
                                  // style={{ width: "" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>{exercise.sets}</center>
                                  </Typography>
                                </td>
                                <td
                                  className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                  style={{ width: "20%" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>{exercise.estimatedTime}</center>
                                  </Typography>
                                </td>
                                <td
                                  className="border-b border-blue-gray-100 p-4"
                                  style={{ width: "20%" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>
                                      {/* {exercise.done ? "Yes" : "No"} */}
                                      {/* {exercise.done ? "Done" : "Pending"} */}
                                      <ExerciseStatusTypography
                                        done={exercise.done}
                                      />
                                    </center>
                                  </Typography>
                                </td>
                                <td
                                  className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                  style={{ width: "20%" }}
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    <center>{exercise.date}</center>
                                  </Typography>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}

                  {activeTab === "diet" && (
                    <div>
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: "#4caf50" }}
                      >
                        <strong>Diet History</strong>
                      </h4>
                      {/* Diet History Table */}
                      <table
                        className="w-full min-w-max table-auto text-left sm:w-auto"
                        style={{
                          width: "100%",
                          height: "500px",
                          marginTop: "25px",
                        }}
                      >
                        {/* Table headers */}
                        <thead>
                          <tr style={{ borderBottom: "1px solid gray" }}>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              style={{ width: "20%" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Diet Name</center>
                              </Typography>
                            </th>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              // style={{ width: "" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Quantity</center>
                              </Typography>
                            </th>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              // style={{ width: "" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Calories</center>
                              </Typography>
                            </th>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              style={{ width: "20%" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Time to Eat</center>
                              </Typography>
                            </th>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              style={{ width: "20%" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Status</center>
                              </Typography>
                            </th>
                            <th
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              style={{ width: "20%" }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                <center>Date</center>
                              </Typography>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body (data to be dynamically rendered) */}
                        <tbody>
                          {dietHistory.map((diet, index) => (
                            <tr
                              key={index}
                              style={{ borderBottom: "1px solid gray" }}
                            >
                              <td
                                className="border-b border-blue-gray-100 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {diet.title}
                                </Typography>
                              </td>
                              <td
                                className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                // style={{ width: "" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <center>{diet.category}</center>
                                </Typography>
                              </td>
                              <td
                                className="border-b border-blue-gray-100 p-4"
                                // style={{ width: "" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <center>{diet.sets}</center>
                                </Typography>
                              </td>
                              <td
                                className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <center>{diet.estimatedTime}</center>
                                </Typography>
                              </td>
                              <td
                                className="border-b border-blue-gray-100 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <center>
                                    {/* {diet.done ? "Yes" : "No"} */}
                                    {/* {diet.done ? "Done" : "Pending"} */}
                                    <DietStatusTypography done={diet.done} />
                                  </center>
                                </Typography>
                              </td>
                              <td
                                className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                style={{ width: "20%" }}
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  <center>{diet.date}</center>
                                </Typography>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </main>
              </div>
            </Card>
          </>
        }
      />
    </>
  );
};

export default Histo;
