import "./Userdashboard.css";
import { Link, useLocation, useNavigation } from "react-router-dom";
import person_icn from "../Assets/person.png";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios"; import ExerciseChart from "./ExerciseChart"; // Shivankush added this
import logo from "../landingPage/logo.png";
import { IoFastFoodOutline } from "react-icons/io5";

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
  BsCartPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

import { FaDumbbell, FaChevronDown } from "react-icons/fa";

const Userdashboard = (props) => {
  const [auth, setAuth] = useAuth();
  const [tabLiNum, setTabLiNum] = useState(1);
  const location = useLocation();

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

  useEffect(() => {
    switch (location.pathname) {
      case "/Userdashboard":
        setTabLiNum(1);
        break;
      case "/ManageGoals":
        setTabLiNum(2);
        break;
      case "/ExercisePage":
        setOpenToggleMenu("sidebar-nav-create-goals");
        setTabLiNum(7);
        break;
      case "/create-goals":
        setOpenToggleMenu("sidebar-nav-create-goals");
        setTabLiNum(8);
        break;
      case "/MyProfile":
        setTabLiNum(5);
        break;
      case "/History":
        setTabLiNum(6);
        break;
      default:
        setTabLiNum(1);
        break;
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
  const [data, setData] = useState([]);
  const token = auth?.token;  // Shivankush added the below code from line 65 - 87
  useEffect(() => {
    // Check if data is available in localStorage
    const localStorageData = localStorage.getItem('chartData');
    if (localStorageData) {
      setData(JSON.parse(localStorageData));
    }

    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/history/show/chart', {
          headers: {
            "Authorization": `${token}`,
          },
        });
        if (res.data.success) {
          console.log('Fetched Data:', res.data.completionRates);
          setData(res.data.completionRates);

          // Update localStorage with fetched data
          localStorage.setItem('chartData', JSON.stringify(res.data.completionRates));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Failed to fetch data');
      }
    };

    // Fetch data only if it's not available in localStorage
    fetchData();
    // eslint-disable-line no-console

  }, [token]); // Only run when token changes

  const [page, setPage] = useState(0);
  const itemsPerPage = 7;

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < data.length) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
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
            <span class="d-none d-lg-block">
              <img src={logo} alt="Fit Buddy Image"
                // height="55px"
                height="47px"
              />
              {/* Fit Buddy */}
            </span>
          </Link>
        </div>

        {/* <div className="search-bar">
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
        </div> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* Search Bar */}
            {/* <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="">
                <BiSearch />
              </Link>
            </li> */}

            {/* User Profie */}
            <li
              class="nav-item dropdown pe-3"
              ref={ref}
              onClick={handleClickOutside}
            >
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
                  <li style={{ lineHeight: "40px" }}>
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
                  <li style={{ lineHeight: "40px" }}>
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
            <Link
              // className="nav-link "
              to="/Userdashboard"
              className={`nav-link ${tabLiNum === 1 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(1);
              }}
              style={{
                ...(tabLiNum === 1
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
              <BiGrid />
              &nbsp;
              <span>Dashboard</span>
            </Link>
          </li>

          {/* <li className="nav-heading">Pages</li> */}

          <li className="nav-item">
            {/* /ManageGoals */}
            <Link
              // className="nav-link collapsed"
              to="/ManageGoals"
              className={`nav-link ${tabLiNum === 2 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(2);
              }}
              style={{
                ...(tabLiNum === 2
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
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
              // className="nav-link collapsed"
              onClick={() => {
                setTabLiNum(3);
                setOpenToggleMenu("sidebar-nav-create-goals");
              }}
              className={`nav-link ${tabLiNum === 3 || tabLiNum === 7 || tabLiNum === 8
                ? "active"
                : ""
                }`}
              style={{
                ...(tabLiNum === 7 || tabLiNum === 8 || tabLiNum === 3
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
              <BsFillPlusCircleFill />
              &nbsp;
              <span>Create Goals</span>
              <FaChevronDown className="ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              class={`nav-content  ${"sidebar-nav-create-goals" === openToggleMenu
                ? "show"
                : "collapse"
                }`}
              data-bs-parent="#sidebar-nav-create-goals"
            >
              <li>
                <Link
                  to="/ExercisePage"
                  style={{ textDecoration: "none" }}
                  className={tabLiNum === 7 ? "active" : ""}
                >
                  <FaDumbbell />
                  &nbsp;
                  <span>Exercises</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/DietPage"
                  style={{ textDecoration: "none" }}
                  className={tabLiNum === 7 ? "active" : ""}
                >
                  <IoFastFoodOutline />
                  &nbsp;
                  <span>Diets</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/create-goals"
                  style={{ textDecoration: "none" }}
                  className={tabLiNum === 8 ? "active" : ""}
                >
                  <BsFillPlusCircleFill />
                  &nbsp;
                  <span>Create Goals</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* <li className="nav-item">
            <Link
              // className="nav-link collapsed"
              to=""
              className={`nav-link ${tabLiNum === 4 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(4);
              }}
              style={{
                ...(tabLiNum === 4
                  ? {
                      color: `#4154f1`,
                      backgroundColor: `#f6f9ff`,
                      borderColor: `#f6f9ff`,
                    }
                  : {}),
              }}
            >
              <BsCartPlusFill />
              &nbsp;
              <span>Buy Subscription</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              // className="nav-link collapsed"
              to=""
              className={`nav-link ${tabLiNum === 4 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(4);
              }}
              style={{
                ...(tabLiNum === 4
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
              <BsCartPlusFill />
              &nbsp;
              <span>Buy Subscription</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              // className="nav-link collapsed"
              to="/MyProfile"
              className={`nav-link ${tabLiNum === 5 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(5);
              }}
              style={{
                ...(tabLiNum === 5
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
              <BsPersonFill />
              &nbsp;
              <span>My Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              // className="nav-link collapsed"
              to="/History"
              className={`nav-link ${tabLiNum === 6 ? "active" : ""}`}
              onClick={() => {
                setTabLiNum(6);
              }}
              style={{
                ...(tabLiNum === 6
                  ? {
                    color: `#4154f1`,
                    backgroundColor: `#f6f9ff`,
                    borderColor: `#f6f9ff`,
                  }
                  : {}),
              }}
            >
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
        <section className="section dashboard">
          {props?.content}
          {/* Shivankush added below code , by which chart render only in dashboard */}
          {(() => {
            if (location.pathname === "/Userdashboard") {
              return (
                <div>
                  <div className="card">
                    <h1 className="card-header"
                      style={{
                        fontSize: "25px",
                        fontWeight: "600",
                        color: "#012970"
                      }}>
                      Completion Chart
                    </h1>
                    <div className="chart-navigation">
                      <button className="nav-button left" onClick={handlePrevPage}>←</button>
                      <ExerciseChart data={data} page={page} itemsPerPage={itemsPerPage} />
                      <button className="nav-button right" onClick={handleNextPage}>→</button>
                    </div>
                  </div>
                </div>
              );
            }
            return "";
          })()}
        </section>
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
    </div >
  );
};

export default Userdashboard;
