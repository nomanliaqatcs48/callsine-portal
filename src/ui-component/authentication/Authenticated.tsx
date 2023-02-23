import React, { useEffect } from "react";
import { checkIfAuthenticated } from "../../utils/auth";

type AuthenticatedTypes = {
  children: React.ReactNode;
};

const Authenticated = ({ children }: AuthenticatedTypes) => {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      let _check = await checkIfAuthenticated();
      if (!_check) {
        window.location.href = "/login";
      }
    } catch (e) {
      //
    }
  };

  return <>{children}</>;
};

export default Authenticated;
