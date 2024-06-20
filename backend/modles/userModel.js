const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    favoriteExercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    about: {
      type: String,
    },
    phoneno: {
      type: String,
    },
    dob: {
      // type: Date, // Remove by Shivankush
      type: String, // Added by Shivankush
    },
    // Shivankush added Age
    Age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    height: {
      type: Number,
    },
    // Shivankush added heightUnit
    heightUnit: {
      type: String,
      enum: ["mm", "cm", "m", "ft"],
    },
    weight: {
      type: Number,
    },
    // Shivankush added WeightUnit
    WeightUnit: {
      type: String,
      enum: ["g", "kg", "lb"],
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    occupation: {
      type: String,
    },
    link1: {
      // Shivankush replace insta to link1
      type: String,
    },
    link2: {
      // Shivankush replace fb to link2
      type: String,
    },
    link3: {
      // Shivankush replace twitter to link3
      type: String,
    },
    link4: {
      // Shivankush added link4
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
