const express = require('express');
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");
const { 
    createExercise, updateGoalStatus, deleteExercise, getAllExercises, getExerciseById,
    createDiet, updateDietStatus, deleteDiet, getAllDiets, getDietById
 } = require('../controllers/historyController')

 
    // Goal exercise 
router.post('/exercise',requireSignIn, createExercise);
router.put('/update/:id/status',requireSignIn, updateGoalStatus);
router.delete('/exercise/:id',requireSignIn, deleteExercise);
router.get('/exercises', requireSignIn,getAllExercises);
router.get('/exercise/:id',requireSignIn, getExerciseById);

// Routes for diet operations
router.post('/diet', requireSignIn,createDiet);
router.put('/diet/:id/status', requireSignIn,updateDietStatus);
router.delete('/diet/:id',requireSignIn, deleteDiet);
router.get('/diets',requireSignIn, getAllDiets);
router.get('/diet/:id', requireSignIn,getDietById);

module.exports = router
