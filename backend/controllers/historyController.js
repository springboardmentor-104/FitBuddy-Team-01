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

const todayAllTask = async (req, res) => {
    try {

        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];
        const userID = req.user._id;
        const type = req.params.type;

        // Validate the type and status
        const validTypes = ['exercise', 'diet'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        // Define the model based on the type
        const goalModel = type === 'exercise' ? 'goalExercise' : 'goalDiet';

        // Find the history documents for the user for the current date and the specified type and status
        const historyData = await History.find({ userId: userID, createdAt: currentDate, type: type })
            .populate({
                path: 'goalId',
                model: goalModel
            });

            if (!historyData || historyData.length === 0) {
            return res.status(404).json({ message: `No ${type} data found for the current date with status ${status}` });
        }

        // Return the filtered data
        res.json(historyData);
    } catch (error) {
        res.status(500).json({ message: "error" });
    }
};

const todayDataCategoryWise = async (req, res) => {
    try {
        console.log("toadl all called")

        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];
        const userID = req.user._id;
        const type = req.params.type;
        const status = req.params.status;

        // Validate the type and status
        const validTypes = ['exercise', 'diet'];
        const validStatuses = ['pending', 'completed'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status parameter' });
        }

        // Define the model based on the type
        const goalModel = type === 'exercise' ? 'goalExercise' : 'goalDiet';

        // Find the history documents for the user for the current date and the specified type and status
        const historyData = await History.find({ userId: userID, createdAt: currentDate, type: type, status: status })
            .populate({
                path: 'goalId',
                model: goalModel
            });

        if (!historyData || historyData.length === 0) {
            return res.status(404).json({ message: `No ${type} data found for the current date with status ${status}` });
        }

        // Return the filtered data
        res.json(historyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const showAllHistoryController = async (req, res) => {
    try {
        // Find all history entries for the user, sorted by date in descending order
        const userId = req.user._id;
        const type = req.params.type;

        const validTypes = ['exercise', 'diet'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }
        const goalModel = type === 'exercise' ? 'goalExercise' : 'goalDiet';

        const allHistory = await History.find({ userId: userId, type: type })
            .populate({
                path: 'goalId',
                model: goalModel
            }).sort({ createdAt: -1 }); // Sort in descending order of creation date

        res.json(allHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ******************* to make personal exercise api are here ***********************//

// BUT IT IS NOT NECESSARY
const createExercise = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure userId is part of the request body
        const exercises = req.body.exerciseArr; // Get the array of exercises from the request body
        const currentDate = new Date().toISOString().split('T')[0];

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid or empty exercises array",
            });
        }

        const createdExercises = [];
        const historyEntries = [];

        for (let exerciseData of exercises) {
            const { name, category, sets, time } = exerciseData;

            // Validate each field to ensure no empty strings
            if (!name || !category || !sets || !time) {
                console.log("Skipping invalid exercise data:", exerciseData);
                continue; // Skip invalid exercise entries
            }

            let exercise = await GoalExercise.findOne({ userId, name, date: currentDate });

            if (!exercise) {
                exercise = new GoalExercise({ userId, name, category, sets, time, date: currentDate });
                await exercise.save();
                createdExercises.push(exercise);
            } else {
                console.log("Exercise already exists for today:", exercise);
            }

            const historyEntry = new History({
                userId,
                goalId: exercise._id, // Link to the created exercise
                type: 'exercise', // Specify the type as 'exercise'
                status: 'pending', // Default status
                createdAt: currentDate
            });

            await historyEntry.save();
            historyEntries.push(historyEntry);
        }

        if (createdExercises.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid exercises to add",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Exercises added to your task list",
            createdExercises,
            historyEntries
        });
    } catch (error) {
        console.error("Error creating exercises:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Update status of an exercise by ID
const updateGoalStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const goal = await History.findById(id);
        const userId = req.user._id;
        if (!goal) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        const currentDate = new Date().toISOString().split('T')[0];

        // Find the history entry for the current date and exercise
        const historyEntry = await History.findOne({ userId: userId, _id: id, createdAt: currentDate });
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
const deleteExercise = async (req, res) => {
    try {
        const exercise = await GoalExercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Delete associated history entries
        await History.deleteMany({ goalId: exercise._id, type: 'exercise' });

        // Delete the exercise from GoalExercise collection
        await exercise.deleteOne();

        res.json({ success: true, message: 'Exercise deleted from both GoalExercise and History collections' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'something went wrong' });
    }
};

// Get all exercises
const getAllExercises = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming userId is passed as a URL parameter
        // Fetch exercises of the specific user, sorted by date in descending order
        const exercises = await GoalExercise.find({ userId }).sort({ date: -1 });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: "add exercise first" });
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
        const userId = req.user._id; // Ensure userId is part of the request body
        const diets = req.body.dietArr; // Get the array of exercises from the request body
        const currentDate = new Date().toISOString().split('T')[0];

        if (!Array.isArray(diets) || diets.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid or empty diets array",
            });
        }

        const createdDiets = [];
        const historyEntries = [];

        for (let dietData of diets) {
            const { name, timeToEat, quantity, calories } = dietData;

            // Validate each field to ensure no empty strings
            if (!name || !timeToEat || !quantity || !calories) {
                console.log("Skipping invalid diet data:", dietData);
                continue; // Skip invalid diet entries
            }

            let diet = await GoalDiet.findOne({ userId, name, date: currentDate });

            if (!diet) {
                diet = new GoalDiet({ userId, name, category: timeToEat, quantity, calories, date: currentDate });
                await diet.save();
                createdDiets.push(diet);
            } else {
                console.log("Diet already exists for today:", diet);
            }

            const historyEntry = new History({
                userId,
                goalId: diet._id, // Link to the created diet
                type: 'diet', // Specify the type as 'diet'
                status: 'pending', // Default status
                createdAt: currentDate
            });

            await historyEntry.save();
            historyEntries.push(historyEntry);
        }

        if (createdDiets.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid diets to add",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Diets added to your task list",
            createdDiets,
            historyEntries
        });
    } catch (error) {
        console.error("Error creating diets:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
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

        res.json({ success: true, message: 'Diet deleted from both GoalDiet and History collections' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'something went wrong' });
    }
};

