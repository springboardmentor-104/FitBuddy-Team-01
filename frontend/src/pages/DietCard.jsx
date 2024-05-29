// import React from 'react';
// import { Link } from 'react-router-dom';
// import './DietCard.css';

// const DietCard = ({ meal, onAdd, userId }) => {
//   const { _id, name, photo, category, calories, protein, fat } = meal; // Destructure meal properties

//   const handleAddButtonClick = () => {
//     onAdd(name, _id, category, userId); // Pass meal name, ID, category, and userId to DietPage
//   };

//   return (
//     <div className="diet-card">
//       <Link to={`/SingleDietPage/${_id}`} className="diet-link"> {/* Pass _id as parameter */}
//         <div className="diet-image" style={{ backgroundImage: `url(${photo})` }}>
//           <div className="overlay">
//             <div className="diet-name">{name}</div>
//           </div>
//         </div>
//       </Link>
//       <div className="diet-details">
//         {/* <div className="diet-nutrients">
//           <div className="diet-calories"><span>Calories:</span> {calories}</div>
//           <div className="diet-protein"><span>Protein:</span> {protein}</div>
//           <div className="diet-fat"><span>Fat:</span> {fat}</div>
//         </div> */}
//         <div className="button-container">
//           <button className="add-button" onClick={handleAddButtonClick}>Add</button>
//           <button className="remove-button">Remove</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DietCard;
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import "./DietCard.css";

const DietCard = ({ meal, onAdd, userId, userDiets, token, fetchUserDiets }) => {
  const { _id, name, photo, category } = meal;

  const isMealAdded = userDiets.some(userDiet => userDiet.key === _id);

  const handleAddButtonClick = () => {
    onAdd(name, _id, category, userId);
  };

  const handleRemoveButtonClick = async () => {
    try {
      const userDiet = userDiets.find(userDiet => userDiet.key === _id);

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
    <div className="diet-card">
      <Link to={`/SingleDietPage/${_id}`} className="diet-link">
        <div
          className="diet-image"
          style={{ backgroundImage: `url(${photo})` }}
        >
          <div className="overlay">
            <div className="diet-name">{name}</div>
          </div>
        </div>
      </Link>
      <div className="button-container">
        <button
          className="add-button"
          onClick={handleAddButtonClick}
          disabled={isMealAdded}
          style={{ opacity: isMealAdded ? 0.5 : 1, cursor: isMealAdded ? "not-allowed" : "pointer" }}
        >
          Add
        </button>

        <button
          className="remove-button"
          onClick={handleRemoveButtonClick}
          disabled={!isMealAdded}
          style={{ opacity: !isMealAdded ? 0.5 : 1, cursor: !isMealAdded ? "not-allowed" : "pointer" }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default DietCard;
