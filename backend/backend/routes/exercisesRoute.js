const express = require('express');
const router = express.Router();
// const {upload} = require('../middleware/uploadImageMiddleware')
const {createExerciseController, getAllExercisesController, getExerciseByIdController, findExercisesByCategoryAndDifficulty} = require('../controllers/exerciseController')


// exercise
router.post('/createExercise', createExerciseController);
router.get('/exercises', getAllExercisesController);
router.get('/exercises/:id', getExerciseByIdController);
router.get('/exercises/:category/:difficulty', findExercisesByCategoryAndDifficulty);

// personal exercise routes

router.post('/create-exercise')



module.exports = router