// Get all diets
const getAllDiets = async (req, res) => {
    try {
        const userId = req.user._id;
        const diets = await GoalDiet.find({ userId }).sort({ date: -1 });
        res.json(diets);
    } catch (error) {
        res.status(500).json({ message: "add diet first" });
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

const createEveryDayHistoryData = async (req, res) => {
    try {
        const { userId } = req.body;
        // Check if exercises already created for today
        const existingHistory = await History.findOne({
            userId: userId,
            createdAt: new Date().toISOString().split('T')[0]
        });
        console.log("new Date().toISOString().split('T')[0]",userId , new Date().toISOString().split('T')[0])
        console.log("existingHistory", existingHistory)
        if (existingHistory) {
            return res.status(400).json({
                success: false,
                message: "Exercises already created for today"
            });
        }
        const goaldiets = await GoalDiet.find({ userId: userId }); // personal diets
        const goalexercises = await GoalExercise.find({ userId: userId }); // personal exercises
        const data = [...goaldiets, ...goalexercises];
        const historyData = [];
        console.log(data)
        for (const item of data) {
            let type = "";
            if ("sets" in item ) {
                type = "exercise"; // If the data has sets and timeToPerformExercise fields, it's from exercises
            } else {
                type = "diet"; // Otherwise, it's from diet goals
            }

            const historyRecord = {
                userId: userId,
                goalId: item._id,
                type: type,
                status: "pending",
                createdAt: new Date().toISOString().split('T')[0],
            };

            historyData.push(historyRecord);
        }
        console.log(historyData)
        await History.insertMany(historyData);
        res.status(201).json({
            success: true,
            message: "history created successfully",
        });
    } catch (error) {
        // Handle errors
        console.error("Error creating diet:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    createExercise, updateGoalStatus, deleteExercise, getAllExercises, getExerciseById,
    createDiet, updateDietStatus, deleteDiet, getAllDiets, getDietById,
    todayHistoryController, showAllHistoryController, todayAllTask, todayDataCategoryWise, createEveryDayHistoryData
};




