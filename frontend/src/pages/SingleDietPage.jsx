// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// //import "./SingleDietPage.css";
// import Userdashboard from "./Userdashboard";
// import DietForm from "./DietForm";
// import { useAuth } from "../context/auth"

// function SingleDietPage() {
//     const [auth, setAuth] = useAuth();

//     const [mealData, setMealData] = useState(null);
//     const [showDietForm, setShowDietForm] = useState(false);
//     const { id } = useParams();
//     console.log(id);
//     const [userId, setUserId] = useState("");

//     setUserId(auth?.userId)
//     useEffect(() => {
//         // const fetchUserData = async () => {
//         //   try {
//         //     const storedUserId = localStorage.getItem("user");
//         //     if (storedUserId) {
//         //       setUserId(storedUserId);
//         //     }
//         //   } catch (error) {
//         //     console.error("Error fetching user data:", error);
//         //   }
//         // };

//         const fetchMealData = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8080/api/v1/meal/${id}`
//                 );
//                 if (response.status === 200) {
//                     setMealData(response.data.meals); // Assuming the response contains meal data directly
//                     console.log(response);
//                 } else {
//                     console.error("Meal not found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching meal data:", error);
//             }
//         };

//         fetchUserData();
//         fetchMealData();

//         return () => {
//             // Cleanup function
//         };
//     }, [id]);

//     const handleSubmitDiet = async () => {
//         // Your submission logic
//     };

//     return (
//         <>
//             <Userdashboard />
//             <div className="diet-page" id="dietSidebarAdjustment">
//                 <div className="App">
//                     {mealData ? (
//                         <div className="container">
//                             <div className="image-container">
//                                 <img src={mealData.photo} alt={mealData.name} />
//                             </div>
//                             <div className="text-container">
//                                 <div className="label">
//                                     <center id="dietSidebarAdjustment">{mealData.name}</center>
//                                 </div>
//                                 <h2>Ingredients</h2>
//                                 <p className="instruction-para">{mealData.ingredients}</p>
//                                 <div className="button-container">
//                                     <button
//                                         className="add-button"
//                                         onClick={() => setShowDietForm(true)}
//                                     >
//                                         Add
//                                     </button>
//                                     <button className="remove-button" onClick={() => { }}>
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <div>Loading...</div>
//                     )}
//                 </div>
//             </div>
//             {showDietForm && (
//                 <>
//                     <div
//                         className="diet-form-overlay"
//                         onClick={() => setShowDietForm(false)}
//                     ></div>
//                     <DietForm
//                         meal={mealData}
//                         userId={userId}
//                         onClose={() => setShowDietForm(false)}
//                     />
//                 </>
//             )}
//         </>
//     );
// }

// export default SingleDietPage;
// export default SingleDietPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleDietPage.css";
import Userdashboard from "./Userdashboard";
import DietForm from "./DietForm";
import { useAuth } from "../context/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleDietPage() {
    const [auth, setAuth] = useAuth();
    const token = auth?.token;

    const [mealData, setMealData] = useState(null);
    const [showDietForm, setShowDietForm] = useState(false);
    const { id } = useParams();
    const [userId, setUserId] = useState("");
    const [userDiets, setUserDiets] = useState([]);


    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
          setUserId(String(storedUserId));
          fetchUserDiets(storedUserId);
        }
         // eslint-disable-line no-console
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
    

    const isMealAdded = userDiets.some(userDiet => userDiet.key === mealData._id);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/meal/${id}`);
                if (response.status === 200) {
                    setMealData(response.data.meals); // Assuming the response contains meal data directly
                    console.log(response);
                } else {
                    console.error("Meal not found");
                }
            } catch (error) {
                console.error("Error fetching meal data:", error);
            }
        };

        fetchMealData();

        return () => {
            // Cleanup function
        };
        // eslint-disable-line no-console
    }, [id]);

    const handleRemoveButtonClick = async () => {
        try {
            const userDiet = userDiets.find(userDiet => userDiet.key === mealData._id);

            if (!userDiet) {
                toast.error("Meal not found in user diets");
                return;
            }

            const goalId = userDiet.goalId;

            await axios.delete(`http://localhost:8080/api/v1/goal/diet/${userDiet.goalId}`, {
                headers: {
                    "Authorization": `${token}`,
                }
            });

            toast.success("Meal deleted successfully");
            fetchUserDiets(userId);
        } catch (error) {
            console.error("Error deleting meal:", error);
            toast.error("Failed to delete meal");
        }
    };

    return (
        <>
            <ToastContainer />
            <Userdashboard content={
                <div>
            <div className="diet-page" id="dietSidebarAdjustment">
                <div className="App">
                    {mealData ? (
                        <div className="container">
                            <div className="image-container">
                                <img src={mealData.photo} alt={mealData.name} />
                            </div>
                            <div className="text-container">
                                <div className="label">
                                    <center id="dietSidebarAdjustment">{mealData.name}</center>
                                </div>
                                <h2>Ingredients</h2>
                                <p className="instruction-para">{mealData.ingredients}</p>
                                <div className="button-container">
                                    <button
                                        className="add-button"
                                        disabled={isMealAdded}
                                        style={{ opacity: isMealAdded ? 0.5 : 1, cursor: isMealAdded ? "not-allowed" : "pointer" }}
                                        onClick={() => setShowDietForm(true)}

                                    >
                                        Add
                                    </button>
                                    <button className="remove-button" onClick={handleRemoveButtonClick}
                                        disabled={!isMealAdded}
                                        style={{ opacity: !isMealAdded ? 0.5 : 1, cursor: !isMealAdded ? "not-allowed" : "pointer" }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
            {showDietForm && (
                <>
                    <div
                        className="diet-form-overlay"
                        onClick={() => setShowDietForm(false)}
                    ></div>
                    <DietForm
                        meal={mealData}
                        userId={userId}
                        onClose={() => setShowDietForm(false)}
                        fetchUserDiets={fetchUserDiets}
                    />
                </>
            )}
            </div>
            } 
        />
        </>
    );
}

export default SingleDietPage;
