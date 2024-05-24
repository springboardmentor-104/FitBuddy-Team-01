import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DietCard from "./DietCard";
import DietForm from "./DietForm";
import "./DietPage.css";
import Userdashboard from "./Userdashboard";

const DietPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [showDietForm, setShowDietForm] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(String(storedUserId));
    }
  }, []);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      let url = "http://localhost:8080/api/meals/all";
      if (selectedType) {
        url += `/search/${selectedType}`;
      }
      const response = await axios.get(url);
      setMeals(response.data.meals || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }, [selectedType]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setDropdownVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value.toLowerCase();
    setSelectedType(type);
  };

  const toggleDietForm = (mealName, mealId, category, userId) => {
    setSelectedMeal({ name: mealName, _id: mealId, category });
    setShowDietForm(!showDietForm);
  };

  return (
    <>
      <Userdashboard />
      <div className="diet-page" id="dietSidebarAdjustment">
        <div
          className={`dropdown-container ${
            dropdownVisible ? "visible" : "hidden"
          }`}
        >
          <div className="select-wrapper">
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="">All Meals</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
        </div>

        <div
          className="card-container"
          style={{ marginTop: dropdownVisible ? "50px" : "0" }}
        >
          {loading ? (
            <div className="loading">Loading...</div>
          ) : meals.length === 0 ? (
            <div className="no-meals">
              No meals found for the selected category.
            </div>
          ) : (
            meals.map((meal) => (
              <DietCard
                key={meal._id}
                meal={meal}
                onAdd={(mealName, mealId, category) =>
                  toggleDietForm(mealName, mealId, category, userId)
                }
                userId={userId}
              />
            ))
          )}
        </div>

        {showDietForm && selectedMeal && (
          <DietForm
            meal={selectedMeal}
            userId={userId}
            onClose={() => setShowDietForm(false)}
          />
        )}
      </div>
    </>
  );
};

export default DietPage
