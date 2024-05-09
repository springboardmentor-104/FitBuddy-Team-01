const express = require("express");
const router = express.Router();
const {
  createDietController,
  getAllDietController,
  getDietByIdController,
  getDietByUserIdController,
} = require("../controllers/dietController");

// Diet routes
router.post("/create", createDietController);
router.get("/all", getAllDietController);
router.get("/:id", getDietByIdController);
router.post("/byUserId", getDietByUserIdController);

module.exports = router;
