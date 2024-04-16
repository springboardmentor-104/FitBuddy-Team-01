import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
