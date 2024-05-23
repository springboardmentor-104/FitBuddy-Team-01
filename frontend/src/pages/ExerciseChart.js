import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Userdashboard from "./Userdashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExerciseChart = ({  }) => {
  const data = [
    {
      name: "Push-ups",
      date: ["9 am"],
      percentages: [20, 40, 60, 100],
    },
    {
      name: "Sit-ups",
      date: ["3 pm"],
      percentages: [30, 50, 70, 90],
    },
    {
      name: "Running",
      date: ["7 pm"],
      percentages: [10, 40, 50, 80],
    },
    {
      name: "Skipping",
      date: ["10 pm"],
      percentages: [10, 40, 50, 90],
    },
    // Add more exercises as needed
  ];
  const chartData = {
    labels: data.map((entry) => entry.date), // Assuming data is an array of objects with a 'date' field
    datasets: data.map((exercise, index) => ({
      label: exercise.name, // Assuming each exercise object has a 'name' field
      data: exercise.percentages, // Assuming each exercise object has a 'percentages' field which is an array of percentage values
      borderColor: `hsl(${index * 70}, 70%, 50%)`, // Unique color for each exercise
      backgroundColor: `hsl(${index * 60}, 70%, 50%, 0.2)`,
      fill: false,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Exercise Completion Percentage Over Time",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Completion Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return(<><Userdashboard/>
  <Line data={chartData} options={options} /></> );
};

export default ExerciseChart;
