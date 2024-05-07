import React from 'react';
import { Link } from 'react-router-dom';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, onAdd, userId }) => {
  const { _id, name, photo, category } = exercise;

  const handleAddButtonClick = () => {
    onAdd(name, _id, category, userId); // Pass exercise name, ID, category, and userId to ExercisePage
  };

  return (
    <div className="exercise-card">
      <Link to={`/SingleExercisePage/${_id}`} className="exercise-link"> {/* Pass _id as parameter */}
        <div className="exercise-image" style={{ backgroundImage: `url(${photo})` }}>
          <div className="overlay">
            <div className="exercise-name">{name}</div>
          </div>
        </div>
      </Link>
      <div className="button-container">
        <button className="add-button" onClick={handleAddButtonClick}>Add</button>
        <button className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default ExerciseCard;
