// import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";

import "./ResetPassword.css";
import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import OtpVrfo_icon from "./../Assets/otpvrfo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ResetPassword = (props) => {
  const location = useLocation();
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [height, setHeight] = useState(0);

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add password reset logic here
  //   console.log(password, confirmPassword);
  // };

  // document.body.style.overflow = "hidden";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ===================== For Password Validation =====================

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password <= 8 || confirmPassword <= 8) {
      setPasswordLengthValid(false);
      return;
    } else if (password === confirmPassword) {
      // Passwords match, you can proceed with further actions
      setPasswordsMatch(true);
      console.log("Passwords match");
    } else {
      // Passwords don't match, show error message
      setPasswordsMatch(false);
      console.log("Passwords do not match");
      return;
    }

    // ====================================

    if (!password || !confirmPassword) {
      // If any of the fields are empty
      if (!password && !confirmPassword) {
        alert("For creating a new password, both fields are required.");
      } else if (!password) {
        alert("You have not entered a password in the Create Password field.");
      } else {
        alert(
          "You have not entered a password in the Re-enter Password field."
        );
      }
    } else {
      // Both fields are filled, proceed with further actions
      // For example, you can submit the form or perform any other action
      // alert("Passwords set successfully!");
    }

    // ====================================

    if (password !== confirmPassword) {
      // If passwords don't match, prevent form submission
      setPasswordsMatch(false);
      alert("Passwords do not match. Please re-enter.");
    } else {
      // Passwords match, allow form submission
      // alert("Form submitted successfully!");
      alert("Password Changed Successfully!");
      // Here you can proceed with further actions like submitting the form to a server
    }

    // ====================================

    if (password !== confirmPassword) {
      // If passwords don't match, prevent form submission
      setPasswordsMatch(false);
      alert("Passwords do not match. Please re-enter.");
    } else if (password.length > 8 || confirmPassword.length > 8) {
      // If password length exceeds 8 characters, prevent form submission
      setPasswordLengthValid(false);
      alert("Password cannot be more than 8 characters long.");
    } else {
      // Passwords match and length is valid, allow form submission
      // alert("Form submitted successfully!");
      // Here you can proceed with further actions like submitting the form to a server
      let data = JSON.stringify({
        userId: location?.state?.userId,
        otp: location?.state?.otp,
        newPassword: password,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/auth/reset-password",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0" style={{ margin: "100px" }}>
            <div className="card-body p-0 shadow">
              <div className="row">
                <div className="col-md-6 col-sm-12 p-5">
                  <form onSubmit={handleSubmit}>
                    <h1>Set a Password</h1>
                    <p>
                      Your previous password has been reset. Please set a new
                      password for your account.
                    </p>
                    <div className="input-container">
                      <label>Create Password</label>
                      <div className="input-group mb-3">
                        <input
                          required
                          minLength={8}
                          maxLength={15}
                          value={password}
                          className="form-control"
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          onChange={handlePasswordChange}
                          type={showPassword ? "password" : "text"}
                          aria-label="Amount (to the nearest dollar)"
                        />
                        <span
                          className="input-group-text"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div className="input-container">
                      <label>Re-enter Password</label>
                      <div className="input-group mb-3">
                        <input
                          required
                          minLength={8}
                          maxLength={15}
                          className="form-control"
                          value={confirmPassword}
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          onChange={handleConfirmPasswordChange}
                          type={showPassword ? "password" : "text"}
                          aria-label="Amount (to the nearest dollar)"
                        />
                        <span
                          className="input-group-text"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {!passwordsMatch && (
                        <p style={{ color: "red" }}>Passwords do not match</p>
                      )}
                      {!passwordLengthValid && (
                        <p style={{ color: "red" }}>
                          Password cannot be more than 8 characters long
                        </p>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 w-100"
                      >
                        Set Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="d-sm-none d-md-block col-md-6 border-start">
                  <div className="p-5">
                    <img
                      src={OtpVrfo_icon}
                      alt={`Asf`}
                      className="rounded-0"
                      style={{
                        maxHeight: window.innerHeight / 2,
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
