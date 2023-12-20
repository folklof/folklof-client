import React from "react";
import { TopNavbar, Footer } from "../../components";
import { PrivacyPolicy } from "../../containers";

const PrivacyPolicyPage : React.FC = () => {
    return (
    <>
      <TopNavbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

export default PrivacyPolicyPage;