const express = require('express');
const router = express.Router();
// const {upload} = require('../middleware/uploadImageMiddleware')
const { getAllMealController,getMealByIdController, findMealsByCategory} = require('../controllers/mealController')


// exercise
router.get('/meals', getAllMealController);
router.get('/:id', getMealByIdController);
router.get('/meals/:category', findMealsByCategory);

// personal exercise routes

router.post('/create-exercise')



module.exports = router