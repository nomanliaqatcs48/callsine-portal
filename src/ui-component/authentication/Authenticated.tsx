import React, { useEffect } from "react";
import { checkIfAuthenticated } from "../../utils/auth";

type AuthenticatedTypes = {
  children: React.ReactNode;
};

const Authenticated = ({ children }: AuthenticatedTypes) => {
  useEffect(() => {
    if (!checkIfAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  return <>{children}</>;
};

export default Authenticated;
