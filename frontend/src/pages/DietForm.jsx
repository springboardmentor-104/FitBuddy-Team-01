// import React, { useState } from "react";
// import axios from "axios";
// import "./ExerciseForm.css"; // Import the CSS file
// import { ToastContainer, toast } from 'react-toastify';
// import { useAuth } from '../context/auth';

// const DietForm = ({ meal, userId, onClose }) => {

//   const [auth] = useAuth();
//   const token = auth?.token;

//   const [timeToEat, setTimeToEat] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [calories, setCalories] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!timeToEat || !quantity || !calories) {
//       setErrors({
//         timeToEat: !timeToEat ? "Please select a meal time" : "",
//         quantity: !quantity ? "Please enter quantity" : "",
//         calories: !calories ? "Please enter calories" : "",
//       });
//       return;
//     }

//     try {
//       const formData = {
//         userId,
//         name: meal.name,
//         key: meal._id,
//         category:timeToEat,
//         quantity: parseInt(quantity),
//         calories: parseInt(calories),
//       };
      
//       const response = await axios.post(
//         "http://localhost:8080/api/diets/userSelectDiets",
//         formData
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to submit diet data');
//       }

//       setTimeToEat("");
//       setQuantity("");
//       setCalories("");
//       setErrors({});

//       alert("Diet data submitted successfully");

//       onClose();
//     } catch (error) {
//       console.error("Error submitting diet data:", error.message);
//       alert("Failed to submit diet data. Please try again later.");
//     }
//   };

//   return (
//     <div className="diet-form-overlay">
//       <div className="diet-form-container">
//         <h2 className="diet-form-title">Enter {meal.name} Data</h2>
//         <form onSubmit={handleSubmit} className="diet-form">
//           <div>
//             <label htmlFor="timeToEat">Meal Time:</label>
//             <select
//               id="timeToEat"
//               value={timeToEat}
//               onChange={(e) => setTimeToEat(e.target.value)}
//               className="diet-form-input"
//             >
//               <option value="">Select meal time</option>
//               <option value="breakfast">Breakfast</option>
//               <option value="lunch">Lunch</option>
//               <option value="dinner">Dinner</option>
//             </select>
//             {errors.timeToEat && (
//               <span className="text-red-500 text-sm">{errors.timeToEat}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="quantity">Quantity:</label>
//             <input
//               id="quantity"
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="diet-form-input"
//             />
//             {errors.quantity && (
//               <span className="text-red-500 text-sm">{errors.quantity}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="calories">Calories:</label>
//             <input
//               id="calories"
//               type="number"
//               value={calories}
//               onChange={(e) => setCalories(e.target.value)}
//               className="diet-form-input"
//             />
//             {errors.calories && (
//               <span className="text-red-500 text-sm">{errors.calories}</span>
//             )}
//           </div>
          
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//           &ensp;
//           <button className="btn btn-secondary" onClick={onClose}>
//             Close
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DietForm;
import React, { useState } from "react";
import axios from "axios";
import "./ExerciseForm.css"; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';

const DietForm = ({ meal, userId, onClose, fetchUserDiets }) => {
  const [auth] = useAuth();
  const token = auth?.token;

  const [timeToEat, setTimeToEat] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timeToEat || !quantity || !calories) {
      setErrors({
        timeToEat: !timeToEat ? "Please select a meal time" : "",
        quantity: !quantity ? "Please enter quantity" : "",
        calories: !calories ? "Please enter calories" : "",
      });
      return;
    }

    try {
      const dietData = {
        userId,
        name: meal.name,
        key: meal._id,
        timeToEat: timeToEat,
        quantity: parseInt(quantity),
        calories: parseInt(calories),
      };
      
      const response = await axios.post(
        "http://localhost:8080/api/v1/goal/diet",
        { dietArr: [dietData] },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      
      fetchUserDiets(auth?.userId);

      // Reset form fields and errors
      setTimeToEat("");
      setQuantity("");
      setCalories("");
      setErrors({});
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error submitting diet data:", error.message);
      toast.error("Failed to submit diet data. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="exercise-form-overlay">
        <div className="exercise-form-container">
          <h2 className="exercise-form-title">Enter {meal.name} Data</h2>
          <form onSubmit={handleSubmit} className="diet-form">
            <div>
              <label htmlFor="timeToEat">Meal Time:</label>
              <select
                id="timeToEat"
                value={timeToEat}
                onChange={(e) => setTimeToEat(e.target.value)}
                className="exercise-form-input"
              >
                <option value="">Select meal time</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
              {errors.timeToEat && (
                <span className="text-red-500 text-sm">{errors.timeToEat}</span>
              )}
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="exercise-form-input"
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm">{errors.quantity}</span>
              )}
            </div>
            <div>
              <label htmlFor="calories">Calories:</label>
              <input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="exercise-form-input"
              />
              {errors.calories && (
                <span className="text-red-500 text-sm">{errors.calories}</span>
              )}
            </div>
            
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            &ensp;
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DietForm;
