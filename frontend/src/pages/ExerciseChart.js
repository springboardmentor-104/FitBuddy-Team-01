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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExerciseChart = ({ data }) => {
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

  return <Line data={chartData} options={options} />;
};

export default ExerciseChart;
