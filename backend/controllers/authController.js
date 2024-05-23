const userModel = require("../modles/userModel");
const userOtpVerification = require("../modles/userOtpVerification");

const JWT = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const { isEmail } = require("validator");
const xss = require("xss");

const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/uploadImageMiddleware");

// send otp vefication email for registration
const sendOtpVerificationEmail = async ({ _id, name, email }, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const message = `<p>Hello ${name} here is your otp <b>${otp}</b> for registration </p> <p> otp will expire in 5min only`;
    await sendMail(email, "Fit-buddy email verification", message);

    // hash the otp
    const hashedOtp = await hashPassword(otp);
    // console.log("otp to register",otp)
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
      return res.send({ success: false, message: "All fields are required" });
    }

    if (password !== cpassword) {
      return res.send({ success: false, message: "Passwords do not match" });
    }
    // Check if username is unique
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.send({ success: false, message: "Username is already taken" });
    }

    // Check if email format is valid
    if (!isEmail(email)) {
      return res.send({ success: false, message: "Invalid email format" });
    }

    // Check if email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "Email is already registered. Please login instead.",
      });
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
      success: true,
      message:
        "Registration successful. Please verify your email to activate your account.",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
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
      return res.send({
        success: false,
        message: "Please provide email/username and password",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.send({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    if (!user.is_verified) {
      let oldOtp = await userOtpVerification.findOne({ userId: user._id });
      if (!oldOtp) {
        await sendOtpVerificationEmail(user, res);
        return res.send({
          success: true,
          verify: false,
          message: "An otp is sent to please verify first",
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        return res.send({
          success: true,
          verify: false,
          message: "An email has already been sent to verify your account",
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
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
      verify: true,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
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
    console.log(userId)

    const userVerificationRecord = await userOtpVerification.findOne({userId: userId });

    console.log(userVerificationRecord)
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
      message: "User email verified successfully",
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

    // Check if OTP already exists for the user
    const existingOtpVerification = await userOtpVerification.findOne({
      userId: user._id,
    });

    if (existingOtpVerification) {
      return res.send({
        success: true,
        message: "An OTP has already been sent. Please verify your email.",
        userId: user._id,
      });
    }

    // Generate OTP
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
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
      userId: user._id,
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
    const { userId, otp, newPassword, cpassword } = req.body;

    if (!userId || !otp || !newPassword || cpassword) {
      return res.send({
        success: false,
        message: "OTP and new password are required. Please provide them.",
      });
    }

    if (newPassword != cpassword) {
      return res.send({
        success: false,
        message: "password doest not matched with confirm password",
      });
    }

    // Find OTP verification record
    const userVerificationRecord = await userOtpVerification.findOne({
      userId,
    });
    if (!userVerificationRecord) {
      return res.send({
        success: false,
        message:
          "No OTP verification record found. Please initiate the forgot password process again.",
      });
    }

    // Compare provided OTP with stored hashed OTP
    const hashedOtp = userVerificationRecord.otp;
    const validOtp = await comparePassword(otp, hashedOtp);
    if (!validOtp) {
      return res.send({
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
    // Accessing user ID from req.body.user
    const { user } = req;
    const { oldpassword, newPassword } = req.body;

    // Validation
    if (!oldpassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Old password and new password are required",
      });
    }

    // Fetch user details using the user ID
    console.log("Page Change");
    const userDetails = await userModel.findById(user._id);
    console.log(userDetails);

    // Check if old password matches the current password
    const match = await comparePassword(oldpassword, userDetails.password);
    console.log(match);
    if (!match) {
      return res.send({
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

// to get all deatails
const getUserProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).select("-password");
    // Check if user exists
    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }

    // Return user details
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// to update profile

const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authenticated the user and have access to their user ID

    // Extract fields from request body
    const {
      name,
      about,
      phoneno,
      dob,
      Age, // Shivankush added Age
      gender,
      height,
      weight,
      country,
      address,
      occupation,
      link1, // Shivankush replace insta to link1
      link2, // Shivankush replace fb to link2
      link3, // Shivankush replace twitter to link3
      link4, // Shivankush added link4
      heightUnit, // Shivankush added heightUnit
      WeightUnit, // Shivankush added WeightUnit
    } = req.body;

    // Construct update object with allowed fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (about) updateFields.about = about;
    if (phoneno) updateFields.phoneno = phoneno;
    if (dob) updateFields.dob = dob;
    if (Age) updateFields.Age = Age; // Shivankush added Age
    if (gender) updateFields.gender = gender;
    if (height) updateFields.height = height;
    if (weight) updateFields.weight = weight;
    if (country) updateFields.country = country;
    if (address) updateFields.address = address;
    if (occupation) updateFields.occupation = occupation;
    if (link1) updateFields.link1 = link1; // Shivankush replace insta to link1
    if (link2) updateFields.link2 = link2; // Shivankush replace fb to link2
    if (link3) updateFields.link3 = link3; // Shivankush replace twitter to link3
    if (link4) updateFields.link4 = link4; // Shivankush added link4
    if (heightUnit) updateFields.heightUnit = heightUnit; // Shivankush added heightUnit
    if (WeightUnit) updateFields.WeightUnit = WeightUnit; // Shivankush added WeightUnit

    // Check if an image was provided in the request body
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Add image URL to updateFields
      updateFields.photo = result.secure_url;
    }

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    // Return updated user profile
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// const deletePhotoFromCloudinary = async (photoUrl) => {
//   try {
//     console.log("Deleting photo from Cloudinary...");
//     console.log("Photo URL:", photoUrl);

//     // Extract public ID from photo URL
//     const publicId = photoUrl.split("/").pop().split(".")[0];
//     console.log("Public ID:", publicId);

//     // Delete photo from Cloudinary
//     await cloudinary.uploader.destroy(publicId);
//     console.log("Photo deleted from Cloudinary");
//   } catch (error) {
//     console.error("Error deleting photo from Cloudinary:", error);
//     throw error;
//   }
// };

// const deletePhotoController = async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming you have authenticated the user and have access to their user ID

//     // Find user by ID
//     const user = await userModel.findById(userId);

//     // Check if user exists
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Check if user has a photo
//     if (!user.photo) {
//       return res.json({
//         success: false,
//         message: "No photo found for this user",
//       });
//     }

//     // Delete photo from Cloudinary
//     await deletePhotoFromCloudinary(user.photo);
//     console.log("print");
//     // Remove photo reference from user profile
//     user.photo = undefined;
//     await user.save();

//     return res
//       .status(200)
//       .json({ success: true, message: "Photo deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting photo:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

module.exports = { updateProfileController, upload };

module.exports = {
  registerController,
  loginController,
  verifyOtpController,
  resendOtpController,
  forgotOtpController,
  resetPasswordController,
  updatePasswordController,
  getUserProfileController,
  updateProfileController,
  // deletePhotoController,
};
