const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created this personal exercise
        required: true
    },
    name: {
        type: String,
        required: true
    },
    timeToEat: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    calories:{
        type: Number,
        required:true
    }

});
module.exports = mongoose.model('Diets', dietSchema);