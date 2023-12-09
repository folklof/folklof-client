import React from "react";
import { TopNavbar, DashboardNavbar, Carousel, Footer } from "../../components";
import { BestStories, NewRelease } from "../../containers";

const DashboardPage: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <DashboardNavbar />
      <Carousel />
      <BestStories />
      <NewRelease />
      <Footer />
    </>
  );
};

export default DashboardPage;
