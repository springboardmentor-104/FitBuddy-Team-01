import React from 'react';
import { Link } from 'react-router-dom';
import './DietCard.css';

const DietCard = ({ meal, onAdd, userId }) => {
  const { _id, name, photo, category, calories, protein, fat } = meal; // Destructure meal properties

  const handleAddButtonClick = () => {
    onAdd(name, _id, category, userId); // Pass meal name, ID, category, and userId to DietPage
  };

  return (
    <div className="diet-card">
      <Link to={`/SingleDietPage/${_id}`} className="diet-link"> {/* Pass _id as parameter */}
        <div className="diet-image" style={{ backgroundImage: `url(${photo})` }}>
          <div className="overlay">
            <div className="diet-name">{name}</div>
          </div>
        </div>
      </Link>
      <div className="diet-details">
        {/* <div className="diet-nutrients">
          <div className="diet-calories"><span>Calories:</span> {calories}</div>
          <div className="diet-protein"><span>Protein:</span> {protein}</div>
          <div className="diet-fat"><span>Fat:</span> {fat}</div>
        </div> */}
        <div className="button-container">
          <button className="add-button" onClick={handleAddButtonClick}>Add</button>
          <button className="remove-button">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default DietCard;
