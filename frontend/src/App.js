import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Userdashboard from "./pages/Userdashboard";
import MyProfile from "./pages/MyProfile";
import History from "./pages/History";
import Card from "./pages/Card";
import ExerciseCard from "./pages/ExerciseCard";
import ExerciseForm from "./pages/ExerciseForm";
import ExercisePage from "./pages/ExercisePage";
import SingleExercisePage from "./pages/SingleExercisePage";
import SingleDietPage from "./pages/SingleDietPage";
import CreateGoals from "./pages/CreateGoals";
import ManageGoals from "./pages/ManageGoals";

import MainContent from "./landingPage/MainContent"
import ExerciseChart from "./pages/ExerciseChart";

// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DietPage from "./pages/DietPage";

function ProtectedRoute({ Component }) {
  const token = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.warn("Unauthorized Access, Please Login First", {
        position: "top-center",
      });
      navigate("/login");
    }
  }, []);
  return <Component />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<MainContent />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/contactus" element={<ContactUs />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />

        <Route
          exact
          path="/Userdashboard"
          element={<ProtectedRoute Component={ExerciseChart} />}
        />
        <Route
          exact
          path="/Managegoals"
          element={<ProtectedRoute Component={ManageGoals} />}
        />
        <Route
          exact
          path="/create-goals"
          element={<ProtectedRoute Component={CreateGoals} />}
        />
        <Route
          exact
          path="/Card"
          element={<ProtectedRoute Component={Card} />}
        />
        <Route
          exact
          path="/ExerciseCard"
          element={<ProtectedRoute Component={ExerciseCard} />}
        />
        <Route
          exact
          path="/ExerciseForm"
          element={<ProtectedRoute Component={ExerciseForm} />}
        />
        <Route
          exact
          path="/ExercisePage"
          element={<ProtectedRoute Component={ExercisePage} />}
        />
        <Route
          exact
          path="/DietPage"
          element={<ProtectedRoute Component={DietPage} />}
        />

        <Route
          exact
          path="/SingleExercisePage/:id"
          element={<ProtectedRoute Component={SingleExercisePage} />}
        />
        <Route
          exact
          path="/SingleDietPage/:id"
          element={<ProtectedRoute Component={SingleDietPage} />}
        />
        <Route
          exact
          path="/MyProfile"
          element={<ProtectedRoute Component={MyProfile} />}
        />
        <Route
          exact
          path="/History"
          element={<ProtectedRoute Component={History} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
