// import React from "react";
// import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";
import React, { useState } from "react";
import bgImg from "./../Assets/img1.jpg";
import "./Registration.css";

const Registration = (props) => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  // const [formValid, setFormValid] = useState(false);

  const [otp, setOtp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    // Check if OTP is correct
    if (otp === "123456") {
      // Replace '123456' with the actual OTP sent to the user
      setIsOtpVerified(true);
      alert("OTP verified successfully!");
      // Here you can proceed with further actions like logging the user in
    } else {
      // Incorrect OTP, show an alert or error message
      alert("Incorrect OTP. Please try again.");
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

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (email && fullName && userName && password && confirmedPassword) {
      // All fields are filled, mark registration as completed
      setIsRegistered(true);
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
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
      <div className="container px-lg-5">
        <div className="row" id="rg-rw">
          <div className="col-sm-12 col-md-6 bg-white">
            <div className="text-center p-3">
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
                  <div class="input-group mb-3">
                    <input
                      // {...register("Email Address")}
                      className="form-control"
                      type="email"
                      value={email}
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
                  <div class="input-group mb-3" id="">
                    <input
                      // {...register("Full name")}
                      className="form-control"
                      type="text"
                      value={fullName}
                      onChange={handleFullNameChange}
                      placeholder="Full name"
                      pattern="[A-Z,a-z, ]*"
                      required
                    />
                  </div>
                  <div class="input-group mb-3" id="">
                    <input
                      // {...register("User name")}
                      className="form-control"
                      type="text"
                      value={userName}
                      onChange={handleUserNameChange}
                      placeholder="User name"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                    />
                  </div>
                  <div class="input-group mb-3" id="">
                    <input
                      // {...register("password")}
                      className="form-control"
                      type={showPassword ? "password" : "text"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="password"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      maxLength={8}
                    />
                    <span
                      class="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div class="input-group mb-3" id="">
                    <input
                      // {...register("confirmpwd")}
                      className="form-control"
                      type={showPassword ? "password" : "text"}
                      value={confirmedPassword}
                      onChange={handleConfirmedPasswordChange}
                      placeholder="confirm password"
                      required
                      pattern="[A-Z,a-z,0-9,@,#]*"
                      maxLength={8}
                    />
                    <span
                      class="input-group-text"
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
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <div>
                    <label class="input-group mb-3">Enter OTP</label>
                    <div class="input-group mb-3" id="">
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
                        class="input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success"
                      id="otp-btn-fr-rg"
                      class="input-group mb-3 btn btn-success"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              )}
            </div>
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
