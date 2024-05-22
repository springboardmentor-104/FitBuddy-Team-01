// import React, { useState } from "react";
// import axios from "axios";
// import "./ExerciseForm.css"; // Import the CSS file
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/auth'; 

// const ExerciseForm = ({ exercise, userId, onClose }) => {
//   const [auth, setAuth] = useAuth();
//   const token = auth?.token;

//   const [sets, setSets] = useState("");
//   const [timeToPerformExercise, setTimeToPerformExercise] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!sets || !timeToPerformExercise) {
//       setErrors({
//         sets: !sets ? "Please enter number of sets" : "",
//         timeToPerformExercise: !timeToPerformExercise
//           ? "Please enter time to perform exercise"
//           : "",
//       });
//       return;
//     }

//     try {
//       const userId = auth.userId;
//       const data = {
//         userId: userId,
//         name : exerciseName,
//       };
//       let config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: "http://localhost:8080/api/v1/goal/exercise",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `${token}`, // Add token to Authorization header
//         },
//         data: data,
//       };
      
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/goal/exercise",{
//           headers: {
//             Authorization: `${token}`
//           }
//         },
//         formData
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to submit exercise data');
//       }

//       // Reset form fields and errors
//       setSets("");
//       setTimeToPerformExercise("");
//       setErrors({});

//       // Show success message
//       alert("Exercise data submitted successfully");

//       // Close the form
//       onClose();
//     } catch (error) {
//       console.error("Error submitting exercise data:", error.message);
//       // Show error message
//       alert("Failed to submit exercise data. Please try again later.");
//     }
//   };

//   return (
//     <div className="exercise-form-overlay">
//       <ToastContainer/>
//       <div className="exercise-form-container">
//         <h2 className="exercise-form-title">Enter {exercise.name} Set Data</h2>
//         <form onSubmit={handleSubmit} className="exercise-form">
//           <div>
//             <label htmlFor="sets">Number of Sets:</label>
//             <input
//               id="sets"
//               type="number"
//               value={sets}
//               onChange={(e) => setSets(e.target.value)}
//               className="exercise-form-input"
//             />
//             {errors.sets && (
//               <span className="text-red-500 text-sm">{errors.sets}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="timeToPerformExercise">Time to Perform Exercise (minutes):</label>
//             <input
//               id="timeToPerformExercise"
//               type="number"
//               value={timeToPerformExercise}
//               onChange={(e) => setTimeToPerformExercise(e.target.value)}
//               className="exercise-form-input"
//             />
//             {errors.timeToPerformExercise && (
//               <span className="text-red-500 text-sm">{errors.timeToPerformExercise}</span>
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

// export default ExerciseForm;

// import React, { useState } from "react";
// import axios from "axios";
// import "./ExerciseForm.css"; // Import the CSS file
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/auth'; 

// const ExerciseForm = ({ exercise, id, onClose }) => {
//   const [auth] = useAuth();
//   const token = auth?.token;

//   const [sets, setSets] = useState("");
//   const [timeToPerformExercise, setTimeToPerformExercise] = useState("");
//   const [errors, setErrors] = useState({});
//   const [exercises, setExercises] = useState([])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!sets || !timeToPerformExercise) {
//       setErrors({
//         sets: !sets ? "Please enter number of sets" : "",
//         timeToPerformExercise: !timeToPerformExercise
//           ? "Please enter time to perform exercise"
//           : "",
//       });
//       return;
//     }
//     try {
//       const data = {
//         name: exercise.name,
//         category: exercise.category,
//         sets,
//         time: timeToPerformExercise,
//       };
//       setExercises(data);
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/goal/exercise", 
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`, // Add token to Authorization header
//           },
//         }
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to submit exercise data');
//       }

//       // Reset form fields and errors
//       setSets("");
//       setTimeToPerformExercise("");
//       setErrors({});

//       // Show success message
//       toast.success("Exercise data submitted successfully");

//       // Close the form
//       onClose();
//     } catch (error) {
//       console.error("Error submitting exercise data:", error.message);
//       // Show error message
//       toast.error("Failed to submit exercise data. Please try again later.");
//     }
//   };

//   return (
//     <div className="exercise-form-overlay">
//       <ToastContainer/>
//       <div className="exercise-form-container">
//         <h2 className="exercise-form-title">Enter {exercise.name} Set Data</h2>
//         <form onSubmit={handleSubmit} className="exercise-form">
//           <div>
//             <label htmlFor="sets">Number of Sets:</label>
//             <input
//               id="sets"
//               type="number"
//               value={sets}
//               onChange={(e) => setSets(e.target.value)}
//               className="exercise-form-input"
//             />
//             {errors.sets && (
//               <span className="text-red-500 text-sm">{errors.sets}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="timeToPerformExercise">Time to Perform Exercise (minutes):</label>
//             <input
//               id="timeToPerformExercise"
//               type="number"
//               value={timeToPerformExercise}
//               onChange={(e) => setTimeToPerformExercise(e.target.value)}
//               className="exercise-form-input"
//             />
//             {errors.timeToPerformExercise && (
//               <span className="text-red-500 text-sm">{errors.timeToPerformExercise}</span>
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

// export default ExerciseForm;

import React, { useState } from "react";
import axios from "axios";
import "./ExerciseForm.css"; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth'; 

const ExerciseForm = ({ exercise, userId, onClose }) => {
  const [auth] = useAuth();
  const token = auth?.token;

  const [sets, setSets] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sets || !time) {
      setErrors({
        sets: !sets ? "Please enter number of sets" : "",
        time: !time ? "Please enter time to perform exercise" : "",
      });
      return;
    }

    try {
      const exerciseData = [
        {
          userId,
          name: exercise.name,
          category: exercise.category,
          sets,
          time,
        },
      ];

      const response = await axios.post(
        "http://localhost:8080/api/v1/goal/exercise",
        { exerciseArr: exerciseData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Add token to Authorization header
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit exercise data');
      }

      // Reset form fields and errors
      setSets("");
      setTime("");
      setErrors({});

      // Show success message
      toast.success("Exercise data submitted successfully");

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error submitting exercise data:", error.message);
      // Show error message
      toast.error("Failed to submit exercise data. Please try again later.");
    }
  };

  return (
    <div className="exercise-form-overlay">
      <ToastContainer/>
      <div className="exercise-form-container">
        <h2 className="exercise-form-title">Enter {exercise.name} Set Data</h2>
        <form onSubmit={handleSubmit} className="exercise-form">
          <div>
            <label htmlFor="sets">Number of Sets:</label>
            <input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="exercise-form-input"
            />
            {errors.sets && (
              <span className="text-red-500 text-sm">{errors.sets}</span>
            )}
          </div>
          <div>
            <label htmlFor="time">Time to Perform Exercise (minutes):</label>
            <input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="exercise-form-input"
            />
            {errors.time && (
              <span className="text-red-500 text-sm">{errors.time}</span>
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
  );
};

export default ExerciseForm;
