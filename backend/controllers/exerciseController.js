const mongoose = require("mongoose");
const Exercise = require("../modles/exerciseModel");
const UserExercise = require("../modles/userExercise");
const goalexercise = require("../modles/createExerciseGoal");

const userCreateExerciseController = async (req, res) => {
  try {
    const { userId, name, category, sets, timeToPerformExercise } = req.body;

    if (!userId || !name || !category || !sets || !timeToPerformExercise) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const validCategories = [
      "strength",
      "yoga",
      "cardio",
      "powerlifting",
      "other",
    ];
    if (!validCategories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    //const duration = timeToPerformExercise * sets;

    const exercise = new UserExercise({
      userId,
      name,
      category,
      sets,
      timeToPerformExercise,
      date: new Date(),
    });

    await exercise.save();

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
      return res.send({ success: false, message: "Exercise not found" });
    }
    return res.send({ success: true, exercises });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExerciseByIdController = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.send({ success: false, message: "Exercise not found" });
    }
    return res.send({ success: true, exercise });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findExercisesByCategoryAndDifficulty = async (req, res) => {
  try {
    const { category, difficulty } = req.params; // Assuming both category and difficulty are passed as URL parameters

    // Validate category
    const validCategories = [
      "strength",
      "yoga",
      "cardio",
      "powerlifting",
      "other",
    ];
    if (!validCategories.includes(category)) {
      return res.send({ success: false, message: "Invalid category" });
    }

    // Validate difficulty
    const validDifficulties = ["easy", "intermediate", "hard", "other"];
    if (!validDifficulties.includes(difficulty)) {
      return res.send({ success: false, message: "Invalid difficulty" });
    }

    // Find exercises by category and difficulty
    const exercises = await Exercise.find({ category, difficulty });

    // Check if exercises were found
    if (exercises.length === 0) {
      return res.send({
        success: false,
        message: "No exercises found in this category and difficulty",
      });
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

const searchExercisesByCategoryController = async (req, res) => {
  try {
    let { category } = req.params;

    // Check if category is undefined
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category parameter is missing" });
    }

    // Convert category to lowercase
    category = category.toLowerCase();

    // Validate category
    const validCategories = [
      "strength",
      "yoga",
      "cardio",
      "powerlifting",
      "other",
    ];
    if (!validCategories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    // Find exercises by category (case insensitive)
    const exercises = await Exercise.find({
      category: { $regex: new RegExp(category, "i") },
    });

    // Check if exercises were found
    if (exercises.length === 0) {
      return res.send({
        success: false,
        message: "No exercises found in this category",
      });
    }

    // Return found exercises
    return res.status(200).json({ success: true, exercises });
  } catch (error) {
    console.error("Error searching exercises by category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createExerciseController = async (req, res) => {
  try {
    let { userId, exerciseArr } = req.body;
    let resArr = [];
    for (let exerciseObj in exerciseArr) {
      console.log(exerciseObj);
      let { name, category, sets, time } = exerciseArr[exerciseObj];
      console.log(name, category, sets, time);
      // Check if required fields are present
      if (!userId || !name || !category || !sets || !time) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      //validate Category
      // const validCategories = [
      //   "strength",
      //   "yoga",
      //   "cardio",
      //   "powerlifting",
      //   "other",
      // ];
      // if (!validCategories.includes(category)) {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Invalid category" });
      // }

      name = name.toLowerCase();
      category = category.toLowerCase();

      // Create new exercise instance
      const exercise = new goalexercise({
        userId,
        name,
        category,
        sets,
        time,
      });

      // Save the exercise to the database
      const savedExercise = await exercise.save();
      resArr.push(savedExercise);
    }
    // Return success response
    return res.status(201).json({
      success: true,
      message: "Exercise created successfully",
      exercise: resArr,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating exercise:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  userCreateExerciseController,
  getAllExercisesController,
  getExerciseByIdController,
  findExercisesByCategoryAndDifficulty,
  searchExercisesByCategoryController,
  createExerciseController,
};
