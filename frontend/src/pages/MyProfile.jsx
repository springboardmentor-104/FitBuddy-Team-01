import axios from "axios";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import React, { useEffect, useState } from "react";

import "./MyProfile.css";
import "./Userdashboard.css";
import "react-phone-input-2/lib/style.css";

import person_icn from "../Assets/person.png";
import profile_icn from "../Assets/profile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  FaLink,
  FaEye,
  FaEyeSlash,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

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

import {
  BsList,
  BsPersonFill,
  BsArrowUp,
  BsCartPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

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

  // My User - userId - userId Data(fetch) - From Registration Form
  const [userId, setuserId] = useState({});
  useEffect(() => {
    let userId = localStorage.getItem("user");
    if (userId) {
      userId = JSON.parse(userId);
      setuserId(userId);
    }
  }, []);
  //

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
    // if (oldpassword !== password) {
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
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleFullNameChange = (e) => {
    const inputValue = e.target.value;
    setFullName(inputValue);
    setTouched(true);
    // Regular expression for full name validation (letters and spaces only)
    const fullNameRegex = /^[A-Za-z\s]*$/;
    if (!inputValue.trim()) {
      setFullNameError(""); // Clear error message if field is empty
    } else if (!fullNameRegex.test(inputValue)) {
      setFullNameError("Please enter a valid full name");
    } else {
      setFullNameError("");
    }
  };
  // End

  // For username - New - Edit Profile
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [touched, setTouched] = useState(false);
  const handleUserNameChange = (e) => {
    const inputValue = e.target.value;
    setUserName(inputValue);
    setTouched(true);
    // Regular expression for username validation
    const userNameRegex = /^[A-Za-z0-9@#]+$/;
    if (!inputValue.trim()) {
      setUserNameError("");
    } else if (!userNameRegex.test(inputValue)) {
      setUserNameError("Please enter a valid username");
    } else {
      setUserNameError("");
    }
  };
  // End

  // For Email - New - Edit Profile
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setTouched(true);
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputValue.trim()) {
      setEmailError("");
    } else if (!emailRegex.test(inputValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  // End

  // For Phone - New - Edit Profile
  const [Phone, setPhone] = useState("");
  const handlePhoneChange = (value) => {
    setPhone(value);
  };
  // End

  // For Country - New - Edit Profile
  const [Country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleCountryChange = (e) => {
    const inputValue = e.target.value;
    setCountry(inputValue);
    setTouched(true);
    // Regular expression for country validation
    const countryRegex = /^[A-Za-z\s]+$/;
    if (!inputValue.trim()) {
      setCountryError(""); // Clear error message if field is empty
    } else if (!countryRegex.test(inputValue)) {
      setCountryError("Please enter a valid country name");
    } else {
      setCountryError("");
    }
  };
  // End

  // For Address - New - Edit Profile
  const [Address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    setTouched(true);
    // Regular expression for address validation
    const addressRegex = /^[A-Za-z0-9\s,-]*$/;
    if (!inputValue.trim()) {
      setAddressError(""); // Clear error message if field is empty
    } else if (!addressRegex.test(inputValue)) {
      setAddressError("Please enter a valid address");
    } else {
      setAddressError("");
    }
  };
  // End

  // For Height - New - Edit Profile
  const [Height, setHeight] = useState("");
  const [heightError, setHeightError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleHeightChange = (e) => {
    const inputValue = e.target.value;
    setHeight(inputValue);
    setTouched(true);
    // Regular expression for height validation (allowing only numbers)
    const heightRegex = /^[0-9]*$/;
    if (!inputValue.trim()) {
      setHeightError(""); // Clear error message if field is empty
    } else if (!heightRegex.test(inputValue)) {
      setHeightError("Please enter a valid height (only numbers)");
    } else {
      setHeightError("");
    }
  };
  // End

  // Weight - New - Edit Profile
  const [Weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleWeightChange = (e) => {
    const inputValue = e.target.value;
    setWeight(inputValue);
    setTouched(true);
    // Regular expression for weight validation (only allowing digits)
    const weightRegex = /^[0-9]*$/;
    if (!inputValue.trim()) {
      setWeightError(""); // Clear error message if field is empty
    } else if (!weightRegex.test(inputValue)) {
      setWeightError("Please enter a valid weight (only digits)");
    } else {
      setWeightError("");
    }
  };
  // End

  // About - New - Edit Profile
  const [About, setAbout] = useState("");
  const [aboutError, setAboutError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleAboutChange = (e) => {
    const inputValue = e.target.value;
    setAbout(inputValue);
    setTouched(true);
    // Regular expression for validation
    const regex = /^[A-Za-z0-9\s,-]*$/;
    if (!inputValue.trim()) {
      setAboutError(""); // Clear error message if field is empty
    } else if (!regex.test(inputValue)) {
      setAboutError("Please enter a valid value for About");
    } else {
      setAboutError("");
    }
  };
  // End

  // Occupation - New - Edit Profile
  const [Occupation, setOccupation] = useState("");
  const [occupationError, setOccupationError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleOccupationChange = (e) => {
    const inputValue = e.target.value;
    setOccupation(inputValue);
    setTouched(true);
    // Regular expression for occupation validation
    const occupationRegex = /^[A-Za-z\s]+$/;
    if (!inputValue.trim()) {
      setOccupationError(""); // Clear error message if field is empty
    } else if (!occupationRegex.test(inputValue)) {
      setOccupationError("Please enter a valid occupation");
    } else {
      setOccupationError("");
    }
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

  const [socialMedia1, setSocialMedia1] = useState("");
  const [socialMedia2, setSocialMedia2] = useState("");
  const [socialMedia3, setSocialMedia3] = useState("");
  const [socialMedia4, setSocialMedia4] = useState("");

  // Social Link 1 - New - Edit Profile
  const [link1, setLink1] = useState("");
  const [link1Error, setLink1Error] = useState("");
  const handlelink1Change = (e) => {
    const url = e.target.value;
    setLink1(url);
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!url.trim()) {
      setSocialMedia1("");
      setLink1Error("");
    } else if (!urlRegex.test(url)) {
      setLink1Error("Please enter a valid URL");
    } else if (url.includes("linkedin.com")) {
      setSocialMedia1("LinkedIn");
      setLink1Error("");
    } else if (url.includes("twitter.com")) {
      setSocialMedia1("Twitter");
      setLink1Error("");
    } else if (url.includes("facebook.com")) {
      setSocialMedia1("Facebook");
      setLink1Error("");
    } else if (url.includes("instagram.com")) {
      setSocialMedia1("Instagram");
      setLink1Error("");
    } else {
      setSocialMedia1("");
      setLink1Error("Please enter a valid social media URL");
    }
  };
  // End

  // Social Link 2 - New - Edit Profile
  const [link2, setlink2] = useState("");
  const [link2Error, setlink2Error] = useState("");
  const handlelink2Change = (e) => {
    const inputValue = e.target.value;
    setlink2(inputValue);
    setTouched(true);
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!inputValue.trim()) {
      setlink2Error(""); // Clear error message if field is empty
    } else if (!urlRegex.test(inputValue)) {
      setlink2Error("Please enter a valid URL");
    } else {
      setlink2Error("");
      // Check if the input URL matches with any of the social media URLs
      if (inputValue.includes("linkedin.com")) {
        setSocialMedia2("LinkedIn");
      } else if (inputValue.includes("twitter.com")) {
        setSocialMedia2("Twitter");
      } else if (inputValue.includes("facebook.com")) {
        setSocialMedia2("Facebook");
      } else if (inputValue.includes("instagram.com")) {
        setSocialMedia2("Instagram");
      } else {
        setSocialMedia2("");
      }
    }
  };
  // End

  // Social Link 3 - New - Edit Profile
  const [link3, setlink3] = useState("");
  const [link3Error, setlink3Error] = useState("");
  const handlelink3Change = (e) => {
    const inputValue = e.target.value;
    setlink3(inputValue);
    setTouched(true);
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!inputValue.trim()) {
      setlink3Error(""); // Clear error message if field is empty
    } else if (!urlRegex.test(inputValue)) {
      setlink3Error("Please enter a valid URL");
    } else {
      setlink3Error("");
      // Check if the input URL matches with any of the social media URLs
      if (inputValue.includes("linkedin.com")) {
        setSocialMedia3("LinkedIn");
      } else if (inputValue.includes("twitter.com")) {
        setSocialMedia3("Twitter");
      } else if (inputValue.includes("facebook.com")) {
        setSocialMedia3("Facebook");
      } else if (inputValue.includes("instagram.com")) {
        setSocialMedia3("Instagram");
      } else {
        setSocialMedia3("");
      }
    }
  };
  // End

  // Social Link 4 - New - Edit Profile
  const [link4, setlink4] = useState("");
  const [link4Error, setlink4Error] = useState("");
  const handlelink4Change = (e) => {
    const inputValue = e.target.value;
    setlink4(inputValue);
    setTouched(true);
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!inputValue.trim()) {
      setlink4Error(""); // Clear error message if field is empty
    } else if (!urlRegex.test(inputValue)) {
      setlink4Error("Please enter a valid URL");
    } else {
      setlink4Error("");
    }
    // Check if the input URL matches with any of the social media URLs
    if (inputValue.includes("linkedin.com")) {
      setSocialMedia4("LinkedIn");
    } else if (inputValue.includes("twitter.com")) {
      setSocialMedia4("Twitter");
    } else if (inputValue.includes("facebook.com")) {
      setSocialMedia4("Facebook");
    } else if (inputValue.includes("instagram.com")) {
      setSocialMedia4("Instagram");
    } else {
      setSocialMedia4("");
    }
  };
  // End

  // Edit form submission logic
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

    // Proceed with form submission logic
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    let data = formData2;
    let headers = {
      Authorization: userData?.token || "",
      "Content-Type": "application/json",
    };

    await axios
      .put("http://localhost:8080/api/v1/auth/update-profile", data, {
        headers: headers,
      })
      .then(
        (response) => {
          alert("Update profile successfully!");
          setEditFormSubmitted(true); // Update state to indicate form submission
        },
        (error) => {
          console.log(error);
          // alert(error?.data?.error || error?.response?.data?.error);
        }
      );
  };
  // End

  // Account deletion logic
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

  // For deletion of profile Image
  const [profilepic, setprofilepic] = useState(""); // Add state for user ID
  const handleDeleteImage = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to reset your current avatar?"
    );
    if (confirmDelete) {
      // Send a request to the backend to delete the image
      fetch("/api/v1/auth/profile/image", {
        // Update the endpoint here
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // Pass any necessary data in the request body, such as user ID or image ID
        body: JSON.stringify({
          userId: userId,
          imageId: profilepic,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Image deleted successfully");
            // Optionally, update the UI to reflect the deletion
          } else {
            console.error("Failed to delete image");
          }
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
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
                  style={{ width: "35px", height: "35px" }}
                  src={profilepic || person_icn}
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
                    src={profilepic || person_icn}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h2>{user?.name || "N/A"}</h2>
                  <h3>{Occupation || "N/A"}</h3>
                  <div className="social-links mt-2">
                    <Link to={link1} className="twitter">
                      {/* Dynamically add icon 1 */}
                      {socialMedia1 === "LinkedIn" && <FaLinkedin />}
                      {socialMedia1 === "Twitter" && <FaTwitter />}
                      {socialMedia1 === "Facebook" && <FaFacebook />}
                      {socialMedia1 === "Instagram" && <FaInstagram />}
                    </Link>
                    <Link to={link2} className="facebook">
                      {/* Dynamically add icon 2 */}
                      {socialMedia2 === "LinkedIn" && <FaLinkedin />}
                      {socialMedia2 === "Twitter" && <FaTwitter />}
                      {socialMedia2 === "Facebook" && <FaFacebook />}
                      {socialMedia2 === "Instagram" && <FaInstagram />}
                    </Link>
                    <Link to={link3} className="instagram">
                      {/* Dynamically add icon 3 */}
                      {socialMedia3 === "LinkedIn" && <FaLinkedin />}
                      {socialMedia3 === "Twitter" && <FaTwitter />}
                      {socialMedia3 === "Facebook" && <FaFacebook />}
                      {socialMedia3 === "Instagram" && <FaInstagram />}
                    </Link>
                    <Link to={link4} className="linkedin">
                      {/* Dynamically add icon 4 */}
                      {socialMedia4 === "LinkedIn" && <FaLinkedin />}
                      {socialMedia4 === "Twitter" && <FaTwitter />}
                      {socialMedia4 === "Facebook" && <FaFacebook />}
                      {socialMedia4 === "Instagram" && <FaInstagram />}
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
                            Body &amp; Health Status
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
                              {/* Link 1 */}
                              <strong>{socialMedia1 || "Profile N/A"}</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {link1 || "url N/A"}
                            </div>
                          </div>
                          {/* Link 2 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              {/* Link 2 */}
                              <strong>{socialMedia2 || "Profile N/A"}</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {link2 || "url N/A"}
                            </div>
                          </div>
                          {/* Link 3 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              {/* Link 3 */}
                              <strong>{socialMedia3 || "Profile N/A"}</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {link3 || "url N/A"}
                            </div>
                          </div>
                          {/* Link 4 */}
                          <div className="row">
                            <div className="col-lg-3 col-md-4 label">
                              {/* Link 4 */}
                              <strong>{socialMedia4 || "Profile N/A"}</strong>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              {link4 || "url N/A"}
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
                              id="profilepic"
                              // src={profile_icn}
                              src={profilepic || profile_icn}
                              className={`profilepic`}
                              style={{
                                // width: "200px",
                                // height: "200px",
                                borderRadius: "0%",
                                // border: "1px solid #191919",
                                border: "1px solid #919191",
                              }}
                            />
                            <div className="pt-2">
                              <input
                                name="Image"
                                // value={image}
                                type="file"
                                accept="image/jpej, image/png, image/jpg"
                                id="input-file"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                  var tmppath = URL.createObjectURL(
                                    event.target.files[0]
                                  );
                                  setprofilepic(tmppath);
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

                        <h5 className="card-title">Basic Inforamtion</h5>

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
                              required
                              type="text"
                              id="fullName"
                              name="fullName"
                              // value=""
                              // value={fullName}
                              // value={user?.name || fullName || "User"}
                              pattern="[A-Z,a-z, ]*"
                              className="form-control"
                              onChange={handleFullNameChange}
                            />
                            {touched && fullNameError && (
                              <div className="text-danger">
                                <small>{fullNameError}</small>
                              </div>
                            )}
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
                              // value={
                              //   username?.username || userName || "username"
                              // }
                              className="form-control"
                              pattern="[A-Z,a-z,0-9,@,#]*"
                              onChange={handleUserNameChange}
                            />
                            {touched && userNameError && (
                              <div className="text-danger">
                                <small>{userNameError}</small>
                              </div>
                            )}
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
                              value={Email}
                              // value={email?.email || Email || "email"}
                              className="form-control"
                              pattern="[A-Z,a-z,0-9,@,.]*"
                              onChange={handleEmailChange}
                            />
                            {touched && emailError && (
                              <div className="text-danger">
                                <small>{emailError}</small>
                              </div>
                            )}
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
                              // required
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
                              // required
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
                              // required
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
                              // required
                              type="text"
                              id="Country"
                              name="Country"
                              value={Country}
                              pattern="[A-Z,a-z]*"
                              className="form-control"
                              onChange={handleCountryChange}
                            />
                            {touched && countryError && (
                              <div className="text-danger">
                                <small>{countryError}</small>
                              </div>
                            )}
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
                              // required
                              type="text"
                              id="Address"
                              name="Address"
                              value={Address}
                              className="form-control"
                              // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                              onChange={handleAddressChange}
                            />
                            {touched && addressError && (
                              <div className="text-danger">
                                <small>{addressError}</small>
                              </div>
                            )}
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
                              // required
                              type="text"
                              id="company"
                              // name="company"
                              name="Occupation"
                              value={Occupation}
                              className="form-control"
                              onChange={handleOccupationChange}
                            />
                            {touched && occupationError && (
                              <div className="text-danger">
                                <small>{occupationError}</small>
                              </div>
                            )}
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
                              // required
                              id="about"
                              name="About"
                              value={About}
                              className="form-control"
                              style={{ height: "100px" }}
                              // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                              onChange={handleAboutChange}
                            ></textarea>
                            {touched && aboutError && (
                              <div className="text-danger">
                                <small>{aboutError}</small>
                              </div>
                            )}
                          </div>
                        </div>

                        <h5 className="card-title">Body &amp; Health Status</h5>

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
                              // required
                              // pattern="[0-9,A-Z]*"
                              id=""
                              name="Height"
                              type="text"
                              value={Height}
                              className="form-control"
                              onChange={handleHeightChange}
                            />
                            {touched && heightError && (
                              <div className="text-danger">{heightError}</div>
                            )}
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
                              // required
                              // pattern="[0-9,A-Z]*"
                              id=""
                              name="Weight"
                              type="text"
                              value={Weight}
                              className="form-control"
                              onChange={handleWeightChange}
                            />
                            {touched && weightError && (
                              <div className="text-danger">{weightError}</div>
                            )}
                          </div>
                        </div>

                        {/* Social Media Profile Section Starts */}

                        <h5 className="card-title">Social accounts</h5>

                        {/* Link 1 */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Twitter"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            {/* Link 1 Profile */}
                            {socialMedia1 && (
                              <div>
                                <span>
                                  {/* Social Media :  */}
                                  {socialMedia1}
                                </span>
                                {/* Leave space for the icon */}
                              </div>
                            )}
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* Conditionally render the link icon or a default icon */}
                                {socialMedia1 ? (
                                  <>
                                    {socialMedia1 === "LinkedIn" && (
                                      <FaLinkedin />
                                    )}
                                    {socialMedia1 === "Twitter" && (
                                      <FaTwitter />
                                    )}
                                    {socialMedia1 === "Facebook" && (
                                      <FaFacebook />
                                    )}
                                    {socialMedia1 === "Instagram" && (
                                      <FaInstagram />
                                    )}
                                  </>
                                ) : (
                                  <FaLink />
                                )}
                              </span>
                              <input
                                value={link1}
                                type="url"
                                id="link1"
                                name="link1"
                                className="form-control"
                                placeholder="Link to social profile"
                                onChange={handlelink1Change}
                              />
                            </div>
                            {link1Error && (
                              <div className="text-danger">
                                <small>{link1Error}</small>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Link 2 */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Facebook"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            {/* Link 2 Profile */}
                            {socialMedia2 && (
                              <div>
                                <span>
                                  {/* Social Media :  */}
                                  {socialMedia2}
                                </span>
                                {/* Leave space for the icon */}
                              </div>
                            )}
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* Conditionally render the link icon or a default icon */}
                                {socialMedia2 ? (
                                  <>
                                    {socialMedia2 === "LinkedIn" && (
                                      <FaLinkedin />
                                    )}
                                    {socialMedia2 === "Twitter" && (
                                      <FaTwitter />
                                    )}
                                    {socialMedia2 === "Facebook" && (
                                      <FaFacebook />
                                    )}
                                    {socialMedia2 === "Instagram" && (
                                      <FaInstagram />
                                    )}
                                  </>
                                ) : (
                                  <FaLink />
                                )}
                              </span>
                              <input
                                value={link2}
                                type="url"
                                id="link2"
                                name="link2"
                                className="form-control"
                                placeholder="Link to social profile"
                                onChange={handlelink2Change}
                              />
                            </div>
                            {touched && link2Error && (
                              <div className="text-danger">
                                <small>{link2Error}</small>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Link 3 */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Instagram"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            {/* Link 3 Profile */}
                            {socialMedia3 && (
                              <div>
                                <span>
                                  {/* Social Media :  */}
                                  {socialMedia3}
                                </span>
                                {/* Leave space for the icon */}
                              </div>
                            )}
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* Conditionally render the link icon or a default icon */}
                                {socialMedia3 ? (
                                  <>
                                    {socialMedia3 === "LinkedIn" && (
                                      <FaLinkedin />
                                    )}
                                    {socialMedia3 === "Twitter" && (
                                      <FaTwitter />
                                    )}
                                    {socialMedia3 === "Facebook" && (
                                      <FaFacebook />
                                    )}
                                    {socialMedia3 === "Instagram" && (
                                      <FaInstagram />
                                    )}
                                  </>
                                ) : (
                                  <FaLink />
                                )}
                              </span>
                              <input
                                value={link3}
                                id="link3"
                                name="link3"
                                className="form-control"
                                type="url"
                                placeholder="Link to social profile"
                                onChange={handlelink3Change}
                              />
                            </div>
                            {touched && link3Error && (
                              <div className="text-danger">{link3Error}</div>
                            )}
                          </div>
                        </div>

                        {/* Link 4 */}
                        <div className="row mb-3">
                          <label
                            htmlFor="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            {/* Link 4 Profile */}
                            {socialMedia4 && (
                              <div>
                                <span>
                                  {/* Social Media :  */}
                                  {socialMedia4}
                                </span>
                                {/* Leave space for the icon */}
                              </div>
                            )}
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* Conditionally render the link icon or a default icon */}
                                {socialMedia4 ? (
                                  <>
                                    {socialMedia4 === "LinkedIn" && (
                                      <FaLinkedin />
                                    )}
                                    {socialMedia4 === "Twitter" && (
                                      <FaTwitter />
                                    )}
                                    {socialMedia4 === "Facebook" && (
                                      <FaFacebook />
                                    )}
                                    {socialMedia4 === "Instagram" && (
                                      <FaInstagram />
                                    )}
                                  </>
                                ) : (
                                  <FaLink />
                                )}
                              </span>
                              <input
                                value={link4}
                                type="url"
                                id="link4"
                                name="link4"
                                className="form-control"
                                placeholder="Link to social profile"
                                onChange={handlelink4Change}
                              />
                            </div>
                            {touched && link4Error && (
                              <div className="text-danger">{link4Error}</div>
                            )}
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
                                // value={password?.password || "N/A"}
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
