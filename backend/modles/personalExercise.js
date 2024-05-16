const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the user who created this personal exercise
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
  time: {
    type: Number,
    required: true,
  },
  date:{
    type:String,
    required:true
  },
  status:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("goalExercise", exerciseSchema);
