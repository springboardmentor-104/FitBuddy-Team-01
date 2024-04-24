const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/uploadImageMiddleware')
const { requireSignIn } = require('../middleware/authMiddleware');
const {createExerciseController, getAllExercisesController, getExerciseByIdController} = require('../controllers/exerciseController')


// exercise
router.post('/create-exercise',upload.single("photo"), createExerciseController);

router.get('/exercises', getAllExercisesController);
router.get('/exercises/:id', getExerciseByIdController);





module.exports = router