import React from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, onAdd }) => {
  const { name, photo } = exercise;

  return (
    <div className="exercise-card">
      <div className="exercise-image" style={{ backgroundImage: `url(${photo})` }}>
        <div className="overlay">
          <div className="exercise-name">{name}</div>
        </div>
      </div>
      <div className="button-container">
        <button className="add-button" onClick={() => onAdd(name)}>Add</button>
        <button className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default ExerciseCard;
