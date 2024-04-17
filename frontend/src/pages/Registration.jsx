// import React from "react";
// import { useForm } from "react-hook-form";
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Check if all fields are filled
  //   if (email && fullName && userName && password && confirmedPassword) {
  //     // Form is valid, you can proceed with further actions like submitting the form
  //     alert("Form submitted successfully!");
  //   } else {
  //     // Form is not valid, show an alert or error message
  //     alert("Please fill in all fields.");
  //   }
  // };

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (email && fullName && userName && password && confirmedPassword) {
    // Form is valid, prepare data for API request
    const requestData = {
      name: fullName,
      email,
      username: userName,
      password,
      cpassword: confirmedPassword
    };

    try {
      // Make API request
      const response = await fetch('http://localhost:3002/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      // Check if request was successful
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        alert(data.message); // Display success message to the user
      } else {
        // Registration failed
        const errorData = await response.json();
        alert(errorData.error); // Display error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Display generic error message to the user
    }
  } else {
    alert('Please fill in all fields.');
  }
};


  return (
    <section
      className="register d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight }}
      id="reg-sec"
    >
      <div className="container px-lg-5 ">
        <div className="row" id="rg-rw">
          <div className="col-sm-12 col-md-6 bg-white">
            <div className="text-center p-3">
              <h1 className="h3" id="ap-nm">
                FIT BUDDY
              </h1>
              <span>
                <h3 className="h4" id="reg-hd">
                  Get started with easily register
                </h3>
                <p id="reg-slogan">Free register any you can enjoy it</p>
              </span>
              <form id="form" className="flex flex-col" onSubmit={handleSubmit}>
                <input
                  // {...register("Email Address")}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email Address"
                  required
                />
                {!emailValid && (
                  <p style={{ color: "red" }} id="warn">
                    Invalid email format
                  </p>
                )}
                <input
                  // {...register("Full name")}
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Full name"
                  required
                />
                <input
                  // {...register("User name")}
                  type="text"
                  value={userName}
                  onChange={handleUserNameChange}
                  placeholder="User name"
                  required
                />
                <input
                  // {...register("password")}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password"
                  required
                />
                <input
                  // {...register("confirmpwd")}
                  type="password"
                  value={confirmedPassword}
                  onChange={handleConfirmedPasswordChange}
                  placeholder="confirm password"
                  required
                />
                <button
                  className="btn btn-primary rounded-0 py-1"
                  id="sgn-btn"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-6 p-0">
            <img
              src={bgImg}
              alt={`Registration Page`}
              className="img-fluid"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
