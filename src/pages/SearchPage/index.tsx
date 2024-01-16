import React from "react";
import { useLocation } from "react-router-dom";
import { TopNavbar, DashboardNavbar, Footer } from "../../components";
import { SearchList } from "../../containers";

const SearchPage: React.FC = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const titleQuery = useQuery().get("title");

  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <SearchList searchQuery={titleQuery} />
      <Footer />
    </>
  );
};

export default SearchPage;
