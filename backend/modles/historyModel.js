const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  goalId: {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String, // Define type as a string
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: String,
    required:true
  },
  completedAt: {
    type: Date
  }
});
module.exports = mongoose.model("history", historySchema);
