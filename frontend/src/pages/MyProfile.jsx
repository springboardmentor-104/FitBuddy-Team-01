import React, { useEffect, useState } from "react";
import "./Userdashboard.css";

import { Link } from "react-router-dom";
import person_icn from "../Assets/person.png";
import profile_icn from "../Assets/profile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import {
  BiCog,
  BiGrid,
  BiTime,
  BiTask,
  BiUser,
  BiTrash,
  BiUpload,
  BiLogOut,
  BiSearch,
  BiHelpCircle,
} from "react-icons/bi";

// BsArrowUpShort

import {
  BsList,
  BsPersonFill,
  BsArrowUp,
  BsCartPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const MyProfile = () => {
  // My User - Name - Previous Name(fetch)
  const [user, setUser] = useState({});
  const [tabLiNum, setTabLiNum] = useState(1);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);
  // End

  // My User - Email - Previous Email(fetch)
  const [email, setemail] = useState({});
  useEffect(() => {
    let email = localStorage.getItem("user");
    if (email) {
      email = JSON.parse(email);
      setemail(email);
    }
  }, []);
  // End

  // My User - userName - Previous User Name(fetch)
  const [username, setusername] = useState({});
  useEffect(() => {
    let username = localStorage.getItem("user");
    if (username) {
      username = JSON.parse(username);
      setusername(username);
    }
  }, []);
  // End

  // Side Bar Toggale
  useEffect(() => {
    const toggleSidebar = () => {
      document.body.classList.toggle("toggle-sidebar");
    };
    const sidebarBtn = document.querySelector(".toggle-sidebar-btn");
    sidebarBtn.addEventListener("click", toggleSidebar);
    return () => {
      sidebarBtn.removeEventListener("click", toggleSidebar);
    };
  }, []);
  // End

  // Back to Top
  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.querySelector(".back-to-top");
      if (backToTopButton) {
        if (window.scrollY > 100) {
          backToTopButton.classList.add("active");
        } else {
          backToTopButton.classList.remove("active");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // End

  // For User
  // State to control the visibility of the profile dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  // End

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);
  // End

  // const [errorMessage, setErrorMessage] = useState("");

  // currentpassword - if Password Field is empty that there not shown alert otherwise shown
  const [showcurrentpassword, setShowcurrentpassword] = useState(false);
  const togglecurrentpasswordVisibility = () => {
    setShowcurrentpassword(!showcurrentpassword);
  };
  const [currentpassword, setcurrentpassword] = useState("");
  const [currentpasswordValid, setcurrentpasswordValid] = useState(true);
  const handlecurrentpasswordChange = (event) => {
    const newcurrentpassword = event.target.value;
    setcurrentpassword(newcurrentpassword);
    // Check password validity only if the password is not empty
    setcurrentpasswordValid(
      newcurrentpassword.length === 0 || newcurrentpassword.length >= 8
    );
  };
  // End

  // If Password length is less than 8 then show another alert and if Password Expression is Wrong then there shown another alert
  // const [showcurrentpassword, setShowcurrentpassword] = useState(false);
  // const [currentpassword, setcurrentpassword] = useState("");
  // const togglecurrentpasswordVisibility = () => {
  //   setShowcurrentpassword(!showcurrentpassword);
  // };
  // const handlecurrentpasswordChange = (e) => {
  //   const newcurrentpassword = e.target.value;
  //   setcurrentpassword(newcurrentpassword);
  //   // Check password length and expression
  //   if (newcurrentpassword.length < 8) {
  //     setErrorMessage("Password must be at least 8 characters long.");
  //   } else if (!isValidcurrentpasswordExpression(newcurrentpassword)) {
  //     setErrorMessage(
  //       "Password must contain a uppercase letter, a lowercase letter, and one digit and one special character."
  //       // "Invalid Format! : For Example(45A5@5a9)"
  //     );
  //   } else {
  //     setErrorMessage("");
  //   }
  // };
  // const isValidcurrentpasswordExpression = (currentpassword) => {
  //   // Regular expression to validate password
  //   const currentpasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   return currentpasswordRegex.test(currentpassword);
  // };
  // End

  // newPassword
  const [shownewPassword, setShownewPassword] = useState(false);
  const togglenewPasswordVisibility = () => {
    setShownewPassword(!shownewPassword);
  };
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordValid, setnewPasswordValid] = useState(true);
  const handlenewPasswordChange = (event) => {
    const newPassword = event.target.value;
    setnewPassword(newPassword);
    // Check password validity only if the password is not empty
    setnewPasswordValid(newPassword.length === 0 || newPassword.length >= 8);
    //
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(newPassword);
  };
  // End

  // renewPassword
  const [showrenewPassword, setShowrenewPassword] = useState(false);
  const togglerenewPasswordVisibility = () => {
    setShowrenewPassword(!showrenewPassword);
  };
  const [renewPassword, setrenewPassword] = useState("");
  const [renewPasswordValid, setrenewPasswordValid] = useState(true);
  const handlerenewPasswordChange = (event) => {
    const renewPassword = event.target.value;
    setrenewPassword(renewPassword);
    // Check password validity only if the password is not empty
    setrenewPasswordValid(
      renewPassword.length === 0 || renewPassword.length >= 8
    );
  };
  // End

  // For matching Current Password and New Password
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentpassword === newPassword) {
      alert("Current Password and New Password cannot be the same.");
    } else {
      // Handle password change logic here
      // For example, you can make an API call to update the password
    }
  };
  // End

  // For Full Names - New - Edit Profile
  const [fullName, setfullName] = useState("");
  const handleFullNameChange = (e) => {
    setfullName(e.target.value);
  };
  // End

  // For username - New - Edit Profile
  const [userName, setuserName] = useState("");
  const handleuserNameChange = (e) => {
    setuserName(e.target.value);
  };
  // End

  // For Email - New - Edit Profile
  const [Email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // End

  // For Email - New - Edit Profile
  const [Phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  // End

  // For Country - New - Edit Profile
  const [Country, setCountry] = useState("");
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  // End

  // For Address - New - Edit Profile
  const [Address, setAddress] = useState("");
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  // End

  // For Height - New - Edit Profile
  const [Height, setHeight] = useState("");
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };
  // End

  // Weight - New - Edit Profile
  const [Weight, setWeight] = useState("");
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  // End

  // About - New - Edit Profile
  const [About, setAbout] = useState("");
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
  // End

  // Occupation - New - Edit Profile
  const [Occupation, setOccupation] = useState("");
  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };
  // End

  // DOB - New - Edit Profile
  const [DOB, setDOB] = useState("");
  const handleDOBChange = (e) => {
    setDOB(e.target.value);
  };
  // End

  // Gender - New - Edit Profile
  const [Gender, setGender] = useState("");
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  // End

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="" className="logo d-flex align-items-center">
            {/* <img src={person_icn} alt="" /> */}
            <span className="d-none d-lg-block">Fit Buddy</span>
          </Link>
          <BsList className="toggle-sidebar-btn" />
        </div>
        <div className="search-bar">
          <form className="search-form d-flex align-items-center">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <BiSearch />
            </button>
          </form>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* Search Bar */}
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="">
                <BiSearch />
              </Link>
            </li>

            {/* User Profie */}
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to=""
                data-bs-toggle="dropdown"
                onClick={toggleProfileDropdown}
              >
                <img
                  src={person_icn}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user?.name || "User"}
                </span>
              </Link>
              {isProfileOpen === true && (
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile active"
                  style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    transform: "translate(-25px, 35px)",
                  }}
                >
                  <li className="dropdown-header">
                    <h6>{user?.name || "User"}</h6>
                    <span>Designation</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to=""
                    >
                      <BiUser />
                      &nbsp;
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to=""
                    >
                      <BiCog />
                      &nbsp;
                      <span>Account Settings</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to=""
                    >
                      <BiHelpCircle />
                      &nbsp;
                      <span>Need Help?</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("user");
                      }}
                    >
                      <BiLogOut />
                      &nbsp;
                      <span>Sign Out</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="">
              <BiGrid />
              &nbsp;
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <BiTask />
              &nbsp;
              <span>Manage Goals</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <BsFillPlusCircleFill />
              &nbsp;
              <span>Create Goals</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <BsCartPlusFill />
              &nbsp;
              <span>Buy Subscription</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/MyProfile">
              <BsPersonFill />
              &nbsp;
              <span>My Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/History">
              <BiTime />
              &nbsp;
              <span>History</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <i className="bi bi-dash-circle"></i>
              <span>Section 6</span>
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <i className="bi bi-file-earmark"></i>
              <span>Section 7</span>
            </Link>
          </li> */}
        </ul>
      </aside>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>My Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Home</Link>
              </li>
              <li className="breadcrumb-item active">My Profile</li>
            </ol>
          </nav>
        </div>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    alt="Profile"
                    src={person_icn}
                    className="rounded-circle"
                  />
                  <h2>{user?.name || "User"}</h2>
                  <h3>Occupation</h3>
                  <div className="social-links mt-2">
                    <Link to="" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                      {/* <i className="bi bi-twitter"></i> */}
                    </Link>
                    <Link to="" className="facebook">
                      <FontAwesomeIcon icon={faFacebook} />
                      {/* <i className="bi bi-facebook"></i> */}
                    </Link>
                    <Link to="" className="instagram">
                      <FontAwesomeIcon icon={faInstagram} />
                      {/* <i className="bi bi-instagram"></i> */}
                    </Link>
                    <Link to="" className="linkedin">
                      <FontAwesomeIcon icon={faLinkedin} />
                      {/* <i className="bi bi-linkedin"></i> */}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                        className={`nav-link ${tabLiNum === 1 ? "active" : ""}`}
                        onClick={() => {
                          setTabLiNum(1);
                        }}
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                        className={`nav-link ${tabLiNum === 2 ? "active" : ""}`}
                        onClick={() => {
                          setTabLiNum(2);
                        }}
                      >
                        Edit Profile
                      </button>
                    </li>
                    {/* <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-settings"
                        className={`nav-link ${tabLiNum === 3 ? "active" : ""}`}
                        onClick={() => {
                          setTabLiNum(3);
                        }}
                      >
                        Settings
                      </button>
                    </li> */}
                    <li className="nav-item">
                      <button
                        // className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                        className={`nav-link ${tabLiNum === 4 ? "active" : ""}`}
                        onClick={() => {
                          setTabLiNum(4);
                        }}
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    {/* Overview Section Start */}
                    <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 1 ? `show active` : ``
                      }`}
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      {/* <p className="small fst-italic"> */}
                      <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Mollitia temporibus placeat quidem, nemo quod molestiae?
                      </p>
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {user?.name || "User"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">User Name</div>
                        <div className="col-lg-9 col-md-8">
                          {username?.username || "username"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {email?.email || "email"}
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">Title</div>
                        <div className="col-lg-9 col-md-8">content</div>
                      </div> */}
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">Title</div>
                        <div className="col-lg-9 col-md-8">content</div>
                      </div> */}
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">Title</div>
                        <div className="col-lg-9 col-md-8">content</div>
                      </div> */}
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">Title</div>
                        <div className="col-lg-9 col-md-8">content</div>
                      </div> */}
                    </div>
                    {/* Overview Section End */}

                    {/* Edit Profile Section Start */}
                    <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 2 ? `show active` : ``
                      }`}
                      id="profile-edit"
                    >
                      <form>
                        {/* Profile Image */}
                        <div className="row mb-3">
                          <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img
                              alt="Profile"
                              id="profile-pic"
                              src={profile_icn}
                              style={{
                                // width: "200px",
                                // height: "200px",
                                borderRadius: "3%",
                                border: "1px solid #191919",
                              }}
                            />
                            <div className="pt-2">
                              <input
                                required
                                name="Image"
                                type="file"
                                accept="image/jpej, image/png, image/jpg"
                                id="input-file"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                  var tmppath = URL.createObjectURL(
                                    event.target.files[0]
                                  );
                                  console.log("eee", tmppath);
                                  let profilePic =
                                    document.getElementById("profile-pic");
                                  let inputFile =
                                    document.getElementById("input-file");
                                  profilePic.src = tmppath;
                                  // inputFile.onchange = function () {
                                  //   console.log("Hell");
                                  //   console.log(profilePic);
                                  // };
                                }}
                              />
                              <label
                                htmlFor="input-file"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                              >
                                <BiUpload style={{ color: "#fff" }} />
                                {/* style={{ color: "#fff" }}  */}
                                {/* <i className="bi bi-upload"></i> */}
                              </label>
                              &nbsp;
                              <Link
                                href="#"
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                              >
                                <BiTrash />
                                {/* <i className="bi bi-trash"></i> */}
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Full Name */}
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              required
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={fullName}
                              pattern="[A-Z,a-z, ]*"
                              className="form-control"
                              onChange={handleFullNameChange}
                            />
                          </div>
                        </div>

                        {/* User Name */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Job"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            User Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name=""
                              // value=""
                              id="Job"
                              required
                              type="text"
                              value={userName}
                              className="form-control"
                              pattern="[A-Z,a-z,0-9,@,#]*"
                              onChange={handleuserNameChange}
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              required
                              // value=""
                              id="Email"
                              type="email"
                              name="email"
                              value={Email}
                              className="form-control"
                              pattern="[A-Z,a-z,0-9,@,.]*"
                              onChange={handleEmailChange}
                            />
                          </div>
                        </div>

                        {/* Phone No. */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone No.
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              required
                              id="Phone"
                              type="text"
                              name="phone"
                              pattern="[0-9]*"
                              value={Phone}
                              className="form-control"
                              onChange={handlePhoneChange}
                            />
                          </div>
                        </div>

                        {/* DOB */}
                        <div className="row mb-3">
                          <label
                            htmlFor="DOB"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Date of Birth
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              id="dob"
                              name="dob"
                              type="date"
                              required=""
                              value={DOB}
                              min="1950-01-01"
                              max="2025-01-01"
                              class="form-control"
                              onChange={handleDOBChange}
                            />
                          </div>
                        </div>

                        {/* Gender */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Gender
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              name="gen"
                              id="gen"
                              class="form-control"
                              required="required"
                              value={Gender}
                              onChange={handleGenderChange}
                            >
                              <option value="-SELECT-">-SELECT-</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        {/* Height */}
                        <div className="row mb-3">
                          <label
                            htmlFor=""
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Height
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              id=""
                              name=""
                              required
                              type="text"
                              value={Height}
                              // pattern="[0-9,A-Z]*"
                              className="form-control"
                              onChange={handleHeightChange}
                            />
                          </div>
                        </div>

                        {/* Weight */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Weight"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Weight
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              id=""
                              name=""
                              required
                              type="text"
                              value={Weight}
                              // pattern="[0-9,A-Z]*"
                              className="form-control"
                              onChange={handleWeightChange}
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Country"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Country
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              required
                              type="text"
                              id="Country"
                              name="country"
                              value={Country}
                              // pattern="[A-Z,a-z]*"
                              className="form-control"
                              onChange={handleCountryChange}
                            />
                          </div>
                        </div>

                        {/* Address */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              // value=""
                              required
                              type="text"
                              id="Address"
                              name="address"
                              value={Address}
                              className="form-control"
                              // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>

                        {/* Occupation */}
                        <div className="row mb-3">
                          <label
                            htmlFor="company"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Occupation
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              required
                              type="text"
                              id="company"
                              name="company"
                              value={Occupation}
                              className="form-control"
                              onChange={handleOccupationChange}
                            />
                          </div>
                        </div>

                        {/* About */}
                        <div className="row mb-3">
                          <label
                            htmlFor="about"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            About
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              required
                              id="about"
                              name="about"
                              value={About}
                              className="form-control"
                              style={{ height: "100px" }}
                              // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                              onChange={handleAboutChange}
                            ></textarea>
                          </div>
                        </div>

                        {/* Social Media Profile Section Start */}
                        {/* Twitter Profile */}
                        {/* <div className="row mb-3">
                          <label
                            htmlFor="Twitter"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Twitter Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="twitter"
                              type="text"
                              className="form-control"
                              id="Twitter"
                              value=""
                            />
                          </div>
                        </div> */}
                        {/* Facebook Profile */}
                        {/* <div className="row mb-3">
                          <label
                            htmlFor="Facebook"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Facebook Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="facebook"
                              type="text"
                              className="form-control"
                              id="Facebook"
                              value=""
                            />
                          </div>
                        </div> */}
                        {/* Instagram Profile */}
                        {/* <div className="row mb-3">
                          <label
                            htmlFor="Instagram"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Instagram Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="instagram"
                              type="text"
                              className="form-control"
                              id="Instagram"
                              value=""
                            />
                          </div>
                        </div> */}
                        {/* Linkedin Profile */}
                        {/* <div className="row mb-3">
                          <label
                            htmlFor="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Linkedin Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="linkedin"
                              type="text"
                              className="form-control"
                              id="Linkedin"
                              value=""
                            />
                          </div>
                        </div> */}
                        {/* Social Media Profile Section End */}

                        {/* Submit Button */}
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Edit Profile Section End */}

                    {/* Setting Section Start */}
                    {/* <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 3 ? `show active` : ``
                      }`}
                      id="profile-settings"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email Notifications
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="changesMade"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="changesMade"
                              >
                                Changes made to your account
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="newProducts"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="newProducts"
                              >
                                Information on new products and services
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="proOffers"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="proOffers"
                              >
                                Marketing and promo offers
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="securityNotify"
                                checked
                                disabled
                              />
                              <label
                                className="form-check-label"
                                htmlFor="securityNotify"
                              >
                                Security alerts
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div> */}
                    {/* Setting Section Start End */}

                    {/* Change Password Section */}
                    <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 4 ? `show active` : ``
                      }`}
                      id="profile-change-password"
                    >
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <input
                                // type="password"
                                required
                                minLength={8}
                                maxLength={15}
                                name="password"
                                id="currentPassword"
                                value={currentpassword}
                                className="form-control"
                                pattern="[A-Z,a-z,0-9,@,#]*"
                                onChange={handlecurrentpasswordChange}
                                type={showcurrentpassword ? "text" : "password"}
                              />
                              <span
                                style={{ cursor: "pointer" }}
                                className="input-group-text"
                                onClick={togglecurrentpasswordVisibility}
                              >
                                {showcurrentpassword ? (
                                  <FaEye />
                                ) : (
                                  <FaEyeSlash />
                                )}
                              </span>
                            </div>
                            {!currentpasswordValid &&
                              currentpassword.length > 0 && ( // Display warning only if password is not empty
                                <small style={{ color: "red" }} id="warn">
                                  Password should be at least 8 characters long
                                </small>
                              )}
                            {/* {errorMessage && (
                              <small style={{ color: "red" }}>
                                {errorMessage}
                              </small>
                            )} */}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <input
                                required
                                // type="password"
                                minLength={8}
                                maxLength={15}
                                id="newPassword"
                                name="newpassword"
                                value={newPassword}
                                className="form-control"
                                pattern="[A-Z,a-z,0-9,@,#]*"
                                onChange={handlenewPasswordChange}
                                type={shownewPassword ? "text" : "password"}
                              />
                              <span
                                style={{ cursor: "pointer" }}
                                className="input-group-text"
                                onClick={togglenewPasswordVisibility}
                              >
                                {shownewPassword ? <FaEye /> : <FaEyeSlash />}
                              </span>
                            </div>
                            {!newPasswordValid &&
                              newPassword.length > 0 && ( // Display warning only if password is not empty
                                <small style={{ color: "red" }} id="warn">
                                  Password should be at least 8 characters long
                                </small>
                              )}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <input
                                // type="password"
                                required
                                minLength={8}
                                maxLength={15}
                                id="renewPassword"
                                name="renewpassword"
                                value={renewPassword}
                                className="form-control"
                                pattern="[A-Z,a-z,0-9,@,#]*"
                                onChange={handlerenewPasswordChange}
                                type={showrenewPassword ? "text" : "password"}
                              />
                              <span
                                style={{ cursor: "pointer" }}
                                className="input-group-text"
                                onClick={togglerenewPasswordVisibility}
                              >
                                {showrenewPassword ? <FaEye /> : <FaEyeSlash />}
                              </span>
                            </div>
                            {!renewPasswordValid &&
                              renewPassword.length > 0 && ( // Display warning only if password is not empty
                                <small style={{ color: "red" }} id="warn">
                                  Password should be at least 8 characters long
                                </small>
                              )}
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Change Password Section End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Top to Bottom arrow */}
      <Link
        to=""
        className="back-to-top d-flex align-items-center justify-content-center"
        onClick={scrollToTop}
      >
        <BsArrowUp style={{ color: "#fff" }} />
      </Link>
    </div>
  );
};

export default MyProfile;
