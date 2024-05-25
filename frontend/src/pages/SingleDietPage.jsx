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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import "./SingleDietPage.css";
import Userdashboard from "./Userdashboard";
import DietForm from "./DietForm";
import { useAuth } from "../context/auth"

function SingleDietPage() {
    const [auth] = useAuth();

    const [mealData, setMealData] = useState(null);
    const [showDietForm, setShowDietForm] = useState(false);
    const { id } = useParams();
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (auth?.userId) {
            setUserId(auth.userId);
        }
    }, [auth]);

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
    }, [id]);

    const handleSubmitDiet = async () => {
        // Your submission logic
    };

    return (
        <>
            <Userdashboard />
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
                                        onClick={() => setShowDietForm(true)}
                                    >
                                        Add
                                    </button>
                                    <button className="remove-button" onClick={() => { }}>
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
                    />
                </>
            )}
        </>
    );
}

export default SingleDietPage;
    