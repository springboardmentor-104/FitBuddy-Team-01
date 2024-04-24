// Exercise Schema
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo:{
        type:String
    },
    category: {
        type: String,
        enum: ['strength', 'yoga', 'cardio', 'other'], // Add more categories as needed
        required: true
    }
});

module.exports = mongoose.model('exercise', exerciseSchema);
