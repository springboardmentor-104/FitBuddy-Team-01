const express = require('express');
const router = express.Router();
// const {upload} = require('../middleware/uploadImageMiddleware')
const { getAllMealController,
        getMealByIdController, 
        findMealsByCategory,
        /* createPersonalDiet,updatePersonalDietStatus, deletePersonalDiet,  getAllPersonalDiets, getPersonalDietById*/
    } = require('../controllers/mealController')



// exercise
router.get('/meals', getAllMealController);
router.get('/:id', getMealByIdController);
router.get('/meals/:category', findMealsByCategory);

// personal exercise routes
/*
    // BUT IT IS NOT NECESSARY
    router.post('/personal-diets', createPersonalDiet);
    router.patch('/personal-diets/:id/status', updatePersonalDietStatus);
    router.delete('/personal-diets/:id', deletePersonalDiet);
    router.get('/personal-diets', getAllPersonalDiets);
    router.get('/personal-diets/:id', getPersonalDietById);
*/


module.exports = router