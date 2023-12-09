import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, LandingPage, LoginPage } from "../pages";

const AppRoutes: React.FC = () => {
    return (
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
      </Router>
    );
  };
  
export default AppRoutes;