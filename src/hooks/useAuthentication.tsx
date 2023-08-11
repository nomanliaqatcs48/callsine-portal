import { useEffect, useState } from "react";
import { checkIfAuthenticated } from "../utils/auth";
import { devLogError } from "../helpers/logs";

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      let _check = await checkIfAuthenticated();
      if (_check) {
        setIsAuthenticated(true);
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
    }
  };

  return {
    isAuthenticated,
  };
};
