const express = require("express");
const router = express.Router();
// const {upload} = require('../middleware/uploadImageMiddleware')
const { 
        createExerciseController, 
        getAllExercisesController, 
        getExerciseByIdController, 
        findExercisesByCategoryAndDifficulty,
        findExercisesByCategory
     } = require('../controllers/exerciseController')


// exercise
router.post('/createExercise', createExerciseController);
router.get('/all', getAllExercisesController);
router.get('/exercises/:id', getExerciseByIdController);
router.get('/exercises/:category/:difficulty', findExercisesByCategoryAndDifficulty);
router.get('/all/search/:category', findExercisesByCategory);





module.exports = router;