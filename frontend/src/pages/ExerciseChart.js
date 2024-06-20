// Shivankush Remove the below code , because the chart not render in dashboard.

// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Userdashboard from "./Userdashboard";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ExerciseChart = ({  }) => {
//   const data = [
//     {
//       name: "Push-ups",
//       date: ["9 am"],
//       percentages: [20, 40, 60, 100],
//     },
//     {
//       name: "Sit-ups",
//       date: ["3 pm"],
//       percentages: [30, 50, 70, 90],
//     },
//     {
//       name: "Running",
//       date: ["7 pm"],
//       percentages: [10, 40, 50, 80],
//     },
//     {
//       name: "Skipping",
//       date: ["10 pm"],
//       percentages: [10, 40, 50, 90],
//     },
//     // Add more exercises as needed
//   ];
//   const chartData = {
//     labels: data.map((entry) => entry.date), // Assuming data is an array of objects with a 'date' field
//     datasets: data.map((exercise, index) => ({
//       label: exercise.name, // Assuming each exercise object has a 'name' field
//       data: exercise.percentages, // Assuming each exercise object has a 'percentages' field which is an array of percentage values
//       borderColor: `hsl(${index * 70}, 70%, 50%)`, // Unique color for each exercise
//       backgroundColor: `hsl(${index * 60}, 70%, 50%, 0.2)`,
//       fill: false,
//       tension: 0.1,
//     })),
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Exercise Completion Percentage Over Time",
//       },
//     },
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//         title: {
//           display: true,
//           text: "Completion Percentage (%)",
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Time",
//         },
//       },
//     },
//   };

//   return(<><Userdashboard/>
//   <Line data={chartData} options={options} /></> );
// };

// export default ExerciseChart;

// Shivankush implement below Code , after this chart render in dashboard.

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

const ExerciseChart = ({ data, page, itemsPerPage  }) => {

  // Paginate the data
  const paginatedData = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // Get unique dates within the paginated data
  const uniqueDates = paginatedData.map(entry => entry.date);

  // Prepare datasets for the chart
  const exerciseData = {
    label: 'Exercise Completion Percentage',
    data: paginatedData.map(entry => entry.exercise),
    borderColor: 'hsl(220, 70%, 50%)',
    backgroundColor: 'hsl(220, 70%, 50%, 0.2)',
    fill: false,
    tension: 0.1,
  };

  const dietData = {
    label: 'Diet Completion Percentage',
    data: paginatedData.map(entry => entry.diet),
    borderColor: 'hsl(120, 70%, 50%)',
    backgroundColor: 'hsl(120, 70%, 50%, 0.2)',
    fill: false,
    tension: 0.1,
  };

  const chartData = {
    labels: uniqueDates,
    datasets: [exerciseData, dietData],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exercise and Diet Completion Over Time',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Completion Percentage',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExerciseChart;