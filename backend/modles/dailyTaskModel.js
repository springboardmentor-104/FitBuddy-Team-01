const mongoose = require('mongoose');

const dailyTaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DietPlan'
    }]
});

module.exports = mongoose.model('dailyTask',dailyTaskSchema); 
