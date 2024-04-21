const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOtpVerificationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // expires: 3600, // 1 hour
    expires: 300, // 5 min
  },
});

module.exports = mongoose.model(
  "userOtpVerification",
  userOtpVerificationSchema
);
