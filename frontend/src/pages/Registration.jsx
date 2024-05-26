import axios from "axios";
import "./Registration.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import bgImg from "./../Assets/img1.jpg";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = (props) => {
  const navigate = useNavigate();
  // const handleSubmitOTP = (e) => {
  //   e.preventDefault();
  //   // Validate OTP, for simplicity, compare with a hardcoded value
  //   const correctOTP = "123456";
  //   if (otp === correctOTP) {
  //     setOtpVerified(true);
  //     // Proceed with registration
  //   } else {
  //     alert("Invalid OTP, please try again.");
  //   }
  // };

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [otp, setOtp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // const [isValid, setIsValid] = useState(null);

  // const [passwordValid, setPasswordValid] = useState(true);
  // const [isOtpVerified, setIsOtpVerified] = useState(false);
  // const [otpSent, setOtpSent] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // const [emailValid, setEmailValid] = useState(true);
  // const [isValid, setIsValid] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [formValid, setFormValid] = useState(false);
  // const [otp, setOtp] = useState('');

  // Password Validation(for validation min 8 character+One Upper+One Lower+Special Character+One Digit)
  const [password, setPassword] = useState("");
  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  // Username Validation(Check the Expression of Username)
  const [userName, setUsername] = useState("");
  const validateUsername = (username) => {
    // Regular expression for alphanumeric characters, underscores, and hyphens
    const regex = /^[a-zA-Z0-9_-]+$/;
    // Check length (between 3 and 16 characters) and allowed characters
    return (
      username.length >= 3 && username.length <= 16 && regex.test(username)
    );
  };
  const handleUserNameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setIsUsernameValid(validateUsername(newUsername));
  };

  // For Email Validation
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Check email validity
    setEmailValid(validateEmail(event.target.value));
  };
  // Email validation function
  const validateEmail = (email) => {
    // This is a basic email validation regex, you can use a more comprehensive one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //
  console.log("registeredUserId", registeredUserId);
  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if OTP is correct
      let data = {
        userId: registeredUserId,
        otp: otp,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/verify",
        data
      );
      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message); // Display success message using toast
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
        setOtpVerified(true); // Update state to indicate OTP verification success
      } else {
        toast.error(responseData.message); // Display error message using toast
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error("Something went wrong");
      }
      // Display generic error message using toast
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (email && fullName && userName && password && confirmedPassword) {
      // Form is valid, you can proceed with further actions like submitting the form
      alert("Registration done successfully!");
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
    }
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (email && fullName && userName && password && confirmedPassword) {
      // All fields are filled, mark registration as completed
      let data = {
        name: fullName,
        email: email,
        username: userName,
        password: password,
        cpassword: confirmedPassword,
      };
      await axios.post("http://localhost:8080/api/v1/auth/register", data).then(
        (response) => {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 20000,
          });

          setRegisteredUserId(response?.data?.data?.userId);
          setIsRegistered(true);
        },
        (error) => {
          console.log(error);
          alert("error", error);
          setRegisteredUserId("");
          setIsRegistered(false);
        }
      );
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
    }
  };

  // Resend OTP
  const [resendStatus, setResendStatus] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [userId, setUserId] = useState(""); // Add state for user ID

  // Inside your handleResendOTP function
  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const data = {
        email: email,
        userId: userId,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/resend",
        data
      );
      if (response.data && response.data.success) {
        setResendStatus("OTP has been resent successfully.");
      } else {
        setResendStatus("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setResendStatus(
        "An error occurred while resending OTP. Please try again later."
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleRegistrationSubmit1 = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name: fullName,
          email: email,
          username: userName,
          password: password,
          cpassword: confirmedPassword,
        }
      );
      // Check if all fields are filled
      if (response.data.success) {
        setIsRegistered(true);
        const responseData = response.data;
        setRegisteredUserId(responseData.user.userId);
        toast.success(responseData.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
      setRegisteredUserId("");
      setIsRegistered(false);
    }
  };

  // Password Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className="register d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight, width: "70vw", margin: "auto" }}
      id="reg-sec"
    >
      <ToastContainer />
      <div className="container px-lg-5">
        <div className="row" id="rg-rw" style={{ margin: "2px" }}>
          <div className="col-sm-12 col-md-6 bg-white">
            <div className="text-center p-3">
              {/* <div className="bc-bx">
                <Link to="/">
                  <i className="fa fa-angle-left" id="bc">
                    &nbsp;Back
                  </i>
                </Link>
              </div> */}
              <h1 className="h3" id="ap-nm">
                Fit Buddy
              </h1>
              <span>
                <h3 className="h4" id="reg-hd">
                  Get started with easily register
                </h3>
                <p id="reg-slogan">Free register and you can enjoy it</p>
              </span>
              {!isRegistered ? (
                <form
                  id="form"
                  className="flex flex-col"
                  onSubmit={
                    (handleSubmit,
                    handleRegistrationSubmit,
                    handleRegistrationSubmit1)
                  }
                >
                  <div className="input-group">
                    <input
                      // value={formData.email}
                      // {...register("Email Address")}
                      required
                      type="email"
                      name="email"
                      value={email}
                      className="form-control"
                      placeholder="Email Address"
                      pattern="[A-Z,a-z,0-9,@,.]*"
                      onChange={handleEmailChange}
                    />
                  </div>
                  {!emailValid && email && (
                    <div style={{ color: "red" }} id="warn">
                      <small>
                        Invalid email format! : For Example(this@this.com)
                      </small>
                    </div>
                  )}
                  <div className="input-group">
                    <input
                      // value={formData.fullName}
                      // {...register("Full name")}
                      required
                      type="text"
                      name="fullName"
                      value={fullName}
                      pattern="[A-Z,a-z, ]*"
                      placeholder="Full name"
                      className="form-control"
                      onChange={handleFullNameChange}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      // value={formData.username}
                      // {...register("User name")}
                      required
                      type="text"
                      name="username"
                      value={userName}
                      placeholder="User name"
                      className="form-control"
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      onChange={handleUserNameChange}
                    />
                  </div>
                  {!isUsernameValid && userName && (
                    <div id="inv-Usrnm-frm">
                      <small>
                        Username is invalid! : For Example(@SarahLTomslin)
                      </small>
                    </div>
                  )}
                  <div className="input-group">
                    <input
                      // {...register("password")}
                      // value={formData.password}
                      required
                      minLength={8}
                      maxLength={15}
                      name="password"
                      value={password}
                      placeholder="Password"
                      className="form-control"
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      onChange={handlePasswordChange}
                      type={showPassword ? "password" : "text"}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {!isPasswordValid && password && (
                    <div id="inv-frmt-pas">
                      <small>Invalid Format! : For Example(45A5@5a9)</small>
                    </div>
                  )}
                  <div className="input-group">
                    <input
                      // {...register("confirmpwd")}
                      // value={formData.confirmPassword}
                      required
                      minLength={8}
                      maxLength={15}
                      name="confirmPassword"
                      className="form-control"
                      value={confirmedPassword}
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      placeholder="Confirm Password"
                      type={showPassword ? "password" : "text"}
                      onChange={handleConfirmedPasswordChange}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary"
                    id="sgn-btn"
                    type="submit"
                  >
                    Sign up
                  </button>
                  <div className="text-left">
                    <small>
                      Already have an account ?{" "}
                      <Link to="/Login" id="sgn-up-lnk">
                        Sign In
                      </Link>
                    </small>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <div>
                    <p id="msg-rg-otp">
                      An authentication code has been sent to your email.
                    </p>
                    {/* <label className="input-group mb-3">Enter OTP</label> */}
                    <div className="input-group mb-3" id="">
                      <input
                        required
                        value={otp}
                        minLength={6}
                        maxLength={8}
                        placeholder="Enter OTP"
                        className="form-control"
                        onChange={handleOtpChange}
                        pattern="[A-Z,a-z,0-9,@,#]*"
                        type={showPassword ? "password" : "text"}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <p className="Reg-OTP">
                      <span>{resendMessage}</span>
                      <span>
                        Didn't recieve a Code?
                        <button
                          id="reg-rsnd-btn"
                          onClick={handleResendOTP}
                          disabled={isResending}
                        >
                          {isResending ? "Resending..." : "Resend"}
                        </button>
                      </span>
                    </p>
                    {resendStatus && <p>{resendStatus}</p>}
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="otp-btn-fr-rg"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                  <div className="text-left" id="lgin-bx">
                    <small>
                      Already have an account ?{" "}
                      <Link to="/Login" id="sgin-up-lnk">
                        Sign In
                      </Link>
                    </small>
                  </div>
                </form>
              )}
            </div>
            {otpVerified && (
              <div>
                <h2>Registration Successful!</h2>
                <p>Your account has been successfully registered.</p>
              </div>
            )}
          </div>
          <div className="d-none d-md-block col-6 p-0">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid"
              style={{ height: "100%" }}
              id="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
