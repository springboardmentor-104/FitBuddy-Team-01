const mongoose = require('mongoose');

const personalExerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created this personal exercise
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['strength', 'yoga', 'cardio', 'other'], // Add more categories as needed
        required: true
    },
    difficulty :{
        type:String,
        enum: ['easy', 'intermediate', 'hard', 'other'], 
        required :true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('personalExercise', personalExerciseSchema);
