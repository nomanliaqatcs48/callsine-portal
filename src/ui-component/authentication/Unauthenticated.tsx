import React, { useEffect } from "react";
import { checkIfAuthenticated } from "../../utils/auth";

type UnauthenticatedTypes = {
  children: React.ReactNode;
};

const Unauthenticated = ({ children }: UnauthenticatedTypes) => {
  useEffect(() => {
    if (checkIfAuthenticated()) {
      window.location.href = "/dashboard";
    }
  }, []);

  return <>{children}</>;
};

export default Unauthenticated;
