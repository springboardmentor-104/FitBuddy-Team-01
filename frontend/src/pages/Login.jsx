// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";

import "./Login.css";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "./../Assets/LoginPage.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { message } from "antd";

const Login = (props) => {
  const navigate = useNavigate();
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

  // const [setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [LoginUserId, setLoginUserId] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Check email validity
    // setEmailValid(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    // Check password validity only if the password is not empty
    setPasswordValid(newPassword.length === 0 || newPassword.length >= 8);
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

  console.log("LoginUserId", LoginUserId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      // All fields are filled, mark registration as completed
      let data = {
        emailOrUsername: email,
        password: password,
      };
      await axios.post("http://localhost:8080/api/v1/auth/login", data).then(
        (response) => {
          if (response.data.success) {
            setLoginUserId(response?.data?.user?._id);
            let localData = {
              token: response?.data?.token,
              ...response?.data?.user,
            };
            localStorage.setItem("user", JSON.stringify(localData));
            localStorage.setItem("userId", JSON.stringify(localData?.userId));
            localStorage.setItem("token", JSON.stringify(localData?.token));
            localStorage.setItem("isFirstLogin", "true");
            message.success("Login Successfully");
            let successMessage = response.data.message;
            setTimeout(() => {
              navigate("/Userdashboard");
              navigate("/Userdashboard", { state: { successMessage } });
            }, 1000);
          } else {
            setLoginUserId("");
          }
          //

          // alert(response.data.message);
          setIsLogin(true);
        },
        (error) => {
          console.log(error);
          alert(error?.data?.error || "Incorrect data for Login");
          setLoginUserId("");
          setIsLogin(false);
        }
      );
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
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
      <ToastContainer />
      <div
        className="container px-lg-4 card card-body"
        style={{ maxWidth: 800 }}
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
                    // {...register("Email Address")}
                    required
                    type="text"
                    value={email}
                    className="form-control"
                    onChange={handleEmailChange}
                    placeholder="Email Address"
                  />
                </div>
                {!emailValid && (
                  <small style={{ color: "red" }} id="warn">
                    Invalid email format
                  </small>
                )}

                <div className="input-group">
                  <input
                    // {...register("Full name")}
                    required
                    minLength={8}
                    maxLength={15}
                    value={password}
                    placeholder="Password"
                    className="form-control"
                    pattern="[A-Z,a-z,0-9,@,#]*"
                    onChange={handlePasswordChange}
                    type={showPassword ? "password" : "text"}
                  />
                  <span
                    class="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {!passwordValid &&
                  password.length > 0 && ( // Display warning only if password is not empty
                    <small style={{ color: "red" }} id="warn">
                      Password should be at least 8 characters long
                    </small>
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
          {/* <div className="d-none d-md-block col-6 p-0"> */}
          <div className="d-none d-md-block col-6 pt-3">
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
