import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Userdashboard from "./Userdashboard";
import "./History.css";
import TableComponentExercise from "./../components/TableComponentExercise";
import TableComponentDiet from "../components/TableComponentDiet";
import { BsJustifyRight } from "react-icons/bs";

const History = (props) => {
  const [activeTab, setActiveTab] = useState("exercise");
  const [loading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Userdashboard
        content={
          <>
            <Card className="h-full w-full">
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
                <main className="flex-1 p-4 justify-end">
                  {/* Buttons for Exercise and Diet History */}
                  <div
                    className="inline justify-center space-x-7 mb-4"
                  >
                    <button
                      className={`btn ${
                        activeTab === "exercise"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("exercise")}
                      style={{
                        borderRadius: "3px",
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
                      className={`btn ${
                        activeTab === "diet"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("diet")}
                      style={{
                        borderRadius: "3px",
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
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          <TableComponentExercise />
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "diet" && (
                    <div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          <TableComponentDiet />
                        </>
                      )}
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

export default History;
