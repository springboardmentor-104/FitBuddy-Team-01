// import PhoneInput from "react-phone-input-2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./MyProfile.css";
import "./Userdashboard.css";
import "react-phone-input-2/lib/style.css";

import person_icn from "../Assets/person.png";
import profile_icn from "../Assets/profile.png";
import Userdashboard from "../pages/Userdashboard";

import {
  FaLink,
  FaEye,
  FaEyeSlash,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

import {
  // BiCog,
  // BiGrid,
  // BiTime,
  // BiTask,
  // BiUser,
  BiTrash,
  BiUpload,
  // BiLogOut,
  // BiSearch,
  // BiHelpCircle,
} from "react-icons/bi";

import {
  // BsList,
  // BsPersonFill,
  BsArrowUp,
  // BsCartPlusFill,
  // BsFillPlusCircleFill,
} from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";

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

  const [EactiveTab, setEActiveTab] = useState(8);
  const handleETabClick = (tabNumber) => {
    setEActiveTab(tabNumber);
  };

  // My User - Name - Previous Name(fetch) - From Registration Data
  const [user, setUser] = useState({});
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
    getProfileDetails();
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

  // My User - about - about Data(fetch) - From Edit Profile Form
  // const [about, setabout] = useState({});
  // useEffect(() => {
  //   let about = localStorage.getItem("user");
  //   if (about) {
  //     about = JSON.parse(Phone);
  //     setabout(about);
  //   }
  // }, []);
  // End

  // // Side Bar Toggale
  // useEffect(() => {
  //   const toggleSidebar = () => {
  //     document.body.classList.toggle("toggle-sidebar");
  //   };
  //   const sidebarBtn = document.querySelector(".toggle-sidebar-btn");
  //   sidebarBtn.addEventListener("click", toggleSidebar);
  //   return () => {
  //     sidebarBtn.removeEventListener("click", toggleSidebar);
  //   };
  // }, []);
  // // End

  // Back to Top
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const backToTopButton = document.querySelector(".back-to-top");
  //     if (backToTopButton) {
  //       if (window.scrollY > 100) {
  //         backToTopButton.classList.add("active");
  //       } else {
  //         backToTopButton.classList.remove("active");
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
  // End

  // For User
  // State to control the visibility of the profile dropdown
  // const [isOpen, setIsOpen] = useState(false);
  // const [isProfileOpen, setIsProfileOpen] = useState(false);

  // // Function to toggle the profile dropdown
  // const toggleProfileDropdown = () => {
  //   setIsProfileOpen(!isProfileOpen);
  // };
  // // End

  // // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (isProfileOpen && !event.target.closest(".dropdown")) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isProfileOpen]);
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

  // const [setError] = useState(null); // Remove this
  // const [error, setError] = useState(""); // Added this
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
    // if (currentpassword === newPassword) {
    //   alert("Current Password and New Password Matched ! , Try another");
    // }

    // for newPassword and reEnteredPassword Matching
    // if (newPassword !== reEnterPassword) {
    //   alert("New Password and Re-entered New Password not Matched !");
    // }

    // currentpassword
    // if (currentpassword.length < 8) {
    //   alert("Current Password must be at least 8 characters long");
    // }
    // if (!isValidPassword(currentpassword)) {
    //   alert("Current Password does not match the required pattern");
    // }

    // newPassword
    // if (newPassword.length < 8) {
    //   alert("New Password must be at least 8 characters long");
    // }
    // if (!isValidPassword(newPassword)) {
    //   alert("New Password does not match the required pattern");
    // }

    // reEnterPassword
    // if (reEnterPassword.length < 8) {
    //   alert("Re-entered Password must be at least 8 characters long");
    // }
    // if (!isValidPassword(reEnterPassword)) {
    //   alert("Re-entered Password does not match the required pattern");
    // }

    // Call API for Update Password
    if (currentpassword && newPassword && reEnterPassword) {
      // All fields are filled, mark registration as completed
      if (currentpassword === newPassword) {
        return alert("Current Password and New Password Matched!, Try another");
      } else if (newPassword !== reEnterPassword) {
        return alert("New Password and Re-entered New Password not Matched !");
      } else if (currentpassword.length < 8) {
        return alert("Current Password must be at least 8 characters long");
      } else if (!isValidPassword(currentpassword)) {
        return alert("Current Password does not match the required pattern");
      } else if (newPassword.length < 8) {
        return alert("New Password must be at least 8 characters long");
      } else if (!isValidPassword(newPassword)) {
        return alert("New Password does not match the required pattern");
      } else if (reEnterPassword.length < 8) {
        return alert("Re-entered Password must be at least 8 characters long");
      } else if (!isValidPassword(reEnterPassword)) {
        return alert("Re-entered Password does not match the required pattern");
      }
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
  const [name, setname] = useState("");
  const [nameError, setnameError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handlenameChange = (e) => {
    const inputValue = e.target.value;
    setname(inputValue);
    setTouched(true);
    // Regular expression for full name validation (letters and spaces only)
    const nameRegex = /^[A-Za-z\s]*$/;
    if (!inputValue.trim()) {
      setnameError(""); // Clear error message if field is empty
    } else if (!nameRegex.test(inputValue)) {
      setnameError("Please enter a valid full name");
    } else {
      setnameError("");
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
  const [phoneno, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);

    // Check if input value is not empty and does not match the pattern
    if (inputValue && !/^\d*$/.test(inputValue)) {
      setError("Invalid phone number");
    } else {
      setError(""); // Reset error message if input is valid
    }
  };
  // End

  // For Country - New - Edit Profile
  const [country, setcountry] = useState("");
  const [countryError, setcountryError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handlecountryChange = (e) => {
    const inputValue = e.target.value;
    setcountry(inputValue);
    setTouched(true);
    // Regular expression for country validation
    const countryRegex = /^[A-Za-z\s]+$/;
    if (!inputValue.trim()) {
      setcountryError(""); // Clear error message if field is empty
    } else if (!countryRegex.test(inputValue)) {
      setcountryError("Please enter a valid country name");
    } else {
      setcountryError("");
    }
  };
  // End

  // For Address - New - Edit Profile
  const [address, setaddress] = useState("");
  const [addressError, setaddressError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleaddressChange = (e) => {
    const inputValue = e.target.value;
    setaddress(inputValue);
    setTouched(true);
    // Regular expression for address validation
    const addressRegex = /^[A-Za-z0-9\s,-]*$/;
    if (!inputValue.trim()) {
      setaddressError(""); // Clear error message if field is empty
    } else if (!addressRegex.test(inputValue)) {
      setaddressError("Please enter a valid address");
    } else {
      setaddressError("");
    }
  };
  // End

  // For Height - New - Edit Profile
  const [height, setheight] = useState("");
  const [heightError, setheightError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleheightChange = (e) => {
    const inputValue = e.target.value;
    setheight(inputValue);
    setTouched(true);
    // Regular expression for height validation (allowing only numbers)
    // const heightRegex = /^[0-9]*$/; // original
    const heightRegex = /^[0-9.]*$/;
    if (!inputValue.trim()) {
      setheightError(""); // Clear error message if field is empty
    } else if (!heightRegex.test(inputValue)) {
      setheightError("Please enter a valid height (only numbers)");
    } else {
      setheightError("");
    }
  };

  // const [heightUnit, setHeightUnit] = useState("cm"); // original
  const [heightUnit, setHeightUnit] = useState("");
  const handleHeightUnitChange = (e) => {
    setHeightUnit(e.target.value);
  };
  // End

  // Weight - New - Edit Profile
  const [weight, setweight] = useState("");
  const [weightError, setweightError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleweightChange = (e) => {
    const inputValue = e.target.value;
    setweight(inputValue);
    setTouched(true);
    // Regular expression for weight validation (only allowing digits)
    // const weightRegex = /^[0-9]*$/; // original
    const weightRegex = /^[0-9.]*$/;
    if (!inputValue.trim()) {
      setweightError(""); // Clear error message if field is empty
    } else if (!weightRegex.test(inputValue)) {
      setweightError("Please enter a valid weight (only digits)");
    } else {
      setweightError("");
    }
  };

  // const [WeightUnit, setWeightUnit] = useState("kg"); // default unit is kg - original
  const [WeightUnit, setWeightUnit] = useState("");
  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };
  // End

  // about - New - Edit Profile
  const [about, setabout] = useState("");
  const [aboutError, setaboutError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleaboutChange = (e) => {
    const inputValue = e.target.value;
    setabout(inputValue);
    setTouched(true);
    // Regular expression for validation
    const regex = /^[A-Za-z0-9\s,-]*$/;
    if (!inputValue.trim()) {
      setaboutError(""); // Clear error message if field is empty
    } else if (!regex.test(inputValue)) {
      setaboutError("Please enter a valid value for about");
    } else {
      setaboutError("");
    }
  };
  // End

  // Occupation - New - Edit Profile
  const [occupation, setoccupation] = useState("");
  const [occupationError, setoccupationError] = useState("");
  // const [touched, setTouched] = useState(false);
  const handleoccupationChange = (e) => {
    const inputValue = e.target.value;
    setoccupation(inputValue);
    setTouched(true);
    // Regular expression for occupation validation
    const occupationRegex = /^[A-Za-z\s]+$/;
    if (!inputValue.trim()) {
      setoccupationError(""); // Clear error message if field is empty
    } else if (!occupationRegex.test(inputValue)) {
      setoccupationError("Please enter a valid occupation");
    } else {
      setoccupationError("");
    }
  };
  // End

  // DOB - New - Edit Profile
  const [dob, setdob] = useState("");
  const handledobChange = (e) => {
    setdob(e.target.value);
  };
  // End

  // Age - New - Edit Profile
  const [age, setAge] = useState("");
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  // End

  // Gender - New - Edit Profile
  const [gender, setgender] = useState("");
  const handlegenderChange = (e) => {
    setgender(e.target.value);
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
    // console.log("event.target", event);
    let formData = Array.from(event.target.elements).map((e) => {
      return { [e.getAttribute("name")]: e.value };
    });
    let formData2 = {};
    formData.forEach((element) => {
      formData2 = { ...formData2, ...element };
    });
    console.log("formData2", formData2);
    // if (profilepic) {
    //   formData2.Image = profilepic;
    // }

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

  // GEt User Details
  const getProfileDetails = async () => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);

    let headers = {
      Authorization: userData?.token || "",
      "Content-Type": "application/json",
    };
    await axios
      .get("http://localhost:8080/api/v1/auth/profile", {
        headers: headers,
      })
      .then(
        (response) => {
          console.log(response?.data);
          if (response.data.success) {
            setPasswordUpdateUserId(response?.data?.user?._id);
            setname(response?.data?.user?.name);
            setUserName(response?.data?.user?.username);
            setEmail(response?.data?.user?.email);
            setPhone(response?.data?.user?.phoneno);
            setdob(response?.data?.user?.dob);
            setAge(response?.data?.user?.Age);
            setgender(response?.data?.user?.gender);
            setcountry(response?.data?.user?.country);
            setaddress(response?.data?.user?.address);
            setoccupation(response?.data?.user?.occupation);
            setabout(response?.data?.user?.about);
            setheight(response?.data?.user?.height);
            setHeightUnit(response?.data?.user?.heightUnit);
            setweight(response?.data?.user?.weight);
            setWeightUnit(response?.data?.user?.WeightUnit);
            setLink1(response?.data?.user?.link1);
            handlelink1Change({
              target: { value: response?.data?.user?.link1 },
            });
            setlink2(response?.data?.user?.link2);
            handlelink2Change({
              target: { value: response?.data?.user?.link2 },
            });
            setlink3(response?.data?.user?.link3);
            handlelink3Change({
              target: { value: response?.data?.user?.link3 },
            });
            setlink4(response?.data?.user?.link4);
            handlelink4Change({
              target: { value: response?.data?.user?.link4 },
            });
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // BMI Calculator
  // State variables for weight, height, and BMI
  const [bmi, setBMI] = useState("");
  const [bmiStatus, setBMIStatus] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  console.log(height + heightUnit);
  console.log(weight + WeightUnit);

  // Define a function to determine the text color based on the BMI status
  const getTextColor = () => {
    switch (bmiStatus) {
      case "Underweight":
        return "blue"; // Change this to your desired color for underweight
      // case "Normal weight":
      case "Normal":
        return "green"; // Change this to your desired color for normal weight
      case "Overweight":
        return "orange"; // Change this to your desired color for overweight
      case "Obesity":
        return "red"; // Change this to your desired color for obesity
      default:
        return "black"; // Default color
    }
  };

  // Define a function to generate suggestions based on BMI status and value
  const generateSuggestions = () => {
    switch (bmiStatus) {
      case "Underweight":
        return [
          "You may want to consider increasing your calorie intake.",
          "Include healthy fats and proteins in your diet to gain weight.",
        ];
      case "Normal":
        return ["Maintain your current lifestyle for a healthy weight."];
      case "Overweight":
        return [
          "Focus on portion control and increasing physical activity.",
          "Consider incorporating more fruits and vegetables into your diet.",
        ];
      case "Obesity":
        return [
          "Consult with a healthcare professional for personalized advice.",
          "Focus on gradual weight loss through a balanced diet and exercise.",
        ];
      default:
        return [];
    }
  };

  // useEffect hook to calculate BMI whenever weight or height changes
  useEffect(() => {
    // Check if weight and height are both valid numbers
    if (weight && height && !isNaN(weight) && !isNaN(height)) {
      // Convert height from cm to meters
      const heightInMeters = height / 100;

      // Calculate BMI using the formula
      const calculatedBMI = weight / (heightInMeters * heightInMeters);

      // Update the state with the calculated BMI
      setBMI(calculatedBMI.toFixed(2)); // Round BMI to 2 decimal places

      // Determine BMI status
      if (calculatedBMI < 18.5) {
        setBMIStatus("Underweight");
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
        // setBMIStatus("Normal weight");
        setBMIStatus("Normal");
      } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
        setBMIStatus("Overweight");
      } else {
        setBMIStatus("Obesity");
      }
    } else {
      // Reset BMI if weight or height is not a valid number
      setBMI("");
      setBMIStatus("");
    }
  }, [weight, height]);

  // useEffect hook to update suggestions whenever BMI status changes
  useEffect(() => {
    // Generate suggestions based on BMI status
    const generatedSuggestions = generateSuggestions();
    setSuggestions(generatedSuggestions);
  }, [bmiStatus]);
  // BMI Calculator End

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <Userdashboard
      content={
        <div>
          {/* Main Section */}
          <div>
            <div className="pagetitle">
              <h1>My Profile</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      to="/Userdashboard"
                      style={{ textDecoration: "none" }}
                    >
                      Home
                    </Link>
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
                      <h3>{occupation || "N/A"}</h3>
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
                            className={`nav-link ${
                              tabLiNum === 1 ? "active" : ""
                            }`}
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
                            className={`nav-link ${
                              tabLiNum === 2 ? "active" : ""
                            }`}
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
                            className={`nav-link ${
                              tabLiNum === 4 ? "active" : ""
                            }`}
                            onClick={() => {
                              setTabLiNum(4);
                            }}
                          >
                            Change Password
                          </button>
                        </li>

                        {/* Account Settings */}
                        <li
                          className="nav-item"
                          style={{ marginRight: "0rem" }}
                        >
                          <button
                            // className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-settings"
                            className={`nav-link ${
                              tabLiNum === 3 ? "active" : ""
                            }`}
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
                          {/* about */}
                          <h5 className="card-title" id="crd-ttl">
                            About
                          </h5>
                          {/* <p className="small fst-italic"> */}
                          <p className="">{about || "N/A"}</p>

                          <h5 className="card-title" id="crd-ttl">
                            Profile Details
                          </h5>

                          {/* Tab System for all type of content in Overview Section*/}
                          <ul className="nav nav-tabs nav-tabs-bordered">
                            <li className="nav-item">
                              <button
                                className={`nav-link ${
                                  activeTab === 5 ? "active" : ""
                                }`}
                                onClick={() => handleTabClick(5)}
                                id="my-prf-prdt-sec-hd"
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
                                id="my-prf-prdt-sec-hd"
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
                                id="my-prf-prdt-sec-hd"
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
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Full Name</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {/* {user?.name || "User"} */}
                                  {user?.name || name || "N/A"}
                                </div>
                              </div>

                              {/* User Name */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
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
                                  className="col-lg-3 col-md-"
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
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Phone No.</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {/* Phone */}
                                  {phoneno || "N/A"}
                                </div>
                              </div>

                              {/* Date of Birth */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Date of Birth</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {dob || "N/A"}
                                </div>
                              </div>

                              {/* Age */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Age</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {age || "N/A"}
                                </div>
                              </div>

                              {/* Gender */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Gender</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {gender || "N/A"}
                                </div>
                              </div>

                              {/* Country */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Country</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {country || "N/A"}
                                </div>
                              </div>

                              {/* Address */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Address</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {address || "N/A"}
                                </div>
                              </div>

                              {/* Occupation */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Occupation</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {occupation || "N/A"}
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
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Height</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {height + heightUnit || "N/A"}
                                </div>
                              </div>

                              {/* Weight */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  <strong>Weight</strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {weight + WeightUnit || "N/A"}
                                </div>
                              </div>

                              {/* Button to trigger modal */}
                              <div style={{ textAlign: "right" }}>
                                <Button
                                  type="button"
                                  variant="primary"
                                  onClick={() => {
                                    setShowModal(!showModal);
                                  }}
                                  size="sm"
                                >
                                  Check BMI
                                </Button>
                              </div>

                              {/* model */}
                              <Modal
                                show={showModal}
                                onHide={() => {
                                  setShowModal(!showModal);
                                }}
                                centered
                              >
                                <Modal.Header className="py-1" closeButton>
                                  <Modal.Title
                                    style={{
                                      fontFamily: "Nunito, sans-serif",
                                      fontWeight: "600",
                                      color: "#4154f1",
                                    }}
                                  >
                                    BMI(Body Mass Index)
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="py-1">
                                  {/* Display BMI */}
                                  <div style={{ marginTop: "15px" }}>
                                    <div
                                      className="row"
                                      style={{
                                        fontFamily: "Nunito, sans-serif",
                                        color: getTextColor(), // Apply color based on BMI status
                                      }}
                                    >
                                      <div className="col-lg-3 col-md-4">
                                        <strong>Your BMI is</strong>{" "}
                                      </div>
                                      <div className="col-lg-9 col-md-8">
                                        {bmi ? bmi + " kg/m²" : "N/A"}
                                      </div>
                                      <div className="col-lg-3 col-md-4">
                                        {bmiStatus && <strong>Status</strong>}{" "}
                                      </div>
                                      <div className="col-lg-9 col-md-8">
                                        {bmiStatus}
                                      </div>
                                      {suggestions.length > 0 && (
                                        <div>
                                          <strong>Suggestions :</strong>
                                          <ul>
                                            {suggestions.map(
                                              (suggestion, index) => (
                                                <li key={index}>
                                                  {suggestion}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer className="py-1">
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      setShowModal(!showModal);
                                    }}
                                    size="sm"
                                  >
                                    Close
                                  </Button>
                                  {/* <Button
                                    variant="primary"
                                    onClick={() => {
                                      setShowModal(!showModal);
                                    }}
                                    size="sm"
                                  >
                                    Save Changes
                                  </Button> */}
                                </Modal.Footer>
                              </Modal>
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
                                <div
                                  className="col-lg-3 col-md"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  {/* Link 1 */}
                                  <strong>
                                    {socialMedia1 || "Profile N/A"}
                                  </strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {link1 || "url N/A"}
                                </div>
                              </div>
                              {/* Link 2 */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  {/* Link 2 */}
                                  <strong>
                                    {socialMedia2 || "Profile N/A"}
                                  </strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {link2 || "url N/A"}
                                </div>
                              </div>
                              {/* Link 3 */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  {/* Link 3 */}
                                  <strong>
                                    {socialMedia3 || "Profile N/A"}
                                  </strong>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {link3 || "url N/A"}
                                </div>
                              </div>
                              {/* Link 4 */}
                              <div className="row">
                                <div
                                  className="col-lg-3 col-md-4"
                                  id="Orv-Pr-Dt-hd"
                                >
                                  {/* Link 4 */}
                                  <strong>
                                    {socialMedia4 || "Profile N/A"}
                                  </strong>
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

                            {/* Tab */}
                            <ul className="nav nav-tabs nav-tabs-bordered">
                              <li className="nav-item">
                                <span
                                  className={`nav-link ${
                                    EactiveTab === 8 ? "active" : ""
                                  }`}
                                  onClick={() => handleETabClick(8)}
                                  style={{ cursor: "pointer" }}
                                  id="my-prf-prdt-sec-hd"
                                >
                                  Basic Information
                                </span>
                              </li>
                              <li className="nav-item">
                                <span
                                  className={`nav-link ${
                                    EactiveTab === 9 ? "active" : ""
                                  }`}
                                  onClick={() => handleETabClick(9)}
                                  style={{ cursor: "pointer" }}
                                  id="my-prf-prdt-sec-hd"
                                >
                                  Body &amp; Health Status
                                </span>
                              </li>
                              <li className="nav-item">
                                <span
                                  className={`nav-link ${
                                    EactiveTab === 10 ? "active" : ""
                                  }`}
                                  onClick={() => handleETabClick(10)}
                                  style={{ cursor: "pointer" }}
                                  id="my-prf-prdt-sec-hd"
                                >
                                  Social accounts
                                </span>
                              </li>
                            </ul>

                            <div className="tab-content pt-2">
                              {/* Basic Inforamtion Section Starts */}
                              <div
                                className={`tab-pane fade profile-edit pt-3 ${
                                  EactiveTab === 8 ? "show active" : ""
                                }`}
                                id="profile-edit"
                              >
                                {/* <h5 className="card-title">Basic Inforamtion</h5> */}
                                {/* Full Name */}
                                <div className="row mb-3">
                                  <label
                                    htmlFor="name"
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    Full Name
                                  </label>
                                  <div className="col-md-8 col-lg-9">
                                    <input
                                      required
                                      type="text"
                                      id="name"
                                      name="name"
                                      // value=""
                                      // value={name}
                                      value={name}
                                      pattern="[A-Z,a-z, ]*"
                                      className="form-control"
                                      onChange={handlenameChange}
                                    />
                                    {touched && nameError && (
                                      <div className="text-danger">
                                        <small>{nameError}</small>
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
                                      value={userName}
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
                                      // value={Email}
                                      value={Email}
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
                                    <input
                                      type="text"
                                      value={phoneno}
                                      name="phoneno"
                                      id="phoneno"
                                      pattern="[0-9]*"
                                      onChange={handlePhoneChange}
                                      className="form-control"
                                    />
                                    {/* Show error message only if error is not empty */}
                                    {error && (
                                      <div className="text-danger">
                                        <small>{error}</small>
                                      </div>
                                    )}

                                    {/* <PhoneInput
                              // required
                              id="Phone"
                              name="Phone"
                              type="phone"
                              value={Phone}
                              country={"in"} // Default country code
                              onChange={handlePhoneChange}
                              inputStyle={{ width: "100%" }} // Custom input width
                            /> */}
                                    {/* Display error message if form is submitted and phone is empty */}
                                    {/* {EditFormSubmitted && !Phone && (
                              <p style={{ color: "red" }}>
                                Please fill in the phone number
                              </p>
                            )} */}
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
                                      // required
                                      value={dob}
                                      min="1950-01-01"
                                      max="2025-01-01"
                                      className="form-control"
                                      onChange={handledobChange}
                                    />
                                  </div>
                                </div>
                                {/* Age */}
                                <div className="row mb-3">
                                  <label
                                    htmlFor="Age"
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    Age
                                  </label>
                                  <div className="col-md-8 col-lg-9">
                                    <input
                                      id="Age"
                                      name="Age"
                                      type="number"
                                      // required
                                      value={age}
                                      min="0"
                                      max=""
                                      className="form-control"
                                      onChange={handleAgeChange}
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
                                      id="gender"
                                      name="gender"
                                      class="form-control"
                                      value={gender}
                                      onChange={handlegenderChange}
                                    >
                                      <option value="">-SELECT-</option>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="other">Other</option>
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
                                      id="country"
                                      name="country"
                                      value={country}
                                      pattern="[A-Z,a-z]*"
                                      className="form-control"
                                      onChange={handlecountryChange}
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
                                      id="address"
                                      name="address"
                                      value={address}
                                      className="form-control"
                                      // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                                      onChange={handleaddressChange}
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
                                      name="occupation"
                                      value={occupation}
                                      className="form-control"
                                      onChange={handleoccupationChange}
                                    />
                                    {touched && occupationError && (
                                      <div className="text-danger">
                                        <small>{occupationError}</small>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* about */}
                                <div className="row mb-3">
                                  <label
                                    htmlFor="about"
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    about
                                  </label>
                                  <div className="col-md-8 col-lg-9">
                                    <textarea
                                      // required
                                      id="about"
                                      name="about"
                                      value={about}
                                      className="form-control"
                                      style={{ height: "100px" }}
                                      // pattern="[a-z,A-Z,0-9,-,_,@,#, ]*"
                                      onChange={handleaboutChange}
                                    ></textarea>
                                    {touched && aboutError && (
                                      <div className="text-danger">
                                        <small>{aboutError}</small>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* Basic Inforamtion Section End */}

                              {/* Body & Health Status Starts */}
                              <div
                                className={`tab-pane fade profile-edit pt-3 ${
                                  EactiveTab === 9 ? "show active" : ""
                                }`}
                                id="profile-edit"
                              >
                                {/* <h5 className="card-title">
                              Body &amp; Health Status
                            </h5> */}
                                {/* Height */}
                                <div className="row mb-3">
                                  <label
                                    htmlFor=""
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    Height
                                  </label>
                                  <div className="col-md-8 col-lg-9">
                                    <div className="input-group">
                                      <input
                                        // value=""
                                        // required
                                        // pattern="[0-9,A-Z]*"
                                        id=""
                                        name="height"
                                        type="text"
                                        value={height}
                                        className="form-control"
                                        onChange={handleheightChange}
                                      />
                                      <span className="input-group-text">
                                        <select
                                          id="heightUnit"
                                          value={heightUnit}
                                          name="heightUnit"
                                          onChange={handleHeightUnitChange}
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          className="form-control"
                                        >
                                          <option value="">-unit-</option>
                                          <option value="mm">mm</option>
                                          <option value="cm">cm</option>
                                          <option value="m">m</option>
                                          <option value="ft">ft</option>
                                          {/* Add more options for other units if needed */}
                                        </select>
                                      </span>
                                    </div>
                                    {touched && heightError && (
                                      <div className="text-danger">
                                        <small>{heightError}</small>
                                      </div>
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
                                    <div className="input-group">
                                      <input
                                        // value=""
                                        // required
                                        // pattern="[0-9,A-Z]*"
                                        id=""
                                        name="weight"
                                        type="text"
                                        value={weight}
                                        className="form-control"
                                        onChange={handleweightChange}
                                      />
                                      <span className="input-group-text">
                                        <select
                                          id="WeightUnit"
                                          value={WeightUnit}
                                          name="WeightUnit"
                                          onChange={handleWeightUnitChange}
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          className="form-control"
                                        >
                                          <option value="">-unit-</option>
                                          <option value="gm">gm</option>
                                          <option value="kg">kg</option>
                                          <option value="lbs">lbs</option>
                                          {/* <option value="pound">pound</option> */}
                                          {/* Add more options for other units if needed */}
                                        </select>
                                      </span>
                                    </div>
                                    {touched && weightError && (
                                      <div className="text-danger">
                                        <small>{weightError}</small>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* Body & Health Status End */}

                              {/* Social Media Profile Section Starts */}
                              <div
                                className={`tab-pane fade profile-edit pt-3 ${
                                  EactiveTab === 10 ? "show active" : ""
                                }`}
                                id="profile-edit"
                              >
                                {/* <h5 className="card-title">Social accounts</h5> */}
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
                                      <div className="text-danger">
                                        <small>{link3Error}</small>
                                      </div>
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
                                      <div className="text-danger">
                                        <small>{link4Error}</small>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* Social Media Profile Section End */}
                            </div>

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
                                    type={
                                      showcurrentpassword ? "text" : "password"
                                    }
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
                                    {shownewPassword ? (
                                      <FaEye />
                                    ) : (
                                      <FaEyeSlash />
                                    )}
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
                                    type={
                                      showreEnterPassword ? "text" : "password"
                                    }
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
                                htmlFor="name"
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
                                    All your data is permenantally deleted, if
                                    once account deleted?
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
                                    You did not recover your account ever, if
                                    once account deleted?
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
                                    Are you sure you wants to delete your
                                    account?
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
          </div>

          {/* Back to Top */}
          <Link
            to=""
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="back-to-top d-flex align-items-center justify-content-center"
          >
            <BsArrowUp style={{ color: "#fff" }} />
          </Link>
        </div>
      }
    />
  );
};

// code is too big divide into components
export default MyProfile;
