import React, { useEffect } from "react";
import { checkIfAuthenticated } from "../../utils/auth";

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
      console.error(response);
    }
  };

  return <>{children}</>;
};

export default Unauthenticated;
