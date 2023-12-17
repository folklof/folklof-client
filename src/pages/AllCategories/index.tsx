import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TopNavbar, DashboardNavbar, Footer} from "../../components";
import { AllBooks } from "../../containers";

const AllCategoriesPage: React.FC = () => {
  const location = useLocation();
  const [isAllBooksLoaded, setIsAllBooksLoaded] = useState(false);

  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const titleQuery = query.get('title');

  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <AllBooks searchQuery={titleQuery} onLoaded={() => setIsAllBooksLoaded(true)} />
      {isAllBooksLoaded && <Footer />}
    </>
  );
};

export default AllCategoriesPage;
