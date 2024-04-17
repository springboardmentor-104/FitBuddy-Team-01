// import React from "react";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import bgImg from "./../Assets/LoginPage.jpg";
import { Link } from "react-router-dom";
import "./Login.css";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      // Form is valid, you can proceed with further actions like submitting the form
      alert("Form submitted successfully!");
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields correctly.");
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    // This is a basic email validation regex, you can use a more comprehensive one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            <div className="text-center p-3">
              <h1 className="h3" id="lg-lg">
                Fit Buddy
              </h1>
              <span>
                <h3 className="h4" id="lg-h4">
                  Login to your account!
                </h3>
              </span>
              <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  // {...register("Email Address")}
                  placeholder="Email Address"
                  required
                />
                {!emailValid && (
                  <p style={{ color: "red" }} id="warn">
                    Invalid email format
                  </p>
                )}

                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  // {...register("Full name")}
                  placeholder="Password"
                  required
                />
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
