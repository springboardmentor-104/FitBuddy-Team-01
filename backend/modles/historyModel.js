// History Schema
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    dietPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DietPlan'
    },
    exerciseCompleted: {
        type: Boolean,
        default: false
    },
    dietPlanCompleted: {
        type: Boolean,
        default: false
    },
    dateCompleted: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', historySchema);
