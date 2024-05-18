const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'
const goalExercise = require('../modles/personalExercise');
const history = require('../modles/historyModel')


// create exercis
const createExerciseController = async (req, res) => {
    try {
        const { name, description, category, muscle, equipment, difficulty, photo } = req.body;

        // Check if required fields are present
        if (!name || !description || !category || !muscle || !equipment || !difficulty || !photo) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate difficulty level
        const validDifficultyLevels = ['easy', 'intermediate', 'hard', 'other'];
        if (!validDifficultyLevels.includes(difficulty.toLowerCase())) {
            return res.status(400).json({ success: false, message: "Invalid difficulty level" });
        }

        // Create new exercise instance
        const exercise = new Exercise({
            name,
            description,
            category,
            muscle,
            equipment,
            difficulty: difficulty.toLowerCase(), // Convert to lowercase for consistency
            photo
        });

        // Save the exercise to the database
        const savedExercise = await exercise.save();

    return res.status(201).json({
      success: true,
      message: "Exercise created successfully",
      exercise,
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating exercise",
      error: error.message,
    });
  }
};

const getAllExercisesController = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        if (!exercises) {
            return res.send({ success: false, message: 'Exercise not found' });
        }
        return res.send({ success: true, exercises });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getExerciseByIdController = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.send({ success: false, message: 'Exercise not found' });
        }
        return res.send({ success: true, exercise });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const findExercisesByCategoryAndDifficulty = async (req, res) => {
    try {
        const { category, difficulty } = req.params; // Assuming both category and difficulty are passed as URL parameters

        // Validate category
        const validCategories = ['strength', 'yoga', 'cardio', 'other'];
        // Validate difficulty
        const validDifficulties = ['easy', 'intermediate', 'hard', 'other'];

        let query = {};

        if (category && validCategories.includes(category)) {
            query.category = category;
        }

        if (difficulty && validDifficulties.includes(difficulty)) {
            query.difficulty = difficulty;
        }

        // Find exercises based on the constructed query
        const exercises = await Exercise.find(query);

        // Check if exercises were found
        if (exercises.length === 0) {
            return res.send({ success: false, message: "No exercises found matching the criteria" });
        }

    // Return found exercises
    return res.status(200).json({ success: true, exercises });
  } catch (error) {
    console.error("Error finding exercises by category and difficulty:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const findExercisesByCategory = async (req, res) => {
    try {
        const { category } = req.params; // Assuming category is passed as a URL parameter

        // Validate category
        const validCategories = ['strength', 'yoga', 'cardio', 'powerlifting','other'];

        let query = {};

        if (category && validCategories.includes(category)) {
            query.category = category;
        } else {
            return res.status(400).json({ success: false, message: "Invalid category" });
        }

        // Find exercises based on the constructed query
        const exercises = await Exercise.find(query);

        // Check if exercises were found
        if (exercises.length === 0) {
            return res.send({ success: false, message: "No exercises found matching the criteria" });
        }

        // Return found exercises
        return res.status(200).json({ success: true, exercises });
    } catch (error) {
        console.error("Error finding exercises by category:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};



// ******************* to make personal exercise api are here ***********************//
/*
// BUT IT IS NOT NECESSARY
const createExercise = async (req, res) => {
    try {
        const { userId, name, category, sets, time } = req.body;
        const exercise = new goalExercise({
            userId,
            name,
            category,
            sets,
            time
        });
        await goalExercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update status of an exercise by ID
const updateExerciseStatus = async (req, res) => {
    try {
        const exercise = await goalExercise.findById(req.params.id);
        if (exercise) {
            exercise.status = req.body.status;
            await exercise.save();
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an exercise by ID
const deleteExercise = async (req, res) => {
    try {
        const exercise = await goalExercise.findById(req.params.id);
        if (exercise) {
            await goalExercise.remove();
            res.json({ message: 'Exercise deleted' });
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all exercises
const getAllExercises = async (req, res) => {
    try {
        const exercises = await goalExercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an exercise by ID
const getExerciseById = async (req, res) => {
    try {
        const exercise = await goalExercise.findById(req.params.id);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


  createExercise,
    updateExerciseStatus,
    deleteExercise,
    getAllExercises,
    getExerciseById

*/


module.exports = {
   createExerciseController, 
    getAllExercisesController, 
    getExerciseByIdController, 
    findExercisesByCategoryAndDifficulty, 
    findExercisesByCategory
};