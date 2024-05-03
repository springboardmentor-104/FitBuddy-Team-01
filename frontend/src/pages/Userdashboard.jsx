import "./Userdashboard.css";
import { Link } from "react-router-dom";
import person_icn from "../Assets/person.png";
import React, { useEffect, useState } from "react";

import {
  BiCog,
  BiGrid,
  BiTime,
  BiTask,
  BiUser,
  BiSearch,
  BiLogOut,
  BiHelpCircle,
} from "react-icons/bi";

import {
  BsList,
  BsArrowUp,
  BsPersonFill,
  BsCartPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

import { FaDumbbell, FaChevronDown } from "react-icons/fa";

const Userdashboard = () => {
  // My user - For opening dashboard of a user
  const [user, setUser] = useState({});
  const [openToggleMenu, setOpenToggleMenu] = useState("");
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  // Side bar toggale
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

  // For User
  // State to control the visibility of the profile dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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

  return (
    <div>
      {/* Header Section */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="" class="logo d-flex align-items-center">
            {/* <img src={mylogo_icn} alt="" /> */}
            <span class="d-none d-lg-block">Fit Buddy</span>
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
            <li class="nav-item dropdown pe-3">
              <Link
                to=""
                data-bs-toggle="dropdown"
                onClick={toggleProfileDropdown}
                class="nav-link nav-profile d-flex align-items-center pe-0"
              >
                <img
                  alt="Profile"
                  src={person_icn}
                  className="rounded-circle"
                />
                <span class="d-none d-md-block dropdown-toggle ps-2">
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
                    <hr class="dropdown-divider" />
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
                    <hr class="dropdown-divider" />
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

      {/* Aside Section */}
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

          {/* <li className="nav-item">
            <Link className="nav-link collapsed" to="">
              <BsFillPlusCircleFill />
              &nbsp;
              <span>Create Goals</span>
            </Link>
          </li> */}

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
              class={`nav-content  ${
                "sidebar-nav-create-goals" === openToggleMenu
                  ? "show"
                  : "collapse"
              }`}
              data-bs-parent="#sidebar-nav-create-goals"
            >
              <li>
                <Link to="/ExercisePage">
                  <FaDumbbell />
                  &nbsp;
                  <span>Exercises</span>
                </Link>
              </li>
              <li>
                <Link to="/create-goals">
                  <BsFillPlusCircleFill />
                  &nbsp;
                  <span>Create Goals</span>
                </Link>
              </li>
              {/* <li>
                <a href="forms-editors.html">
                  <i class="bi bi-circle"></i>
                  <span>Form Editors</span>
                </a>
              </li>
              <li>
                <a href="forms-validation.html">
                  <i class="bi bi-circle"></i>
                  <span>Form Validation</span>
                </a>
              </li> */}
            </ul>
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
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <p></p>
        </section>
      </main>

      {/* Back to Top */}
      <Link
        to=""
        onClick={scrollToTop}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <BsArrowUp style={{ color: "#fff" }} />
      </Link>
    </div>
  );
};

export default Userdashboard;
