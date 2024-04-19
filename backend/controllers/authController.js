const userModel = require("../modles/userModel");
const userOtpVerification = require("../modles/userOtpVerification");

const JWT = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const { isEmail } = require("validator");
const xss = require("xss");

// send otp vefication email for registration
const sendOtpVerificationEmail = async ({ _id, name, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log("otp", otp);
    const message = `<p>Hello ${name} here is your otp <b>${otp}</b> for registration </p> <p> otp will expire in 1hr`;
    await sendMail(email, "Fit-buddy email verification", message);

    // hash the otp
    const hashedOtp = await hashPassword(otp);
    const newOtpVerification = new userOtpVerification({
      userId: _id,
      otp: hashedOtp,
    });
    await newOtpVerification.save();
  } catch (error) {
    // Handle error
    console.error("Error in sending verification email:", error);
  }
};

// register controller
const registerController = async (req, res) => {
  try {
    const { name, email, username, password, cpassword } = req.body;

    // Validation
    if (!name || !email || !username || !password || !cpassword) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (password !== cpassword) {
      return res.status(400).send({ error: "Passwords do not match" });
    }
    // Check if username is unique
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ error: "Username is already taken" });
    }

    // Check if email format is valid
    if (!isEmail(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }

    // Check if email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "Email is already registered. Please login instead." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user data
    const user = await new userModel({
      name: xss(name), // Sanitize input to prevent XSS
      email: xss(email),
      username: xss(username),
      password: hashedPassword,
    }).save();

    // Send verification email
    await sendOtpVerificationEmail(user, res);

    // Respond with success message
    res.status(201).send({
      data: { userId: user?._id },
      success: true,
      message:
        "Registration successful. Please verify your email to activate your account.",
    });
  } catch (error) {
    // Handle error
    console.error("Error in Registration:", error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login controller
const loginController = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Validation
    if (!emailOrUsername || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email/username and password",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    if (!user.is_verified) {
      let oldOtp = await userOtpVerification.findOne({ userId: user._id });
      if (!oldOtp) {
        await sendOtpVerificationEmail(user, res);
        return;
      } else {
        return res.status(400).send({
          success: false,
          message: "An email has already been sent to verify your account",
        });
      }
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    // If everything is okay, generate JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send success response with user details and token
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in Login page:", error);
    res.status(500).send({
      success: false,
      message: "Error in Login page",
      error,
    });
  }
};

// verification at time of registration
const verifyOtpController = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.send({
        success: false,
        message: "OTP is required. Please provide the OTP.",
      });
    }

    const userVerificationRecord = await userOtpVerification.findOne({
      userId,
    });
    if (!userVerificationRecord) {
      return res.send({
        success: false,
        message:
          "Account record dosen't exist or has been verified already. Please signup or login",
      });
    }
    const hashedOtp = userVerificationRecord.otp;
    const validOtp = await comparePassword(otp, hashedOtp);
    if (!validOtp) {
      return res.status(404).send({
        success: false,
        message: "Invalid otp, check your inbox",
      });
    }

    await userModel.updateOne({ _id: userId }, { is_verified: true });
    await userOtpVerification.deleteMany({ userId });

    return res.status(202).send({
      success: true,
      // message: "User email verified successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in verification page",
      error,
    });
  }
};

// resend otp
const resendOtpController = async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      return res.send({
        success: false,
        message: "email is required. Please provide the email.",
      });
    }

    await userOtpVerification.deleteMany({ userId });
    await sendOtpVerificationEmail({ _id: userId, email }, res);
    return res.status(201).send({
      success: true,
      message: "Otp again sent to your email, check your inbox",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login page",
      error,
    });
  }
};

// forgot password
const forgotOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Save OTP in database
    const hashedOtp = await hashPassword(otp);
    const newOtpVerification = new userOtpVerification({
      userId: user._id,
      otp: hashedOtp,
    });
    await newOtpVerification.save();

    // Send OTP to user's email
    const message = `<p>Hello ${user.name}, here is your OTP for password reset: <b>${otp}</b>.</p>`;
    await sendMail(user.email, "Password Reset OTP", message);

    return res.status(200).send({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in forgot password process",
      error,
    });
  }
};

// reset password
const resetPasswordController = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;
    if (!userId || !otp || !newPassword) {
      return res.status(400).send({
        success: false,
        message:
          "User ID, OTP, and new password are required. Please provide them.",
      });
    }

    // Find OTP verification record
    const userVerificationRecord = await userOtpVerification.findOne({
      userId,
    });
    if (!userVerificationRecord) {
      return res.status(404).send({
        success: false,
        message:
          "No OTP verification record found. Please initiate the forgot password process again.",
      });
    }

    // Compare provided OTP with stored hashed OTP
    const hashedOtp = userVerificationRecord.otp;
    const validOtp = await comparePassword(otp, hashedOtp);
    if (!validOtp) {
      return res.status(404).send({
        success: false,
        message: "Invalid OTP, please try again.",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password
    await userModel.updateOne({ _id: userId }, { password: hashedPassword });

    // Delete OTP verification record
    await userOtpVerification.deleteMany({ userId });

    return res.status(200).send({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in password reset process",
      error,
    });
  }
};

// update password
const updatePasswordController = async (req, res) => {
  try {
    console.log(req.body);
    // Accessing user ID from req.body.user
    const { user } = req.body;
    const { oldpassword, newPassword } = req.body;

    // Validation
    if (!oldpassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Old password and new password are required",
      });
    }

    // Fetch user details using the user ID
    const userDetails = await userModel.findById(user._id);
    console.log(userDetails);

    // Check if old password matches the current password
    const match = await comparePassword(oldpassword, userDetails.password);
    console.log(match);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send({
      success: false,
      message: "Error updating password",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  verifyOtpController,
  resendOtpController,
  forgotOtpController,
  resetPasswordController,
  updatePasswordController,
};
