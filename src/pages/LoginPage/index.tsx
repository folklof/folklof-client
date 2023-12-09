import React from "react";
import { Login } from "../../containers";
import { TopNavbar } from "../../components";

const LoginPage: React.FC = () => {
  return (
    <>
      <TopNavbar />
      <Login />
    </>
  );
};

export default LoginPage;
