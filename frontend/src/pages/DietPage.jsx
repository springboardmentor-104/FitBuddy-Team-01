// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import DietCard from "./DietCard";
// import DietForm from "./DietForm";
// import "./DietPage.css";
// import Userdashboard from "./Userdashboard";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/auth';


// const DietPage = () => {

//   const [auth, setAuth] = useAuth();
//   const token = auth?.token;

//   const [selectedType, setSelectedType] = useState("");
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dropdownVisible, setDropdownVisible] = useState(true);
//   const [showDietForm, setShowDietForm] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [userId, setUserId] = useState("");
//   const [userDiets, setUserDiets] = useState([]); // State to hold user's exercises

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("user");
//     if (storedUserId) {
//       setUserId(String(storedUserId));
//     }
//   }, []);

//   const fetchMeals = useCallback(async () => {
//     try {
//       setLoading(true);
//       let url = "http://localhost:8080/api/v1/meal/all";
//       if (selectedType) {
//         url += `/search/${selectedType}`;
//       }
//       const response = await axios.get(url);
//       setMeals(response.data.meals || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching meals:", error);
//     }
//   }, [selectedType]);

//   useEffect(() => {
//     fetchMeals();
//   }, [fetchMeals]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       setDropdownVisible(scrollTop === 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleTypeChange = (event) => {
//     const type = event.target.value.toLowerCase();
//     setSelectedType(type);
//   };

//   const toggleDietForm = (meal) => {
//     setSelectedMeal(meal);
//     setShowDietForm(!showDietForm);
//   };

//   return (
//     <>
//       <ToastContainer/>
//       <Userdashboard 
//       content={
//       <div className="diet-page" id="dietSidebarAdjustment">
//         <div
//           className={`dropdown-container ${
//             dropdownVisible ? "visible" : "hidden"
//           }`}
//         >
//           <br />
//           <div className="select-wrapper">
//             <select value={selectedType} onChange={handleTypeChange}>
//               <option value="">All Meals</option>
//               <option value="breakfast">Breakfast</option>
//               <option value="lunch">Lunch</option>
//               <option value="dinner">Dinner</option>
//             </select>
//           </div>
//         </div>

//         <div
//           className="card-container"
//           style={{ marginTop: dropdownVisible ? "50px" : "0" }}
//         >
//           {loading ? (
//             <div className="loading">Loading...</div>
//           ) : meals.length === 0 ? (
//             <div className="no-meals">
//               No meals found for the selected category.
//             </div>
//           ) : (
//             meals.map((meal) => (
//               <DietCard
//                 key={meal._id}
//                 meal={meal}
//                 onAdd={() =>
//                   toggleDietForm(meal)
//                 }
//                 token={token} // Pass token to ExerciseCard
//                 userId={userId}
//                 // onAdd={(mealName, mealId, category) =>
//                 //   toggleDietForm(mealName, mealId, category, userId)
//                 // }
//               />
//             ))
//           )}
//         </div>

//         {showDietForm && selectedMeal && (
//           <DietForm
//             meal={selectedMeal}
//             userId={userId}
//             onClose={() => setShowDietForm(false)}
//           />
//         )}
//       </div>}
//       />
//     </>
//   );
// };

// export default DietPage

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DietCard from "./DietCard";
import DietForm from "./DietForm";
import "./DietPage.css";
import Userdashboard from "./Userdashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';

const DietPage = () => {
  const [auth, setAuth] = useAuth();
  const token = auth?.token;

  const [selectedType, setSelectedType] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [showDietForm, setShowDietForm] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [userId, setUserId] = useState("");
  const [userDiets, setUserDiets] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(String(storedUserId));
      fetchUserDiets(storedUserId);
    }
  }, []);

  const fetchUserDiets = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/history/today/diet`, {
        headers: {
          "Authorization": `${token}`,
        },
      });
  
      console.log(response.data);

      const dietsArray = response.data.diets || response.data;
      if (Array.isArray(dietsArray)) {
        const dietDetails = dietsArray.map((diet) => ({
          name: diet.goalId.name,
          goalId: diet.goalId._id,
          key: diet.goalId.key,
        }));
        setUserDiets(dietDetails);
      } else {
        console.error("Unexpected response data format:", response.data);
        setUserDiets([]);
      }
    } catch (error) {
      console.error("Error fetching user diets:", error);
      setUserDiets([]);
    }
  };

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      let url = "http://localhost:8080/api/v1/meal/all";
      if (selectedType) {
        url += `/search/${selectedType}`;
      }
      const response = await axios.get(url);
      setMeals(response.data.meals || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setLoading(false);
    }
  }, [selectedType]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setDropdownVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value.toLowerCase();
    setSelectedType(type);
  };

  const toggleDietForm = (meal) => {
    setSelectedMeal(meal);
    setShowDietForm(!showDietForm);
  };
  

  return (
    <>
      <ToastContainer/>
      <Userdashboard />
      <div className="diet-page" id="dietSidebarAdjustment">
        <div
          className={`dropdown-container ${dropdownVisible ? "visible" : "hidden"}`}
        >
          <div className="select-wrapper">
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="">All Meals</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
        </div>

        <div className="card-container" style={{ marginTop: dropdownVisible ? "50px" : "0" }}>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : meals.length === 0 ? (
            <div className="no-meals">
              No meals found for the selected category.
            </div>
          ) : (
            meals.map((meal) => (
              <DietCard
                key={meal._id}
                meal={meal}
                onAdd={() => toggleDietForm(meal)}
                userId={userId}
                userDiets={userDiets} // Pass userDiets to DietCard
                token={token} // Pass token to DietCard
                fetchUserDiets={fetchUserDiets} // Pass fetchUserDiets to DietCard
              />
            ))
          )}
        </div>

        {showDietForm && selectedMeal && (
          <DietForm
            meal={selectedMeal}
            userId={userId}
            onClose={() => setShowDietForm(false)}
            fetchUserDiets={fetchUserDiets} // Pass fetchUserDiets to DietForm
          />
        )}
      </div>
    </>
  );
};

export default DietPage;
