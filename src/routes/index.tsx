import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, LandingPage, LoginPage, AllCategoriesPage, BookDetailsPage, LibraryPage, FavouritePage, AuthPage, SearchPage , AboutUsPage} from "../pages";
import {ProtectedRoute }from '../services';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/success" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        
        {/* Wrap the protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<AllCategoriesPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/favourites" element={<FavouritePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
