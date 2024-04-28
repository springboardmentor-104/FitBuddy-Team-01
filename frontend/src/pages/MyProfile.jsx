import React, { useEffect, useState } from "react";
import "./Userdashboard.css";
import "./MyProfile.css";

import { Link } from "react-router-dom";
import person_icn from "../Assets/person.png";
import profile_icn from "../Assets/profile.png";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDumbbell,
  // faRunning,
  // faBicycle,
} from "@fortawesome/free-solid-svg-icons";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  // const navigate = useNavigate();

  // Tab system for overview , Edit profile, change password and Account setting section
  const [tabLiNum, setTabLiNum] = useState(1);

  // In overview section tab system for Basic Information, Your Body Status and Social Links
  const [activeTab, setActiveTab] = useState(5);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // End

  // My User - Name - Previous Name(fetch) - From Registration Data
  const [user, setUser] = useState({});
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);
  // End

  // My User - Email - Previous Email(fetch) - From Registration Data
  const [email, setemail] = useState({});
  useEffect(() => {
    let email = localStorage.getItem("user");
    if (email) {
      email = JSON.parse(email);
      setemail(email);
    }
  }, []);
  // End

  // My User - userName - Previous User Name(fetch) - From Registration Data
  const [username, setusername] = useState({});
  useEffect(() => {
    let username = localStorage.getItem("user");
    if (username) {
      username = JSON.parse(username);
      setusername(username);
    }
  }, []);
  // End

  // My User - Password - Password Data(fetch) - From Registration Form
  const [password, setpassword] = useState({});
  useEffect(() => {
    let password = localStorage.getItem("user");
    if (password) {
      password = JSON.parse(password);
      setpassword(password);
    }
  }, []);
  // End

  // My User - Phone - Phone Data(fetch) - From Edit Profile Form
  // const [Phone, setPhone] = useState({});
  // useEffect(() => {
  //   let Phone = localStorage.getItem("user");
  //   if (Phone) {
  //     Phone = JSON.parse(Phone);
  //     setPhone(Phone);
  //   }
  // }, []);
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

  // If Password length is less than 8 then show another alert and if Password Expression is Wrong then there shown another alert
  // const [errorMessage, setErrorMessage] = useState("");
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

  // reEnterPassword
  const [showreEnterPassword, setShowreEnterPassword] = useState(false);
  const togglereEnterPasswordVisibility = () => {
    setShowreEnterPassword(!showreEnterPassword);
  };
  const [reEnterPassword, setreEnterPassword] = useState("");
  const [reEnterPasswordValid, setreEnterPasswordValid] = useState(true);
  const handlereEnterPasswordChange = (event) => {
    const reEnterPassword = event.target.value;
    setreEnterPassword(reEnterPassword);
    // Check password validity only if the password is not empty
    setreEnterPasswordValid(
      reEnterPassword.length === 0 || reEnterPassword.length >= 8
    );
  };
  // End

  const [setError] = useState(null);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [PasswordUpdateUserId, setPasswordUpdateUserId] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");

  // Change Password Form Submittion
  const handlePasswordUpdateSubmit = async (event) => {
    event.preventDefault();

    // Check current password is correct or not
    // if (currentpassword !== password) {
    //   alert("Current password does not match.");
    //   return;
    // }

    // currentpassword and new password do not matched
    if (currentpassword === newPassword) {
      alert("Current Password and New Password Matched ! , Try another");
    }
    // if newPassword and reEnteredPassword Matching
    if (newPassword !== reEnterPassword) {
      alert("New Password and Re-entered New Password not Matched !");
    }

    // currentpassword
    if (currentpassword.length < 8) {
      alert("Current Password must be at least 8 characters long");
    }
    if (!isValidPassword(currentpassword)) {
      alert("Current Password does not match the required pattern");
    }

    // newPassword
    if (newPassword.length < 8) {
      alert("New Password must be at least 8 characters long");
    }
    if (!isValidPassword(newPassword)) {
      alert("New Password does not match the required pattern");
    }

    // reEnterPassword
    if (reEnterPassword.length < 8) {
      alert("Re-entered Password must be at least 8 characters long");
    }
    if (!isValidPassword(reEnterPassword)) {
      alert("Re-entered Password does not match the required pattern");
    }

    // Call API for Update Password
    if (currentpassword && newPassword && reEnterPassword) {
      // All fields are filled, mark registration as completed
      let userData = localStorage.getItem("user");
      userData = JSON.parse(userData);
      let data = {
        oldpassword: currentpassword,
        newPassword: newPassword,
      };
      let headers = {
        Authorization: userData?.token || "",
        "Content-Type": "application/json",
      };
      console.log(headers);
      await axios
        .put("http://localhost:8080/api/v1/auth/update-password", data, {
          headers: headers,
        })
        .then(
          (response) => {
            console.log(response?.data);
            if (response.data.success) {
              setPasswordUpdateUserId(response?.data?.user?._id);
              setcurrentpassword("");
            } else {
              setPasswordUpdateUserId("");
            }
            //
            alert(response.data.message);
            setIsPasswordUpdate(true);
          },
          (error) => {
            console.log(error);
            // alert(error?.data?.error || error?.response?.data?.error);
            // alert(error?.data?.error || "Incorrect data for ...");
            setPasswordUpdateUserId("");
            setIsPasswordUpdate(false);
          }
        );
    } else {
      // Form is not valid, show an alert or error message
      alert("Please fill in all fields.");
    }
  };
  // End

  // Regular expression function to validate password pattern
  const isValidPassword = (password) => {
    const pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return pattern.test(password);
  };

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

  // For Phone - New - Edit Profile
  const [Phone, setPhone] = useState("");
  const handlePhoneChange = (value) => {
    setPhone(value);
  };
  // const handlePhoneChange = (e) => {
  //   setPhone(e.target.value);
  // };
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

  // Social Link 1 - New - Edit Profile
  const [twitter, settwitter] = useState("");
  const handletwitterChange = (e) => {
    settwitter(e.target.value);
  };
  // End

  // Social Link 2 - New - Edit Profile
  const [facebook, setfacebook] = useState("");
  const handlefacebookChange = (e) => {
    setfacebook(e.target.value);
  };
  // End

  // Social Link 3 - New - Edit Profile
  const [instagram, setinstagram] = useState("");
  const handleinstagramChange = (e) => {
    setinstagram(e.target.value);
  };
  // End

  // Social Link 4 - New - Edit Profile
  const [linkedin, setlinkedin] = useState("");
  const handlelinkedinChange = (e) => {
    setlinkedin(e.target.value);
  };
  // End

  // Edit Form Submission Logic
  const [EditFormSubmitted, setEditFormSubmitted] = useState(false);
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    let formData = Array.from(event.target.elements).map((e) => {
      return { [e.getAttribute("name")]: e.value };
    });
    let formData2 = {};
    formData.forEach((element) => {
      formData2 = { ...formData2, ...element };
    });
    console.log("formData2", formData2);

    // Check if the phone number is filled in
    if (Phone) {
      // Phone number is filled, proceed with form submission logic
      let userData = localStorage.getItem("user");
      userData = JSON.parse(userData);
      let data = formData2;
      let headers = {
        Authorization: userData?.token || "",
        "Content-Type": "application/json",
      };
      console.log(headers);
      await axios
        .put("http://localhost:8080/api/v1/auth/update-profile", data, {
          headers: headers,
        })
        .then(
          (response) => {
            alert(response.data.message);
          },
          (error) => {
            console.log(error);
            // alert(error?.data?.error || error?.response?.data?.error);
          }
        );
      // Reset phone input after form submission if needed
      // setPhone('');
    } else {
      // Phone number is not filled, prevent form submission
      alert("Please fill in the phone number");
      console.log("Please fill in the phone number");
    }
  };
  // End

  // Account Deletion Logic
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [isCheckboxesChecked, setIsCheckboxesChecked] = useState(false);

  const handleDeleteAccountSubmit = () => {
    // Check if all checkboxes are checked
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(allCheckboxes).every(
      (checkbox) => checkbox.checked
    );

    if (!allChecked) {
      alert("Please check all checkboxes before deleting your account.");
      return;
    }

    // Your logic for handling the delete account submission goes here
    // For example, you can make an API call to delete the account
    // or update the state to reflect that the account has been deleted
    console.log("Account deleted");
  };

  const handleCheckboxChange = () => {
    // Check if all checkboxes are checked
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(allCheckboxes).every(
      (checkbox) => checkbox.checked
    );
    setIsCheckboxesChecked(allChecked);

    // Hide confirmation modal if any checkbox is unchecked
    if (!allChecked) {
      setIsDeleteConfirmationVisible(false);
    }
  };

  const handleCancelClick = () => {
    // Uncheck all checkboxes and hide confirmation modal
    resetCheckboxes();
    setIsDeleteConfirmationVisible(false);
  };

  const handleDeleteClick = () => {
    if (!isCheckboxesChecked) {
      alert("Please check all checkboxes before deleting your account.");
      return;
    }
    setIsDeleteConfirmationVisible(true);
  };

  const resetCheckboxes = () => {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setIsCheckboxesChecked(false);
  };
  // Account Deletion Logic End

  // On clicking Trash of profile Image, shown an alert
  const handleDeleteImage = () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your current profile image?"
    );
    // If user confirms, delete the image
    if (confirmDelete) {
      // Add logic to delete the image from the database
      console.log("Image deleted");
    }
  };
  // End

  return (
    <div>
      {/* Header Section */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="" className="logo d-flex align-items-center">
            {/* <img src={} alt="" /> */}
            <FontAwesomeIcon icon={faDumbbell} /> {/* Dumbbell icon */}
            {/* <FontAwesomeIcon icon={faRunning} /> Running icon */}
            {/* <FontAwesomeIcon icon={faBicycle} /> Bicycle icon */}
            &nbsp;
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

      {/* Aside Menu */}
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

      {/* Main Section */}
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>My Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Home</Link>
              </li>
              <li className="breadcrumb-item">Users</li>
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
                  <h2>{user?.name || "N/A"}</h2>
                  <h3>{Occupation || "N/A"}</h3>
                  <div className="social-links mt-2">
                    <Link to={twitter} className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link to={facebook} className="facebook">
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to={instagram} className="instagram">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to={linkedin} className="linkedin">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    {/* Overview */}
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

                    {/* Edit Profile */}
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

                    {/* Change Password */}
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

                    {/* Account Settings */}
                    <li className="nav-item">
                      <button
                        // className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-settings"
                        className={`nav-link ${tabLiNum === 3 ? "active" : ""}`}
                        onClick={() => {
                          setTabLiNum(3);
                        }}
                      >
                        Account Settings
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
                      {/* About */}
                      <h5 className="card-title">About</h5>
                      {/* <p className="small fst-italic"> */}
                      <p className="">{About || "N/A"}</p>

                      <h5 className="card-title">Profile Details</h5>

                      {/* Tab System for all type of content */}
                      <ul className="nav nav-tabs nav-tabs-bordered">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === 5 ? "active" : ""
                            }`}
                            onClick={() => handleTabClick(5)}
                          >
                            Basic Information
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === 6 ? "active" : ""
                            }`}
                            onClick={() => handleTabClick(6)}
                          >
                            Body Status
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === 7 ? "active" : ""
                            }`}
                            onClick={() => handleTabClick(7)}
                          >
                            Social accounts
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content pt-2">
                        {/* Basic Information */}
                        <div
                          className={`tab-pane fade profile-edit pt-3 ${
                            activeTab === 5 ? "show active" : ""
                          }`}
                          id="profile-overview"
                        >
                          {/* Full Name */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Full Name</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {/* {user?.name || "User"} */}
                              {user?.name || fullName || "N/A"}
                            </div>
                          </div>

                          {/* User Name */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>User Name</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {/* {username?.username || "username"} */}
                              {username?.username || userName || "N/A"}
                            </div>
                          </div>

                          {/* Email */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Email</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {/* {email?.email || "email"} */}
                              {email?.email || Email || "N/A"}
                            </div>
                          </div>

                          {/* Phone No. */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Phone No.</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {/* Phone */}
                              {Phone || "N/A"}
                            </div>
                          </div>

                          {/* Date of Birth */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Date of Birth</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {DOB || "N/A"}
                            </div>
                          </div>

                          {/* Gender */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Gender</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Gender || "N/A"}
                            </div>
                          </div>

                          {/* Country */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Country</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Country || "N/A"}
                            </div>
                          </div>

                          {/* Address */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Address</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Address || "N/A"}
                            </div>
                          </div>

                          {/* Occupation */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Occupation</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Occupation || "N/A"}
                            </div>
                          </div>
                        </div>

                        {/* Body Status */}
                        <div
                          className={`tab-pane fade profile-edit pt-3 ${
                            activeTab === 6 ? "show active" : ""
                          }`}
                          id="profile-edit"
                        >
                          {/* Height */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Height</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Height || "N/A"}
                            </div>
                          </div>

                          {/* Weight */}
                          <div className="row">
                            <div
                              className="col-lg-3 col-md-4 label"
                              id="Orv-Pr-Dt-hd"
                            >
                              <strong>Weight</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {Weight || "N/A"}
                            </div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div
                          className={`tab-pane fade profile-edit pt-3 ${
                            activeTab === 7 ? "show active" : ""
                          }`}
                          id="profile-edit"
                        >
                          {/* Link 1 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Twitter
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {twitter || "N/A"}
                            </div>
                          </div>
                          {/* Link 2 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Facebook
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {facebook || "N/A"}
                            </div>
                          </div>
                          {/* Link 3 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Instagram
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {instagram || "N/A"}
                            </div>
                          </div>
                          {/* Link 4 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              Linkedin
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {linkedin || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Overview Section End */}

                    {/* Edit Profile Section Start */}
                    <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 2 ? `show active` : ``
                      }`}
                      id="profile-edit"
                    >
                      <form onSubmit={handleEditFormSubmit}>
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
                                borderRadius: "0%",
                                border: "1px solid #191919",
                              }}
                            />
                            <div className="pt-2">
                              <input
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
                              </label>
                              &nbsp;
                              <label
                                to=""
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                                onClick={handleDeleteImage}
                              >
                                <BiTrash style={{ color: "#fff" }} />
                              </label>
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
                              // value={fullName}
                              value={user?.name || fullName || "User"}
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
                              name="userName"
                              // value=""
                              id="Job"
                              required
                              type="text"
                              // value={userName}
                              value={
                                username?.username || userName || "username"
                              }
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
                              name="Email"
                              // value={Email}
                              value={email?.email || Email || "email"}
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
                            {/* <input
                              // value=""
                              required
                              id="Phone"
                              type="text"
                              name="phone"
                              pattern="[0-9]*"
                              value={Phone}
                              className="form-control"
                              onChange={handlePhoneChange}
                            /> */}

                            <PhoneInput
                              required
                              id="Phone"
                              name="Phone"
                              type="phone"
                              value={Phone}
                              country={"in"} // Default country code
                              onChange={handlePhoneChange}
                              inputStyle={{ width: "100%" }} // Custom input width
                            />
                            {/* Display error message if form is submitted and phone is empty */}
                            {EditFormSubmitted && !Phone && (
                              <p style={{ color: "red" }}>
                                {/* Please fill in the phone number */}
                              </p>
                            )}
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
                              name="DOB"
                              type="date"
                              required
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
                              required
                              id="gen"
                              name="Gender"
                              class="form-control"
                              value={Gender}
                              onChange={handleGenderChange}
                            >
                              <option value="">-SELECT-</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
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
                              name="Country"
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
                              name="Address"
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
                              // name="company"
                              name="Occupation"
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
                              name="About"
                              value={About}
                              className="form-control"
                              style={{ height: "100px" }}
                              // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                              onChange={handleAboutChange}
                            ></textarea>
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
                              name="Height"
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
                              name="Weight"
                              required
                              type="text"
                              value={Weight}
                              // pattern="[0-9,A-Z]*"
                              className="form-control"
                              onChange={handleWeightChange}
                            />
                          </div>
                        </div>

                        {/* Social Media Profile Section Starts */}
                        {/* Twitter Profile */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Twitter"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Twitter Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              value={twitter}
                              type="url"
                              id="Twitter"
                              name="twitter"
                              className="form-control"
                              placeholder="Link to social profile"
                              onChange={handletwitterChange}
                            />
                          </div>
                        </div>

                        {/* Facebook Profile */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Facebook"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Facebook Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              value={facebook}
                              type="url"
                              id="Facebook"
                              name="facebook"
                              className="form-control"
                              placeholder="Link to social profile"
                              onChange={handlefacebookChange}
                            />
                          </div>
                        </div>

                        {/* Instagram Profile */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Instagram"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Instagram Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              value={instagram}
                              id="Instagram"
                              name="instagram"
                              className="form-control"
                              type="url"
                              placeholder="Link to social profile"
                              onChange={handleinstagramChange}
                            />
                          </div>
                        </div>

                        {/* Linkedin Profile */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Linkedin Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              value={linkedin}
                              type="url"
                              id="Linkedin"
                              name="linkedin"
                              className="form-control"
                              placeholder="Link to social profile"
                              onChange={handlelinkedinChange}
                            />
                          </div>
                        </div>
                        {/* Social Media Profile Section End */}

                        {/* Submit Button */}
                        <div className="text-center">
                          <button type="submit" className="btn btn-success">
                            Update Profile
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Edit Profile Section End */}

                    {/* Change Password Section */}
                    <div
                      id="profile-change-password"
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 4 ? `show active` : ``
                      }`}
                    >
                      <form onSubmit={handlePasswordUpdateSubmit}>
                        {/* Current Password */}
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
                                // value={password?.password || "password"}
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
                                  {/* Password should be at least 8 characters long */}
                                </small>
                              )}
                            {/* {errorMessage && (
                              <small style={{ color: "red" }}>
                                {errorMessage}
                              </small>
                            )} */}
                          </div>
                        </div>
                        {/* New Password */}
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
                                  {/* Password should be at least 8 characters long */}
                                </small>
                              )}
                          </div>
                        </div>
                        {/* Re-entered Password */}
                        <div className="row mb-3">
                          <label
                            htmlFor="reEnterPassword"
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
                                id="reEnterPassword"
                                name="reEnterPassword"
                                value={reEnterPassword}
                                className="form-control"
                                pattern="[A-Z,a-z,0-9,@,#]*"
                                onChange={handlereEnterPasswordChange}
                                type={showreEnterPassword ? "text" : "password"}
                              />
                              <span
                                style={{ cursor: "pointer" }}
                                className="input-group-text"
                                onClick={togglereEnterPasswordVisibility}
                              >
                                {showreEnterPassword ? (
                                  <FaEye />
                                ) : (
                                  <FaEyeSlash />
                                )}
                              </span>
                            </div>
                            {!reEnterPasswordValid &&
                              reEnterPassword.length > 0 && ( // Display warning only if password is not empty
                                <small style={{ color: "red" }} id="warn">
                                  {/* Password should be at least 8 characters long */}
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

                    {/* Accont Setting Section Start */}
                    <div
                      className={`tab-pane fade profile-edit pt-3 ${
                        tabLiNum === 3 ? `show active` : ``
                      }`}
                      id="profile-settings"
                    >
                      <form onSubmit={handleDeleteAccountSubmit}>
                        <h4 style={{ color: "#dc3545" }}>
                          <strong>Delete Account</strong>
                        </h4>
                        <hr />
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Confirm Deletion
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="form-check">
                              <input
                                required
                                type="checkbox"
                                id="changesMade"
                                style={{ cursor: "pointer" }}
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                              />
                              <label
                                htmlFor="changesMade"
                                className="form-check-label"
                              >
                                All your data is permenantally deleted, if once
                                account deleted?
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                required
                                type="checkbox"
                                id="newProducts"
                                style={{ cursor: "pointer" }}
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                              />
                              <label
                                htmlFor="newProducts"
                                className="form-check-label"
                              >
                                You did not recover your account ever, if once
                                account deleted?
                              </label>
                            </div>
                            {/* <div className="form-check">
                              <input
                                required
                                id="proOffers"
                                type="checkbox"
                                className="form-check-input"
                              />
                              <label
                                htmlFor="proOffers"
                                className="form-check-label"
                              >
                                Warning 3
                              </label>
                            </div> */}
                            {/* Add more warning */}
                            {/* <div className="form-check">
                              <input
                                required
                                type="checkbox"
                                id="securityNotify"
                                className="form-check-input"
                              />
                              <label
                                htmlFor="securityNotify"
                                className="form-check-label"
                              >
                                Warning 4
                              </label>
                            </div> */}
                          </div>
                        </div>

                        {/* <div className="text-center"> */}
                        <div className="row mb-3">
                          {/* <button type="submit" className="">
                            Button
                          </button> */}

                          {/* Delete Account Button */}
                          <div className="text-center">
                            {/* <button> */}
                            <span
                              // type="submit"
                              className="btn btn-outline-danger"
                              onClick={handleDeleteClick}
                              style={{
                                display: isDeleteConfirmationVisible
                                  ? "none"
                                  : "block",
                              }}
                            >
                              Delete Account
                            </span>
                            {/* <button> */}
                          </div>

                          {/* Delete Confirmation Modal */}
                          {isDeleteConfirmationVisible && (
                            <div className="delete-confirmation-modal">
                              <p
                                style={{
                                  color: "#dc3545",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                Are you sure you wants to delete your account?
                              </p>
                              <input
                                required
                                type="text"
                                className="form-control"
                                style={{ marginBottom: "10px" }}
                                placeholder="Any Reason to delete your account?"
                              />
                              <div className="row">
                                <div className="col">
                                  <button
                                    type="submit"
                                    style={{ width: "100%" }}
                                    className="btn btn-danger"
                                    onClick={handleDeleteAccountSubmit}
                                  >
                                    Yes, Delete Account
                                  </button>
                                </div>
                                <div className="col">
                                  <button
                                    type="submit"
                                    style={{ width: "100%" }}
                                    className="btn btn-success"
                                    onClick={handleCancelClick}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    {/* Accont Setting Section Start End */}
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
