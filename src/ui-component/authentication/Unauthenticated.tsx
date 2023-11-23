import React, { useEffect, useState } from "react";
import { checkIfAuthenticated } from "../../utils/auth";
import { devLogError } from "../../helpers/logs";

type UnauthenticatedTypes = {
  children: React.ReactNode;
};

const Unauthenticated = ({ children }: UnauthenticatedTypes) => {
  const [isOnPageLoading, setIsOnPageLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      let check = await checkIfAuthenticated();
      let profile: any = localStorage.getItem("profile");
      profile = JSON.parse(profile)
      if (check && profile?.subscription?.id) {
        window.location.href = "/people";
      }
      setTimeout(() => setIsOnPageLoading(false), 500);
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setTimeout(() => setIsOnPageLoading(false), 500);
    }
  };

  return <>{!isOnPageLoading && children}</>;
};

export default Unauthenticated;
