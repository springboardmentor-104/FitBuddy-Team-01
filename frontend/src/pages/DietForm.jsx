import React, { useState } from "react";
import axios from "axios";
import "./DietForm.css"; // Import the CSS file

const DietForm = ({ meal, userId, onClose }) => {
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
      const currentDate = new Date().toISOString();
      const formData = {
        userId,
        mealId: meal._id,
        name: meal.name,
        timeToEat,
        quantity: parseInt(quantity),
        calories: parseInt(calories),
        currentdate: currentDate,
      };
      
      const response = await axios.post(
        "http://localhost:8080/api/diets/userSelectDiets",
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit diet data');
      }

      setTimeToEat("");
      setQuantity("");
      setCalories("");
      setErrors({});

      alert("Diet data submitted successfully");

      onClose();
    } catch (error) {
      console.error("Error submitting diet data:", error.message);
      alert("Failed to submit diet data. Please try again later.");
    }
  };

  return (
    <div className="diet-form-overlay">
      <div className="diet-form-container">
        <h2 className="diet-form-title">Enter {meal.name} Data</h2>
        <form onSubmit={handleSubmit} className="diet-form">
          <div>
            <label htmlFor="timeToEat">Meal Time:</label>
            <select
              id="timeToEat"
              value={timeToEat}
              onChange={(e) => setTimeToEat(e.target.value)}
              className="diet-form-input"
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
              className="diet-form-input"
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
              className="diet-form-input"
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
  );
};

export default DietForm;
