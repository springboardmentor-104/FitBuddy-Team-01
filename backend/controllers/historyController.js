const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'
const GoalExercise = require('../modles/personalExercise');
const GoalDiet = require('../modles/personalDiets');
const History = require('../modles/historyModel');


// ***************** MAIN API FOR HISTORY ******************************//
const todayHistoryController = async (req, res) => {
    try {
        // Get the current date in UTC timezone
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(currentDate)
        
        // Find the user history document for the current date
        const userHistory = await History.findOne({ userId: req.params.id, date: currentDate })
            .populate({
                path: 'exercises.eid',
                model: 'goalExercise'
            })
            .populate({
                path: 'diets.did',
                model: 'goalDiet'
            });

        if (!userHistory) {
            return res.status(404).json({ message: 'No data found for the current date' });
        }

        res.json(userHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showAllHistoryController = async(req,res)=>{
    try {
        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];

        // Find all history entries where the date is less than today's date
        const previousHistory = await History.find({ date: { $lt: currentDate } })
            .populate({
                path: 'exercises.eid',
                model: 'goalExercise'
            })
            .populate({
                path: 'diets.did',
                model: 'goalDiet'
            })
            .sort({ date: -1 }); // Sort in descending order of date

        res.json(previousHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ******************* to make personal exercise api are here ***********************//

// BUT IT IS NOT NECESSARY
const createExercise = async (req, res) => {
    try {
        const { userId, name, category, sets, time } = req.body;
        
        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Check if there's existing history for the current date
        let historyEntry = await History.findOne({ userId, date: currentDate });

        // If no history entry exists for today, create a new one
        if (!historyEntry) {
            historyEntry = new History({ userId, date: currentDate });
        }

        // Find or create the GoalExercise
        let exercise = await GoalExercise.findOne({ name });
        if (!exercise) {
            // If GoalExercise doesn't exist, create a new one
            exercise = new GoalExercise({ userId, name, category, sets, time, date:currentDate });
            await exercise.save();
        }

        // Add the exercise ID to history
        historyEntry.exercises.push({ eid: exercise._id });
        await historyEntry.save();

        res.status(201).json(historyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update status of an exercise by ID
const updateDietStatus = async (req, res) => {
    try {
        const diet = await GoalDiet.findById(req.params.id);
        if (!diet) {
            return res.status(404).json({ message: 'Diet not found' });
        }
        const currentDate = new Date().toISOString().split('T')[0];

        // Check if the diet date matches the current date
        const historyEntry = await History.findOne({date:currentDate, diets: { $elemMatch: { did: diet._id} } });
        if (!historyEntry) {
            return res.status(403).json({ message: 'Cannot update diet status as it is not for the current date' });
        }

        diet.status = req.body.status;
        await diet.save();
        res.json(diet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an exercise by ID
const deleteExercise = async (req, res) => {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        
        // Check if there are any history entries containing the exercise ID
        const historyEntries = await History.find({ "exercises.eid": exercise._id });
        
        // If there are no history entries, delete the exercise from GoalExercise collection
        if (historyEntries.length === 0) {
            await exercise.deleteOne();
            return res.json({ message: 'Exercise deleted' });
        }
        
        // If history entries exist, remove the exercise sub-object from the exercises array in History
        await History.updateMany(
            { "exercises.eid": exercise._id },
            { $pull: { exercises: { eid: exercise._id } } }
        );
        
        // Delete the exercise from GoalExercise collection
        await exercise.deleteOne();
        
        res.json({ message: 'Exercise deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        
        // Check if there's existing history for the current date
        let historyEntry = await History.findOne({ userId, date: currentDate });
        console.log("error1")
        // If no history entry exists for today, create a new one
        if (!historyEntry) {
            historyEntry = new History({ userId, date: currentDate });
        }
        console.log("error2")

        // Find or create the GoalDiet
        let diet = await GoalDiet.findOne({ name });
        console.log("error3")

        if (!diet) {
            // If GoalDiet doesn't exist, create a new one
            diet = new GoalDiet({ userId, name, category, quantity, calories, date:currentDate });
            await diet.save();
        }
        console.log("error4")

        // Add the diet ID to history
        historyEntry.diets.push({ did: diet._id });
        await historyEntry.save();
        console.log("error5")

        res.status(201).json(historyEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update status of a diet by ID
const updateExerciseStatus = async (req, res) => {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        const currentDate = new Date().toISOString().split('T')[0];
        // console.log(currentDate)

        // Check if the exercise date matches the current date
        const historyEntry = await History.findOne({date: currentDate, exercises: { $elemMatch: { eid: exercise._id} } });
        if (!historyEntry) {
            return res.status(403).json({ message: 'Cannot update exercise status as it is not for the current date' });
        }

        exercise.status = req.body.status;
        await exercise.save();
        res.json(exercise);
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
        
        // Check if there are any history entries containing the diet ID
        const historyEntries = await History.find({ "diets.did": diet._id });
        
        // If there are no history entries, delete the diet from GoalDiet collection
        if (historyEntries.length === 0) {
            await diet.deleteOne();
            return res.json({ message: 'Diet deleted' });
        }
        
        // If history entries exist, remove the diet sub-object from the diets array in History
        await History.updateMany(
            { "diets.did": diet._id },
            { $pull: { diets: { did: diet._id } } }
        );
        
        // Delete the diet from GoalDiet collection
        await diet.deleteOne();
        
        res.json({ message: 'Diet deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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