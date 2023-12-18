import React from "react";
import { Login } from "../../containers";
import { LPNavbar  } from "../../components";

const LoginPage: React.FC = () => {
  return (
    <>
      <LPNavbar  />
      <Login />
    </>
  );
};

export default LoginPage;
