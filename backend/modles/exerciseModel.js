const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['strength', 'yoga', 'cardio', 'powerlifting', 'other'],
        required: true
    },
    muscle: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'intermediate', 'hard', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
