import "./Userdashboard.css";
import { Link } from "react-router-dom";
import person_icn from "../Assets/person.png";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from '../context/auth';
import ExerciseChart from "./Charts";
import logo from "../landingPage/logo.png"


import {
  // BiCog,
  BiGrid,
  BiTime,
  BiTask,
  
  BiUser,
  // BiSearch,
  BiLogOut,
  // BiHelpCircle,
} from "react-icons/bi";

import {
  BsList,
  BsArrowUp,
  BsPersonFill,
  // BsCartPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

import { FaDumbbell, FaChevronDown } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Userdashboard = (props) => {
  const [auth, setAuth] = useAuth();

  const ref = useRef(null);
  // My user - For opening dashboard of a user

  const [user, setUser] = useState({});
  const [openToggleMenu, setOpenToggleMenu] = useState("");
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  // For profile open in navbar in headeer
  // State to control the visibility of the profile dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdown when clicking outside

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const exerciseData = [
    {
      name: "Push-ups",
      date: ["9 am"],
      percentages: [20, 40, 60, 100],
    },
    {
      name: "Sit-ups",
      date: ["3 pm"],
      percentages: [30, 50, 70, 90],
    },
    {
      name: "Running",
      date: ["7 pm"],
      percentages: [10, 40, 50, 80],
    },
    {
      name: "Skipping",
      date: ["10 pm"],
      percentages: [10, 40, 50, 90],
    },
    // Add more exercises as needed
  ];

  return (
    <div>
      {/* Header Section */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          {/* <Link
            to=""
            class="logo d-flex align-items-center"
            style={{ textDecoration: "none" }}
          >
            {/* <img src={mylogo_icn} alt="" />
            <span class="d-none d-lg-block">Fit Buddy</span>
          </Link> */}
          <BsList
            className="toggle-sidebar-btn"
            onClick={() => {
              setShowLeftSidebar((show) => {
                return !show;
              });
            }}
          />
          <Link
            to=""
            className="logo d-flex align-items-center"
            style={{ textDecoration: "none" }}
          >
            {/* <img src={mylogo_icn} alt="" /> */}
            {/* <span class="d-none d-lg-block">Fit Buddy</span> */}
            <span class="d-none d-lg-block">
    <img src={logo} alt="Fit Buddy Image" height="55px"/>
    {/* Fit Buddy */}
</span>

          </Link>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* Search Bar */}
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="">
                {/* <BiSearch /> */}
              </Link>
            </li>

            {/* User Profie */}
            <li
              className="nav-item dropdown pe-3"
              ref={ref}
              onClick={handleClickOutside}
            >
              <Link
                to=""
                data-bs-toggle="dropdown"
                onClick={toggleProfileDropdown}
                className="nav-link nav-profile d-flex align-items-center pe-0"
              >
                <img
                  alt="Profile"
                  src={person_icn}
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user?.name || "User"}
                </span>
              </Link>
              {isProfileOpen === true && (
                <ul
                  style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    transform: "translate(-25px, 35px)",
                  }}
                  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile active"
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
                      to="/MyProfile"
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
                      to="/"
                      onClick={() => {
                        setAuth({ token: "" });
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

      {/* Aside Section */}
      <aside
        id="sidebar"
        className="sidebar"
        style={showLeftSidebar === true ? {} : { left: "-300px" }}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/Userdashboard">
              <BiGrid />
              &nbsp;
              <span>Dashboard</span>
            </Link>
          </li>

          {/* <li className="nav-heading">Pages</li> */}

          <li className="nav-item">
            {/* /ManageGoals */}
            <Link className="nav-link collapsed" to="/ManageGoals">
              <BiTask />
              &nbsp;
              <span>Manage Goals</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              onClick={() =>
                setOpenToggleMenu(
                  openToggleMenu === "sidebar-nav-create-goals"
                    ? ""
                    : "sidebar-nav-create-goals"
                )
              }
            >
              <BsFillPlusCircleFill />
              &nbsp;
              <span>Create Goals</span>
              <FaChevronDown className="ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className={`nav-content  ${
                "sidebar-nav-create-goals" === openToggleMenu
                  ? "show"
                  : "collapse"
              }`}
              data-bs-parent="#sidebar-nav-create-goals"
            >
              <li>
                <Link to="/ExercisePage" style={{ textDecoration: "none" }}>
                  <FaDumbbell />
                  &nbsp;
                  <span>Exercises</span>
                </Link>
              </li>
              <li>
                <Link to="/DietPage" style={{ textDecoration: "none" }}>
                  <IoFastFoodOutline  />
                  &nbsp;
                  <span>Diets</span>
                </Link>
              </li>
              <li>
                <Link to="/create-goals" style={{ textDecoration: "none" }}>
                  <BsFillPlusCircleFill />
                  &nbsp;
                  <span>Create Goals</span>
                </Link>
              </li>
              {/* <li>
                <a href="forms-editors.html">
                  <i className="bi bi-circle"></i>
                  <span>Form Editors</span>
                </a>
              </li>
              <li>
                <a href="forms-validation.html">
                  <i className="bi bi-circle"></i>
                  <span>Form Validation</span>
                </a>
              </li> */}
            </ul>
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
        </ul>
      </aside>

      {/* Main Section */}
      <main
        id="main"
        className="main"
        style={showLeftSidebar ? {} : { marginLeft: 0 }}
      >
        {/* <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div> */}
        <section className="section dashboard">{props?.content}</section>
        {/* {props?.content}
          <div>
            <h1>Exercise Completion Chart</h1>
            <ExerciseChart data={exerciseData} />
          </div> */}
      </main>

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
  );
};

export default Userdashboard;
