import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Userdashboard from "./Userdashboard";
import TableComponentAll from "./../components/TableComponentAll";
import TableComponentCompleted from "../components/TableComponentCompleted";
import TableComponentPending from "../components/TableComponentPending";

const ManageGoals = () => {
  const [activeTab, setActiveTab] = useState("All");
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
                <main className="flex-1 p-4">
                  {/* Buttons for Exercise and Diet History */}
                  <div
                    className="flex justify-end space-x-4 mb-4"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <button
                      className={`btn ${
                        activeTab === "All"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("All")}
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        borderRadius: "3px",
                        width: "9%",
                        ...(activeTab === "All"
                          ? {
                              color: `#fff`,
                              backgroundColor: `#007bff`,
                              borderColor: `#007bff`,
                            }
                          : {}),
                      }}
                    >
                      All
                    </button>
                    <button
                      className={`btn ${
                        activeTab === "Completed"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("Completed")}
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        borderRadius: "3px",
                        ...(activeTab === "Completed"
                          ? {
                              color: `#fff`,
                              backgroundColor: `rgb(25, 135, 84)`,
                              borderColor: `rgb(25, 135, 84)`,
                            }
                          : {}),
                      }}
                    >
                      Completed
                    </button>
                    <button
                      className={`btn ${
                        activeTab === "Pending"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("Pending")}
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        borderRadius: "3px",
                        ...(activeTab === "Pending"
                          ? {
                              color: `#fff`,
                              backgroundColor: `rgb(255, 193, 7)`,
                              borderColor: `rgb(255, 193, 7)`,
                            }
                          : {}),
                      }}
                    >
                      Pending
                    </button>
                  </div>

                  {/* Display Exercise or Diet History */}
                  {activeTab === "All" && (
                    <div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          <TableComponentAll />
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "Completed" && (
                    <div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          <TableComponentCompleted />
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "Pending" && (
                    <div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          <TableComponentPending />
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

export default ManageGoals;
