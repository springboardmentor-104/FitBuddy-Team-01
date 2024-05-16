const express = require('express');
const router = express.Router();

const { 
    createExercise, updateExerciseStatus, deleteExercise, getAllExercises, getExerciseById,
    createDiet, updateDietStatus, deleteDiet, getAllDiets, getDietById
 } = require('../controllers/historyController')

 
    // Goal exercise 
router.post('/exercise', createExercise);
router.put('/exercise/:id/status', updateExerciseStatus);
router.delete('/exercise/:id', deleteExercise);
router.get('/exercises', getAllExercises);
router.get('/exercise/:id', getExerciseById);

// Routes for diet operations
router.post('/diet', createDiet);
router.put('/diet/:id/status', updateDietStatus);
router.delete('/diet/:id', deleteDiet);
router.get('/diets', getAllDiets);
router.get('/diet/:id', getDietById);

module.exports = router
