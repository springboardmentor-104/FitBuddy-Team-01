const express = require("express");
const router = express.Router();
const {
  userCreateExerciseController,
  getAllExercisesController,
  getExerciseByIdController,
  findExercisesByCategoryAndDifficulty,
  searchExercisesByCategoryController,
  createExerciseController,
} = require("../controllers/exerciseController");

// Exercise routes
router.post("/userSelectExercises", userCreateExerciseController);
router.get("/all", getAllExercisesController);
router.get("/:id", getExerciseByIdController);
router.get("/all/search/:category", searchExercisesByCategoryController);
router.get(
  "/category/:category/difficulty/:difficulty",
  findExercisesByCategoryAndDifficulty
);
router.post("/creategoals", createExerciseController);

module.exports = router;
