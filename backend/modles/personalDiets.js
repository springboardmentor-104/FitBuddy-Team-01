const mongoose = require('mongoose');

const personalDietSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the user who created this personal exercise
        required: true
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
    calories:{
        type: Number,
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('goalDiet', personalDietSchema);
