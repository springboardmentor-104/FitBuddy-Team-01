const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'
const GoalExercise = require('../modles/personalExercise');
const GoalDiet = require('../modles/personalDiets');
const History = require('../modles/historyModel');


// ***************** MAIN API FOR HISTORY ******************************//
const todayHistoryController = async (req, res) => {
    try {
        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Find the history documents for the user for the current date
        const userHistory = await History.find({ userId: req.params.id, createdAt: currentDate })
            .populate({
                path: 'goalId',
                populate: {
                    path: 'goalId',
                    model: 'goalExercise'
                },
                match: { type: 'exercise' }
            })
            .populate({
                path: 'goalId',
                populate: {
                    path: 'goalId',
                    model: 'goalDiet'
                },
                match: { type: 'diet' }
            });

        if (!userHistory || userHistory.length === 0) {
            return res.status(404).json({ message: 'No data found for the current date' });
        }

        
        res.json(userHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showAllHistoryController = async (req, res) => {
    try {
        // Find all history entries for the user, sorted by date in descending order
        const userId = req.user._id;
        const allHistory = await History.find({ userId: userId })
            .populate({
                path: 'goalId',
                populate: {
                    path: 'goalId',
                    model: 'goalExercise'
                },
                match: { type: 'exercise' }
            })
            .populate({
                path: 'goalId',
                populate: {
                    path: 'goalId',
                    model: 'goalDiet'
                },
                match: { type: 'diet' }
            })
            .sort({ createdAt: -1 }); // Sort in descending order of creation date

        res.json(allHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ******************* to make personal exercise api are here ***********************//

// BUT IT IS NOT NECESSARY
const createExercise = async (req, res) => {
    try {
        const { userId, name, category, sets, time } = req.body;
        const currentDate = new Date().toISOString().split('T')[0];
        let exercise = await GoalExercise.findOne({ userId, name, date: currentDate });
        if (!exercise) {
            exercise = new GoalExercise({ userId, name, category, sets, time, date: currentDate });
            await exercise.save();
        }

        // Create a new history entry
        const historyEntry = new History({
            userId,
            goalId: exercise._id, // Link to the created exercise
            type: 'exercise', // Specify the type as 'exercise'
            status: 'pending', // Default status
            createdAt: currentDate
        });

        await historyEntry.save();

        return res.status(201).json({
            success:true,
            message:"exericse added to your task list",
            historyEntry
        });
    } catch (error) {
        res.status(201).json({
            success:false,
            message:"something went wrong",
        });    
    }
};


// Update status of an exercise by ID
const updateExerciseStatus = async (req, res) => {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        const currentDate = new Date().toISOString().split('T')[0];

        // Find the history entry for the current date and exercise
        const historyEntry = await History.findOne({ userId: exercise.userId, goalId: exercise._id, type: 'exercise', createdAt: currentDate });

        if (!historyEntry) {
            return res.status(403).json({ message: 'Cannot update exercise status as it is not logged for the current date' });
        }

        // Update the status and completedAt date in the history entry
        historyEntry.status = req.body.status;
        historyEntry.completedAt = req.body.status === 'completed' ? new Date() : null;
        await historyEntry.save();

        res.json(historyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete an exercise by ID
const deleteExercise = async (req, res) =>   {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Delete associated history entries
        await History.deleteMany({ goalId: exercise._id, type: 'exercise' });

        // Delete the exercise from GoalExercise collection
        await exercise.deleteOne();

        res.json({success:true, message: 'Exercise deleted from both GoalExercise and History collections' });
    } catch (error) {
        res.status(500).json({success:false, message: 'something went wrong' });
    }
};

// Get all exercises
const getAllExercises = async (req, res) => {
    try {
        const exercises = await GoalExercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an exercise by ID
const getExerciseById = async (req, res) => {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ******************* to make personal diet api are here ***********************//


// Create a new diet

const createDiet = async (req, res) => {
    try {
        const { userId, name, category, quantity, calories } = req.body;

        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];

        // Find or create the GoalDiet
        let diet = await GoalDiet.findOne({ userId, name, date: currentDate });
        if (!diet) {
            // If GoalDiet doesn't exist, create a new one
            diet = new GoalDiet({ userId, name, category, quantity, calories, date: currentDate });
            await diet.save();
        }

        // Create a new history entry
        const historyEntry = new History({
            userId,
            goalId: diet._id, // Link to the created diet
            type: 'diet', // Specify the type as 'diet'
            status: 'pending', // Default status
            createdAt: currentDate
        });

        await historyEntry.save();

        return res.status(201).json({
            success:true,
            message:"exericse added to your task list",
            historyEntry
        });
    } catch (error) {
         res.status(201).json({
            success:false,
            message:"something went wrong",
        });
    }
};


// Update status of a diet by ID
const updateDietStatus = async (req, res) => {
    try {
        const diet = await GoalDiet.findById(req.params.id);
        if (!diet) {
            return res.status(404).json({ message: 'Diet not found' });
        }

        const currentDate = new Date().toISOString().split('T')[0];

        // Find the history entry for the current date and diet
        const historyEntry = await History.findOne({ userId: diet.userId, goalId: diet._id, type: 'diet', createdAt: currentDate });

        if (!historyEntry) {
            return res.status(403).json({ message: 'Cannot update diet status as it is not logged for the current date' });
        }

        // Update the status and completedAt date in the history entry
        historyEntry.status = req.body.status;
        historyEntry.completedAt = req.body.status === 'completed' ? new Date() : null;
        await historyEntry.save();

        res.json(historyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a diet by ID
const deleteDiet = async (req, res) => {
    try {
        const diet = await GoalDiet.findById(req.params.id);
        if (!diet) {
            return res.status(404).json({ message: 'Diet not found' });
        }

        // Delete associated history entries
        await History.deleteMany({ goalId: diet._id, type: 'diet' });

        // Delete the diet from GoalDiet collection
        await diet.deleteOne();

        res.json({success:true, message: 'Diet deleted from both GoalDiet and History collections' });
    } catch (error) {
        res.status(500).json({success:false, message: 'something went wrong' });
    }
};

// Get all diets
const getAllDiets = async (req, res) => {
    try {
        const diets = await GoalDiet.find();
        res.json(diets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a diet by ID
const getDietById = async (req, res) => {
    try {
        const diet = await GoalDiet.findById(req.params.id);
        if (diet) {
            res.json(diet);
        } else {
            res.status(404).json({ message: 'Diet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createExercise, updateExerciseStatus, deleteExercise, getAllExercises, getExerciseById,
    createDiet, updateDietStatus, deleteDiet, getAllDiets, getDietById,
    todayHistoryController, showAllHistoryController
};




