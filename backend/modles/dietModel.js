const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plans: [{
        day: {
            type: String,
            required: true
        },
        morningMeal: {
            type: String,
            required: true
        },
        nightMeal: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);
    