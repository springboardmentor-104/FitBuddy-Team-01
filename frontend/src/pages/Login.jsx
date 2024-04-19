// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";

import "./Login.css";
import React, { useState } from "react";
import bgImg from "./../Assets/LoginPage.jpg";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = (props) => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Check email validity
    setEmailValid(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Check password validity
    setPasswordValid(event.target.value.length >= 6); // Password should be at least 6 characters long
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (emailValid && passwordValid) {
  //     // Form is valid, you can proceed with further actions like submitting the form
  //     alert("Login done successfully!");
  //   } else {
  //     // Form is not valid, show an alert or error message
  //     alert("Please fill in all fields correctly.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      // Form is valid, you can proceed with further actions like submitting the form
      alert("Login done successfully!");
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields correctly.");
    }
    // **API call to login user in your backend (replace with your implementation)**
    try {
      const response = await fetch("/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    // This is a basic email validation regex, you can use a more comprehensive one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      <div
        className="container px-lg-4 card card-body"
        style={{ height: window.innerHeight - 100, maxWidth: 800 }}
      >
        <div className="row h-100">
          <div className="col-sm-12 col-md-6">
            <div className="text-center p-3" id="reg-bx">
              <h1 className="h3" id="lg-lg">
                Fit Buddy
              </h1>
              <span>
                <h3 className="h4" id="lg-h4">
                  Login to your account!
                </h3>
              </span>
              <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    // {...register("Email Address")}
                    placeholder="Email Address"
                    required
                  />
                </div>
                {!emailValid && (
                  <p style={{ color: "red" }} id="warn">
                    Invalid email format
                  </p>
                )}

                <div class="input-group mb-3">
                  <input
                    className="form-control"
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={handlePasswordChange}
                    // {...register("Full name")}
                    placeholder="Password"
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
                {!passwordValid && (
                  <p style={{ color: "red" }} id="warn">
                    Password should be at least 6 characters long
                  </p>
                )}

                <Link to="/forgot-password" id="fg-ps">
                  Forgot your password?
                </Link>
                <button className="btn btn-warning" id="btn-lg" type="submit">
                  Login to continue
                </button>
                <div className="text-left">
                  <small>
                    Don't have an account ?{" "}
                    <Link to="/Registration" id="sgn-up-lnk">
                      Sign Up
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-6 p-0">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid rounded"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
