const mongoose = require('mongoose');

const userHistory = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    exercises :{
        exercise: {  // Reference to Exercise model (if type is 'exercise')
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        sets: {
          type: Number,
          required: true,
        },
        time: {
          type: Number,
          required: true,
        },
    },
    diets :{
        diet: {  // Reference to Exercise model (if type is 'exercise')
          type: mongoose.Schema.Types.ObjectId,
          ref: 'meal',
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['breakfast', 'lunch', 'dinner'],
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    },
  
});

module.exports = mongoose.model('hisoty', userHistory);
