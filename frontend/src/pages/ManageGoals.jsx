import { Card } from "@mui/material";
import React, { useState } from "react";
import Userdashboard from "./Userdashboard";
import TableComponentAll from "./../components/TableComponentAll";
import TableComponentCompleted from "../components/TableComponentCompleted";
import TableComponentPending from "../components/TableComponentPending";
import "./ManageGoals.css";

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
            <Card className="container">
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
                  <div className="inline justify-center space-x-7 mb-4">
                    <button
                      className={`btn ${
                        activeTab === "All"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("All")}
                    >
                      All
                    </button>
                    <button
                      className={`btn ${
                        activeTab === "Completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("Completed")}
                    >
                      Completed
                    </button>
                    <button
                      className={`btn ${
                        activeTab === "Pending"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => handleTabChange("Pending")}
                    >
                      Pending
                    </button>
                  </div>

                  {/* Display Exercise or Diet History */}
                  {activeTab === "All" && (
                    <div className="table-responsive">
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
