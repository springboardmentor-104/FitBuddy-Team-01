import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';
import ExerciseForm from './ExerciseForm';
import './ExercisePage.css';
import Userdashboard from './Userdashboard';

const ExercisePage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedExerciseName, setSelectedExerciseName] = useState('');

  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8080/api/exercises/all';
      if (selectedType) {
        url += `/search/${selectedType}`;
      }
      const response = await axios.get(url);
      setExercises(response.data.exercises || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  }, [selectedType]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setDropdownVisible(scrollTop === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTypeChange = (event) => {
    const type = event.target.value.toLowerCase();
    setSelectedType(type);
  };

  const toggleExerciseForm = (exerciseName) => {
    setSelectedExerciseName(exerciseName);
    setShowExerciseForm(!showExerciseForm);
  };

  return (
    <>
    <Userdashboard/>
    <div className="exercise-page" id="exerciseSidebarAdjustment">
      <div className={`dropdown-container ${dropdownVisible ? 'visible' : 'hidden'}`}>
        <div className="select-wrapper">
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">All Exercises</option>
            <option value="strength">Strength</option>
            <option value="yoga">Yoga</option>
            <option value="cardio">Cardio</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="card-container" style={{ marginTop: dropdownVisible ? '50px' : '0' }}>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : exercises.length === 0 ? (
          <div className="no-exercises">No exercises found for the selected category.</div>
        ) : (
          exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} exercise={exercise} onAdd={toggleExerciseForm} />
          ))
        )}
      </div>

      {showExerciseForm && (
        <>
          <div className="exercise-form-overlay" onClick={() => setShowExerciseForm(false)}></div>
          <ExerciseForm exerciseName={selectedExerciseName} onClose={() => setShowExerciseForm(false)} />
        </>
      )}
    </div>
    </>
  );
};

export default ExercisePage;
