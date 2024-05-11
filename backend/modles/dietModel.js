const mongoose = require('mongoose');

// Schema for the Meal
const mealSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    protein: {
        type: String,
        required: true
    },
    fat: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    photo:{
        type:String
    }
});

module.exports = mongoose.model('meal', mealSchema);
