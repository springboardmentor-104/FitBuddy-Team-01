const express = require("express");
const router = express.Router();
const {
  // createExerciseController,
  userCreateExerciseController,
  getAllExercisesController,
  getExerciseByIdController,
  findExercisesByCategoryAndDifficulty,
  searchExercisesByCategoryController,
} = require("../controllers/exerciseController");

// Exercise routes
// router.post('/create', createExerciseController);
router.post("/create", userCreateExerciseController);
router.get("/all", getAllExercisesController);
router.get("/:id", getExerciseByIdController);
router.get("/all/search/:category", searchExercisesByCategoryController);
router.get(
  "/category/:category/difficulty/:difficulty",
  findExercisesByCategoryAndDifficulty
);

module.exports = router;
