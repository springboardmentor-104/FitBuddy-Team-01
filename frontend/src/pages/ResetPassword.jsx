import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaZhihu } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import OtpVrfo_icon from "./../Assets/otpvrfo.png";
import "./ResetPassword.css"; // Import the CSS file

const ResetPassword = (props) => {
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);

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
      alert("Password Changed Successfully");
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
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: window.innerHeight }}
        >
          <div className="card border-0">
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
                      <div class="input-group mb-3">
                        <input
                          type={showPassword ? "password" : "text"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={password}
                          onChange={handlePasswordChange}
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          required
                        />
                        <span
                          class="input-group-text"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div className="input-container">
                      <label>Re-enter Password</label>
                      <div class="input-group mb-3">
                        <input
                          type={showPassword ? "password" : "text"}
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          pattern="[A-Z,a-z,0-9,@,#]*"
                          required
                        />
                        <span
                          class="input-group-text"
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
