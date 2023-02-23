import React, { useEffect } from "react";
import { checkIfAuthenticated } from "../../utils/auth";
import { devLogError } from "../../helpers/logs";

type UnauthenticatedTypes = {
  children: React.ReactNode;
};

const Unauthenticated = ({ children }: UnauthenticatedTypes) => {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      let check = await checkIfAuthenticated();
      if (check) {
        window.location.href = "/dashboard";
      }
    } catch ({ response }) {
      devLogError(response);
    }
  };

  return <>{children}</>;
};

export default Unauthenticated;
