const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOtpVerificationSchema = new mongoose.Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users"
   },
   otp: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now(),
      expires: 300 // 1 hour
   }
});

module.exports = mongoose.model('userOtpVerification', userOtpVerificationSchema);
