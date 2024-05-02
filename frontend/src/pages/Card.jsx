import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(C:\Users\Shivankush\Desktop\FitBuddy-Team-01\frontend\src\Assets\HammerCurls.jpg)`,
        }}
      ></div>
      <div className="card-label">Hammer Curls</div>
      <div className="button-container">
        <button className="add-button">Add</button>
        <button className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default Card;
