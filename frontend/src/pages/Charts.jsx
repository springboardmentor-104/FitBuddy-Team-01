// import React, {useEffect, useState} from "react";
// import { Line } from "react-chartjs-2";
// import "./Charts.css";
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
// import axios from 'axios'
// import {useAuth} from '../context/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const CombinedChart = ({ data, page, itemsPerPage }) => {
//   // Paginate the data
//   const paginatedData = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

//   // Get unique dates within the paginated data
//   const uniqueDates = [...new Set(paginatedData.map(entry => entry.date))];

//   // Prepare datasets for the chart
//   const exerciseData = {
//     label: 'Exercise Completion Percentage',
//     data: uniqueDates.map(date => {
//       const entry = paginatedData.find(e => e.date === date);
//       return entry ? entry.exercise : 0;
//     }),
//     borderColor: 'hsl(220, 70%, 50%)',
//     backgroundColor: 'hsl(220, 70%, 50%, 0.2)',
//     fill: false,
//     tension: 0.1,
//   };

//   const dietData = {
//     label: 'Diet Completion Percentage',
//     data: uniqueDates.map(date => {
//       const entry = paginatedData.find(e => e.date === date);
//       return entry ? entry.diet : 0;
//     }),
//     borderColor: 'hsl(120, 70%, 50%)',
//     backgroundColor: 'hsl(120, 70%, 50%, 0.2)',
//     fill: false,
//     tension: 0.1,
//   };

//   const chartData = {
//     labels: uniqueDates,
//     datasets: [exerciseData, dietData],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Exercise and Diet Completion Over Time',
//       },
//     },
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//         title: {
//           display: true,
//           text: 'Completion Percentage',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// const Charts = () => {
//   const [data, setData] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const token = auth?.token;

//   const fetchData = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/v1/history/show/chart', {
//         headers: {
//           "Authorization": `${token}`, // Add Bearer if needed
//         },
//       });
//       if (res.data.success) {
//         console.log('Fetched Data:', res.data.completionRates);
//         setData(res.data.completionRates);
//       }else{
//         toast.error(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line
//   }, []);

//   const [page, setPage] = useState(0);
//   const itemsPerPage = 7;

//   const handlePrevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if ((page + 1) * itemsPerPage < data.length) {
//       setPage(page + 1);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Userdashboard />
//       <div className="app-container">
//         <h1>Exercise and Diet Chart</h1>
//         <div className="chart-navigation">
//           <button className="nav-button left" onClick={handlePrevPage}>←</button>
//           <CombinedChart data={data} page={page} itemsPerPage={itemsPerPage} />
//           <button className="nav-button right" onClick={handleNextPage}>→</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Charts;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Charts.css";
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
import axios from "axios";
import { useAuth } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CombinedChart = ({ data, page, itemsPerPage }) => {
  // Paginate the data
  const paginatedData = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // Get unique dates within the paginated data
  const uniqueDates = paginatedData.map((entry) => entry.date);

  // Prepare datasets for the chart
  const exerciseData = {
    label: "Exercise Completion Percentage",
    data: paginatedData.map((entry) => entry.exercise),
    borderColor: "hsl(220, 70%, 50%)",
    backgroundColor: "hsl(220, 70%, 50%, 0.2)",
    fill: false,
    tension: 0.1,
  };

  const dietData = {
    label: "Diet Completion Percentage",
    data: paginatedData.map((entry) => entry.diet),
    borderColor: "hsl(120, 70%, 50%)",
    backgroundColor: "hsl(120, 70%, 50%, 0.2)",
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
        position: "top",
      },
      title: {
        display: true,
        text: "Exercise and Diet Completion Over Time",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Completion Percentage",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
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

const Charts = () => {
  const [data, setData] = useState([]);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    // Check if data is available in localStorage
    const localStorageData = localStorage.getItem("chartData");
    if (localStorageData) {
      setData(JSON.parse(localStorageData));
    }

    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/history/show/chart",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (res.data.success) {
          console.log("Fetched Data:", res.data.completionRates);
          setData(res.data.completionRates);

          // Update localStorage with fetched data
          localStorage.setItem(
            "chartData",
            JSON.stringify(res.data.completionRates)
          );
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch data");
      }
    };

    // Fetch data only if it's not available in localStorage
    fetchData();
    // eslint-disable-line no-console
  }, [token]); // Only run when token changes

  const [page, setPage] = useState(0);
  const itemsPerPage = 7;

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < data.length) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <ToastContainer />
      <Userdashboard
        content={
          <div className="app-container">
            <h1>Exercise and Diet Chart</h1>
            <div className="chart-navigation">
              <button className="nav-button left" onClick={handlePrevPage}>
                ←
              </button>
              <CombinedChart
                data={data}
                page={page}
                itemsPerPage={itemsPerPage}
              />
              <button className="nav-button right" onClick={handleNextPage}>
                →
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Charts;
