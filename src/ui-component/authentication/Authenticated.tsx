import React, { useEffect, useState } from "react";
import { checkIfAuthenticated } from "../../utils/auth";
import { devLogError } from "../../helpers/logs";
import { AuthContext } from "../../contexts/auth";
import { load } from "../../utils/storage";

type AuthenticatedTypes = {
  children: React.ReactNode;
};

const Authenticated = ({ children }: AuthenticatedTypes) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let _profile = await load("profile");
      if (_profile) {
        setProfile(_profile);
      }
    } catch (e) {
      devLogError(e);
    }
  };

  const checkAuth = async () => {
    try {
      let _check = await checkIfAuthenticated();
      if (!_check) {
        window.location.href = "/login";
      }
    } catch ({ response }) {
      devLogError(response);
    }
  };

  return (
    <AuthContext.Provider value={profile}>{children}</AuthContext.Provider>
  );
};

export default Authenticated;
