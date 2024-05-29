const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'
const GoalExercise = require('../modles/personalExercise');
const GoalDiet = require('../modles/personalDiets');
const History = require('../modles/historyModel');
const mongoose = require('mongoose')

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

        return res.status(200).json(allHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ******************* to make personal exercise api are here ***********************//


const createExercise = async (req, res) => {
    try {
        const userId = req.user._id;
        const exercises = req.body.exerciseArr;
        const currentDate = new Date().toISOString().split('T')[0];

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.json({
                success: false,
                message: "Invalid or empty exercises array",
            });
        }

        const createdExercises = [];
        const historyEntries = [];
        const errors = [];

        for (let exerciseData of exercises) {
            const { name, category, sets, time, key } = exerciseData; // Destructure key if present

            // Validate each field to ensure no empty strings
            if (!name || !category || !sets || !time) {
                errors.push(`Skipping invalid exercise data`);
                continue;
            }

            let exercise = await GoalExercise.findOne({ userId, name, date: currentDate });

            if (!exercise) {
                exercise = new GoalExercise({ userId, name, category, sets, time, date: currentDate, key });
                await exercise.save();
                createdExercises.push(exercise);
            } else {
                errors.push("Exercise already exists for today");
            }

            const historyEntry = new History({
                userId,
                goalId: exercise._id,
                type: 'exercise',
                status: 'pending',
                createdAt: currentDate,
            });

            await historyEntry.save();
            historyEntries.push(historyEntry);
        }

        if (createdExercises.length === 0) {
            return res.json({
                success: false,
                message: "Exercise already exists",
                errors: errors
            });
        }

        return res.status(201).json({
            success: true,
            message: "Exercises added to your task list",
            createdExercises,
            historyEntries,
        });
    } catch (error) {
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
const getExerciseByName = async (req, res) => {
    try {
        const userId = req.user._id
        const currentDate = new Date().toISOString().split('T')[0];
        const exercise = await GoalExercise.find({userId:userId,name:req.body.name, date:currentDate});
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
        const userId = req.user._id;
        const diets = req.body.dietArr;
        const currentDate = new Date().toISOString().split('T')[0];

        if (!Array.isArray(diets) || diets.length === 0) {
            return res.json({
                success: false,
                message: "Invalid or empty diets array",
            });
        }

        const createdDiets = [];
        const historyEntries = [];
        const errors = [];

        for (let dietData of diets) {
            const { name, timeToEat, quantity, calories, key } = dietData; // Destructure key if present

            // Validate each field to ensure no empty strings
            if (!name || !timeToEat || !quantity || !calories) {
                errors.push(`Skipping invalid diet data`);
                continue;
            }

            let diet = await GoalDiet.findOne({ userId, name, date: currentDate });
            console.log(diet)
            if (!diet) {
                diet = new GoalDiet({ userId, name, category: timeToEat, quantity, calories, date: currentDate, key });
                await diet.save();
                createdDiets.push(diet);
            } else {
                errors.push("Diet already exists for today");
            }

            const historyEntry = new History({
                userId,
                goalId: diet._id,
                type: 'diet',
                status: 'pending',
                createdAt: currentDate,
            });

            await historyEntry.save();
            historyEntries.push(historyEntry);
        }

        if (createdDiets.length === 0) {
            return res.json({
                success: false,
                message: "Diet already exists",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Diets added to your task list",
            createdDiets,
            historyEntries,
        });
    } catch (error) {
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

// const createEveryDayHistoryData = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const type = req.params.type;

//         // Check if exercises already created for today
//         const existingHistory = await History.findOne({
//             userId: userId,
//             createdAt: new Date().toISOString().split('T')[0]
//         });
//         console.log("new Date().toISOString().split('T')[0]",userId , new Date().toISOString().split('T')[0])
//         console.log("existingHistory", existingHistory)
//         if (existingHistory) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Exercises already created for today"
//             });
//         }
//         const goaldiets = await GoalDiet.find({ userId: userId }); // personal diets
//         const goalexercises = await GoalExercise.find({ userId: userId }); // personal exercises
//         const data = [...goaldiets, ...goalexercises];
//         const historyData = [];
//         console.log(data)
//         for (const item of data) {
//             let type = "";
//             if ("sets" in item ) {
//                 type = "exercise"; // If the data has sets and timeToPerformExercise fields, it's from exercises
//             } else {
//                 type = "diet"; // Otherwise, it's from diet goals
//             }

//             const historyRecord = {
//                 userId: userId,
//                 goalId: item._id,
//                 type: type,
//                 status: "pending",
//                 createdAt: new Date().toISOString().split('T')[0],
//             };

//             historyData.push(historyRecord);
//         }
//         console.log(historyData)
//         await History.insertMany(historyData);
//         res.status(201).json({
//             success: true,
//             message: "history created successfully",
//         });
//     } catch (error) {
//         // Handle errors
//         console.error("Error creating diet:", error);
//         return res
//             .status(500)
//             .json({ success: false, message: "Internal server error" });
//     }
// };
const createEveryDayHistoryData = async (req, res) => { 
    try {
        const  userId  = req.user._id;
        const currentDate = new Date().toISOString().split('T')[0];
        const previousDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
   
        // Check if exercises already created for today
        const existingHistory = await History.findOne({
            userId: userId,
            createdAt: currentDate
        });
        if (existingHistory) {
            return res.json({
                success: false,
                message: "Exercises already created for today"
            });
        }
        const goaldiets = await GoalDiet.find({ userId: userId, date:previousDate }); // personal diets
        const goalexercises = await GoalExercise.find({ userId: userId , date:previousDate}); // personal exercises

        const data = [...goaldiets, ...goalexercises];
        const newGoalDiets = goaldiets.map(diet => ({
            ...diet.toObject(),
            _id: undefined,
            date: currentDate
        }));
        const newGoalExercises = goalexercises.map(exercise => ({
            ...exercise.toObject(),
            _id: undefined,
            date: currentDate
        }));

        const createdGoalDiets = await GoalDiet.insertMany(newGoalDiets);
        const createdGoalExercises = await GoalExercise.insertMany(newGoalExercises);

        const historyData = [
            ...createdGoalDiets.map(diet => ({
                userId: userId,
                goalId: diet._id,
                type: "diet",
                status: "pending",
                createdAt: currentDate
            })),
            ...createdGoalExercises.map(exercise => ({
                userId: userId,
                goalId: exercise._id,
                type: "exercise",
                status: "pending",
                createdAt: currentDate
            }))
        ];
        // for (const item of data) {
        //     let type = "";
        //     if ("sets" in item ) {
        //         type = "exercise"; // If the data has sets and timeToPerformExercise fields, it's from exercises
        //     } else {
        //         type = "diet"; // Otherwise, it's from diet goals
        //     }

        //     const historyRecord = {
        //         userId: userId,
        //         goalId: item._id,
        //         type: type,
        //         status: "pending",
        //         createdAt: currentDate
        //     };

        //     historyData.push(historyRecord);
        // }
        await History.insertMany(historyData);
        res.status(201).json({
            success: true,
            message: "history created successfully",
            historyData
        });
    } catch (error) {
        // Handle errors
        console.error("Error creating diet:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};


const getCompletionRates = async (req, res) => {
    try {
      const userId = req.user._id;
      const today = new Date();
      const formatDateString = (date) => {
        return date.toISOString().split('T')[0];
      };
      const todayString = formatDateString(today);
  
      // Generate an array of dates until the oldest record
      const histories = await History.find({ userId: userId }).sort({ createdAt: 1 });
  
      if (histories.length === 0) {
        return res.json({
            success:false,
          completionRates: []
        });
      }
  
      const oldestDate = new Date(histories[0].createdAt);
      const dates = [];
      for (let d = today; d >= oldestDate; d.setDate(d.getDate() - 1)) {
        dates.push(formatDateString(new Date(d)));
      }
  
      // Initialize array to store completion rates
      const completionRates = [];
  
      // Calculate completion percentages for each day
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
  
        // Query the database to find exercise and diet completion counts for the day
        const exerciseCount = await History.countDocuments({
          userId: userId,
          type: 'exercise',
          createdAt: date
        });
  
        const exerciseCompletedCount = await History.countDocuments({
          userId: userId,
          type: 'exercise',
          status: 'completed',
          createdAt: date
        });
  
        const dietCount = await History.countDocuments({
          userId: userId,
          type: 'diet',
          createdAt: date
        });
  
        const dietCompletedCount = await History.countDocuments({
          userId: userId,
          type: 'diet',
          status: 'completed',
          createdAt: date
        });
  
        // Calculate completion percentages
        const exercisePercentage = exerciseCount === 0 ? 0 : (exerciseCompletedCount / exerciseCount) * 100;
        const dietPercentage = dietCount === 0 ? 0 : (dietCompletedCount / dietCount) * 100;
  
        // Store completion percentages along with date
        completionRates.push({ date, exercise: exercisePercentage, diet: dietPercentage });
      }
  
      // Send the completion rates in the response
      return res.json({
        success:true,
        completionRates
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports = {
    createExercise, updateGoalStatus, deleteExercise, getAllExercises, getExerciseById,
    createDiet, updateDietStatus, deleteDiet, getAllDiets, getDietById,
    todayHistoryController, showAllHistoryController, todayAllTask, todayDataCategoryWise, createEveryDayHistoryData, getExerciseByName, getCompletionRates
};




