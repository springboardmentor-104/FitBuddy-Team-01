const Meal = require('../modles/dietModel'); // Singular 'Meal' instead of 'Meals'



// show all Meal
const getAllMealController = async (req, res) => {
    try {
        const meals = await Meal.find();
        if (!meals) {
            return res.send({success:false, message: 'Meal not found' });
        }
        return res.send({success:true ,meals});
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}

// show Meal id wise
const getMealByIdController = async (req, res) => {
    try {
        const meals = await Meal.findById(req.params.id);
        if (!meals) {
            return res.send({success:false, message: 'Meal not found' });
        }

        return res.send({success:true,meals});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// find by difficulty
const findMealsByCategory = async (req, res) => {
    try {
        const { category } = req.params; // Assuming both category and difficulty are passed as URL parameters
        
        // Validate category
        const validCategories = ['breakfast', 'lunch', 'dinner', 'other'];
        if (!validCategories.includes(category)) {
            return res.send({ success: false, message: "Invalid category" });
        }

        // Find Meals by category and difficulty
        const meals = await Meal.find({ category });

        // Check if Meals were found
        if (meals.length === 0) {
            return res.send({ success: false, message: "No Meals found in this category and difficulty" });
        }

        // Return found Meals
        return res.status(200).json({ success: true, meals });
    } catch (error) {
        console.error("Error finding Meals by category and difficulty:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}





module.exports = { getAllMealController,getMealByIdController, findMealsByCategory};