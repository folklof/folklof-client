import React from 'react';
import { TopNavbar, DashboardNavbar, Footer } from "../../components";
import { AllBooks } from "../../containers";

const AllCategoriesPage: React.FC = () => {
  
  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AllBooks />
      <Footer />
    </>
  );
};

export default AllCategoriesPage;
