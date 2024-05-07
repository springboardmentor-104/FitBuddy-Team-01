import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";

const Histo = () => {
  const [activeTab, setActiveTab] = useState("exercise");
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [dietHistory, setDietHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exerciseResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
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

    fetchData();
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <nav className="bg-white-800 border-black-50px text-blue p-2 flex justify-between">
          <div className="text-lg font-bold">Fit Buddy</div>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
            Logout
          </button>
        </nav>

        {/* Sidebar */}
        <aside className="bg-green-200 p-2">
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Buttons for Exercise and Diet History */}
          <div className="flex justify-end space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "exercise"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("exercise")}
            >
              Exercise History
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "diet"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("diet")}
            >
              Diet History
            </button>
          </div>

          {/* Display Exercise or Diet History */}
          {activeTab === "exercise" && (
            <div>
              <h4 className="text-lg font-bold mb-2">Exercise History</h4>
              {/* Exercise History Table */}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table
                  className="w-full min-w-max table-auto text-left sm:w-auto"
                  style={{ width: "75%", height: "500px" }}
                >
                  {/* Table headers */}
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Exercise Name
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Category
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Sets
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Estimated Time
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Done
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Date
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body (data to be dynamically rendered) */}
                  <tbody>
                    {exerciseHistory.map((exercise, index) => (
                      <tr key={index}>
                        <td className="border-b border-blue-gray-100 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.category}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-100 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.sets}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.estimatedTime}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-100 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.done ? "Yes" : "No"}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {exercise.date}
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
              <h4 className="text-lg font-bold mb-2">Diet History</h4>
              {/* Diet History Table */}
              <table
                className="w-full min-w-max table-auto text-left sm:w-auto"
                style={{ width: "75%", height: "500px" }}
              >
                {/* Table headers */}
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Diet Name
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Quantity
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Calories
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Time to Eat
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Status
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Date
                      </Typography>
                    </th>
                  </tr>
                </thead>
                {/* Table body (data to be dynamically rendered) */}
                <tbody>
                  {dietHistory.map((diet, index) => (
                    <tr key={index}>
                      <td className="border-b border-blue-gray-100 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.title}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.category}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-100 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.sets}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.estimatedTime}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-100 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.done ? "Yes" : "No"}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {diet.date}
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
  );
};

export default Histo;
