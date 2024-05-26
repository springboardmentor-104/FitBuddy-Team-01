import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Userdashboard from "./pages/Userdashboard";
// import MyProfile from "./pages/MyProfile";  // Old Profile Page
import ProfilePage from "./pages/ProfilePage"; // New Profile Page 
//
// import History from "./pages/History";
import Histo from "./pages/Histo";
//
import Card from "./pages/Card";
//
import ExerciseCard from "./pages/ExerciseCard";
import ExerciseForm from "./pages/ExerciseForm";
import ExercisePage from "./pages/ExercisePage";
import SingleExercisePage from "./pages/SingleExercisePage";
//
import CreateGoals from "./pages/CreateGoals";
//
// import ExerciseCard from "./pages/ExerciseCard";
// import CreateGoals from "./pages/CreateGoals";
//

const App = () => {
  return (
    <Router>
      {/* <Userdashboard/> */}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/Userdashboard" element={<Userdashboard />} />

        {/* <Route exact path="/MyProfile" element={<MyProfile />} /> */}
        <Route exact path="/profile-page" element={<ProfilePage />} />

        {/* <Route exact path="/History" element={<History />} /> */}
        <Route exact path="/Histo" element={<Histo />} />

        <Route exact path="/Card" element={<Card />} />
        <Route exact path="/ExerciseCard" element={<ExerciseCard />} />
        <Route exact path="/create-goals" element={<CreateGoals />} />

        <Route exact path="/ExerciseCard" element={<ExerciseCard />} />
        <Route exact path="/ExerciseForm" element={<ExerciseForm />} />
        <Route exact path="/ExercisePage" element={<ExercisePage />} />
        <Route
          exact
          path="/SingleExercisePage/:id"
          element={<SingleExercisePage />}
        />

        <Route exact path="/CreateGoals" element={<CreateGoals />} />
      </Routes>
    </Router>
  );
};

export default App;
