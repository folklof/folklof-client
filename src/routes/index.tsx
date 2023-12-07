import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages";

const AppRoutes: React.FC = () => {
    return (
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
      </Router>
    );
  };
  
export default AppRoutes;