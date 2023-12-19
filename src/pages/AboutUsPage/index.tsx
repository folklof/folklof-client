import React from "react";
import { TopNavbar, Footer } from "../../components";
import { AboutUs } from "../../containers";

const AboutUsPage : React.FC = () => {
    return (
    <>
      <TopNavbar />
      <AboutUs />
      <Footer />
    </>
  );
}

export default AboutUsPage;