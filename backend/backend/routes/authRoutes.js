const express = require('express');
const router = express.Router();
const {registerController, loginController, verifyOtpController, resendOtpController, forgotOtpController, resetPasswordController, updatePasswordController,getUserProfileController, updateProfileController} = require('../controllers/authController')
const {requireSignIn} = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadImageMiddleware');


// register
router.post('/register',registerController);

// login 
router.post('/login', loginController);

// verify otp
router.post('/verify',verifyOtpController);

// resend otp
router.post('/resend', resendOtpController );

//forgot OTP
router.post('/forgot', forgotOtpController);

// reset password
router.put('/reset-password', resetPasswordController);

// update password
router.put('/update-password', requireSignIn, updatePasswordController);


router.get('/profile', requireSignIn, getUserProfileController);

// update profile 
router.put('/update-profile', requireSignIn, upload.single('image'), updateProfileController);



module.exports = router