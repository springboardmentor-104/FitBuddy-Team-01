const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["strength", "yoga", "cardio", "powerlifting", "other"],
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  timeToPerformExercise: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userExercise", exerciseSchema);
