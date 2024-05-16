  // History Schema
  const mongoose = require('mongoose');

  const historySchema = new mongoose.Schema({
      userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users', // Reference to the user
          required: true
      },
      date: {
          type:String,
          required:true
      },
      exercises: [{
        eid:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'goalExercise'
        }
      }],
      diets: [{
        did:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'goalDiet'
        }
      }],
  });
      
  module.exports = mongoose.model('history', historySchema);
