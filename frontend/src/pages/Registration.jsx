// import React from "react";
// import { useForm } from "react-hook-form";

import axios from "axios";
import React, { useState } from "react";
import bgImg from "./../Assets/img1.jpg";
import "./Registration.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const Registration = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [otp, setOtp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [passwordValid, setPasswordValid] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // const [formValid, setFormValid] = useState(false);
  // const [otp, setOtp] = useState('');

  // const handleOtpSubmit = async (event) => {
  //   event.preventDefault();
  //   // Check if OTP is correct
  //   let data = {
  //     userId: registeredUserId,
  //     otp: otp,
  //   };
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/v1/auth/verify", data);
  //     const responseData = response.data;
  //     if (responseData.success) {
  //       alert(responseData.message); // Display success message
  //       setOtpVerified(true); // Update state to indicate OTP verification success
  //     } else {
  //       alert(responseData.message); // Display error message
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during OTP verification:", error);
  //     alert("Something went wrong while verifying OTP"); // Display generic error message
  //   }
  // };
  
  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if OTP is correct
      let data = {
        userId: registeredUserId,
        otp: otp,
      };
      
      const response = await axios.post("http://localhost:8080/api/v1/auth/verify", data);
      const responseData = response.data;
  
      if (responseData.success) {
        toast.success(responseData.message); // Display success message using toast
        setTimeout(() => {
          navigate('/');
        }, 1000);
        setOtpVerified(true); // Update state to indicate OTP verification success
      } else {
        toast.error(responseData.message); // Display error message using toast
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error("Something went wrong");
      } 
     // Display generic error message using toast
    }
  };
  

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  };

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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Check password validity
    setPasswordValid(event.target.value.length >= 6); // Password should be at least 6 characters long
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

  // const handleRegistrationSubmit = async (event) => {
  //   event.preventDefault();
  //   // Check if all fields are filled
  //   if (email && fullName && userName && password && confirmedPassword) {
  //     // All fields are filled, mark registration as completed
  //     let data = {
  //       name: fullName,
  //       email: email,
  //       username: userName,
  //       password: password,
  //       cpassword: confirmedPassword,
  //     };
  //     await axios.post("http://localhost:8080/api/v1/auth/register", data).then(
  //       (response) => {
  //         setRegisteredUserId(response.data.user.userId);
  //         toast.success(response.data.message);
  //         setIsRegistered(true);
  //       },
  //       (error) => {
  //         alert(error?.data?.error || error?.response?.data?.error);
  //         setRegisteredUserId("");
  //         setIsRegistered(false);
  //       }
  //     );
  //   } else {
  //     // Form is not valid, show an alert or error message
  //     alert("Please fill in all fields.");
  //   }
  // };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    try {
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
        
        const response = await axios.post("http://localhost:8080/api/v1/auth/register", data);
        const responseData = response.data;
  
        setRegisteredUserId(responseData.user.userId);
        toast.success(responseData.message);
        setIsRegistered(true);
      } else {
        // Form is not valid, show an alert or error message
        toast("please fill all the fields");
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response);
      }
      setRegisteredUserId("");
      setIsRegistered(false);
    }
  };
  
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  // Password Show and Hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className="register d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight }}
      id="reg-sec"
    >
      <ToastContainer/>
      <div className="container px-lg-5">
        <div className="row" id="rg-rw">
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
                <p id="reg-slogan">Free register any you can enjoy it</p>
              </span>
              {!isRegistered ? (
                <form
                  id="form"
                  className="flex flex-col"
                  onSubmit={(handleSubmit, handleRegistrationSubmit)}
                >
                  <div className="input-group">
                    <input
                      // {...register("Email Address")}
                      className="form-control"
                      type="email"
                      value={email}
                      // value={formData.email}
                      name="email"
                      onChange={handleEmailChange}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  {!emailValid && (
                    <p style={{ color: "red" }} id="warn">
                      Invalid email format
                    </p>
                  )}
                  <div className="input-group">
                    <input
                      // {...register("Full name")}
                      className="form-control"
                      type="text"
                      value={fullName}
                      // value={formData.fullName}
                      name="fullName"
                      onChange={handleFullNameChange}
                      placeholder="Full name"
                      pattern="[A-Z,a-z, ]*"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <input
                      // {...register("User name")}
                      className="form-control"
                      type="text"
                      value={userName}
                      // value={formData.username}
                      name="username"
                      onChange={handleUserNameChange}
                      placeholder="User name"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      // {...register("password")}
                      className="form-control"
                      type={showPassword ? "password" : "text"}
                      value={password}
                      // value={formData.password}
                      name="password"
                      onChange={handlePasswordChange}
                      placeholder="password"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      maxLength={8}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="input-group">
                    <input
                      // {...register("confirmpwd")}
                      className="form-control"
                      type={showPassword ? "password" : "text"}
                      value={confirmedPassword}
                      // value={formData.confirmPassword}
                      name="confirmPassword"
                      onChange={handleConfirmedPasswordChange}
                      placeholder="confirm password"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      maxLength={8}
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button
                    className="btn btn-success"
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
                    <label className="input-group mb-3">Enter OTP</label>
                    <div className="input-group mb-3" id="">
                      <input
                        className="form-control"
                        type={showPassword ? "password" : "text"}
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder=""
                        required
                        pattern="[A-Z,a-z,0-9,@,#]*"
                        maxLength={6}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-success"
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
