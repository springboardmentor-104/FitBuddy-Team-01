import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Userdashboard from "./pages/Userdashboard";
import History from "./pages/History";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";

import ExerciseCard from "./pages/ExerciseCard";
import ExerciseForm from "./pages/ExerciseForm";
import ExercisePage from "./pages/ExercisePage";

import CreateGoals from "./pages/CreateGoals";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/dashboard" element={<Userdashboard />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/History" element={<History />} />
        <Route exact path="/MyProfile" element={<MyProfile />} />

        <Route exact path="/ExerciseCard" element={<ExerciseCard />} />
        <Route exact path="/ExerciseForm" element={<ExerciseForm />} />
        <Route exact path="/ExercisePage" element={<ExercisePage />} />

        <Route exact path="/CreateGoals" element={<CreateGoals />} />
      </Routes>
    </Router>
  );
};

export default App;
