import React from "react";
import { TopNavbar, Footer } from "../../components";
import { TermsOfUse } from "../../containers";

const TermsOfUsePage : React.FC = () => {
    return (
    <>
      <TopNavbar />
      <TermsOfUse />
      <Footer />
    </>
  );
}

export default TermsOfUsePage;