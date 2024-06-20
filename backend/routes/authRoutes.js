const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  verifyOtpController,
  resendOtpController,
  forgotOtpController,
  resetPasswordController,
  updatePasswordController,
  getUserProfileController,
  updateProfileController,
  deletePhotoController,
} = require("../controllers/authController");
const { requireSignIn } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadImageMiddleware");

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// verify otp
router.post("/verify", verifyOtpController);

// resend otp
router.post("/resend", resendOtpController);

//forgot OTP
router.post("/forgot", forgotOtpController);

// reset password
router.put("/reset-password", resetPasswordController);

// update password
router.put("/update-password", requireSignIn, updatePasswordController);

router.get("/profile", requireSignIn, getUserProfileController);

router.delete("/delete/profile-pic", requireSignIn, deletePhotoController);


// update profile
router.put(
  "/update-profile",
  requireSignIn,
  upload.single("image"),
  updateProfileController
);

// router.delete("/profile-pic", requireSignIn, deletePhotoController);

module.exports = router;
