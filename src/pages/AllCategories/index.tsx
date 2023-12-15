import React from 'react';
import { useLocation } from 'react-router-dom';
import { TopNavbar, DashboardNavbar, Footer} from "../../components";
import { AllBooks } from "../../containers";

const AllCategoriesPage: React.FC = () => {
  const location = useLocation();

  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const titleQuery = query.get('title'); // Retrieve the 'title' query parameter

  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AllBooks searchQuery={titleQuery} />
      <Footer />
    </>
  );
};

export default AllCategoriesPage;
