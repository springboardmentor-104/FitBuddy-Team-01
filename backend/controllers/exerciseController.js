const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'
const PersonalExercise = require('../modles/personalExercise');



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

        // Return success response
        return res.status(201).json({ success: true, message: "Exercise created successfully", exercise: savedExercise });
    } catch (error) {
        // Handle errors
        console.error("Error creating exercise:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// show all exercise
const getAllExercisesController = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        if (!exercises) {
            return res.send({success:false, message: 'Exercise not found' });
        }
        return res.send({success:true ,exercises});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// show exercise id wise
const getExerciseByIdController = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.send({success:false, message: 'Exercise not found' });
        }
        return res.send({success:true,exercise});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// find by difficulty
const findExercisesByCategoryAndDifficulty = async (req, res) => {
    try {
        const { category, difficulty } = req.params; // Assuming both category and difficulty are passed as URL parameters
        
        // Validate category
        const validCategories = ['strength', 'yoga', 'cardio', 'other'];
        if (!validCategories.includes(category)) {
            return res.send({ success: false, message: "Invalid category" });
        }

        // Validate difficulty
        const validDifficulties = ['easy', 'intermediate', 'hard', 'other'];
        if (!validDifficulties.includes(difficulty)) {
            return res.send({ success: false, message: "Invalid difficulty" });
        }

        // Find exercises by category and difficulty
        const exercises = await Exercise.find({ category, difficulty });

        // Check if exercises were found
        if (exercises.length === 0) {
            return res.send({ success: false, message: "No exercises found in this category and difficulty" });
        }

        // Return found exercises
        return res.status(200).json({ success: true, exercises });
    } catch (error) {
        console.error("Error finding exercises by category and difficulty:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// ******************* to make personal exercise api are here ***********************//



module.exports = {createExerciseController, getAllExercisesController,getExerciseByIdController, findExercisesByCategoryAndDifficulty};