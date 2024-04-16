import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css"; // Import the CSS file

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log(password, confirmPassword);
  };

  document.body.style.overflow = "hidden";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Set a Password</h1>
          <p>
            Your previous password has been reset. Please set a new password for
            your account.
          </p>
          <div className="input-container">
            <label>Create Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="password-input"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="input-container">
            <label>Re-enter Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="password-input"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle-btn"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Set Password
          </button>
        </form>
      </div>
      <div className="image-container">
        <img
          src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2155200775/settings_images/1d5f40b-db0c-a845-5b40-3a8157abeba_Klerapy_login.png"
          alt="Reset Password"
          className="image-border"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
