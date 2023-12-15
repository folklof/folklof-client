import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, LandingPage, LoginPage, AllCategoriesPage, BookDetailsPage } from "../pages";
import SearchPage from "../pages/SearchPage";

const AppRoutes: React.FC = () => {
    return (
      <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/categories" element={<AllCategoriesPage />} />
              <Route path="/book/:id" element={< BookDetailsPage/>} />
              <Route path="/search" element={<SearchPage/>} />
            </Routes>
      </Router>
    );
  };
  
export default AppRoutes;