import React, { useEffect, useState } from "react";
import { checkIfAuthenticated } from "../../utils/auth";
import { devLog, devLogError } from "../../helpers/logs";
import { AuthContext } from "../../contexts/auth";
import { load, save } from "../../utils/storage";
import { profileService } from "../../services/profile.service";

type AuthenticatedTypes = {
  children: React.ReactNode;
};

const Authenticated = ({ children }: AuthenticatedTypes) => {
  const [profile, setProfile] = useState<any>(null);
  const [isOnPageLoading, setIsOnPageLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let _profile = await load("profile");
      if (_profile) {
        setProfile(_profile);
      } else {
        let res = await profileService();
        if (res?.data) {
          await save("profile", res.data);
          setProfile(res.data);
        }
        devLog(() => {
          console.log("res", res);
        });
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e);
      });
    }
  };

  const checkAuth = async () => {
    try {
      let _check = await checkIfAuthenticated();
      if (!_check) {
        window.location.href = "/login";
      }
      setTimeout(() => setIsOnPageLoading(false), 500);
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setTimeout(() => setIsOnPageLoading(false), 500);
    }
  };

  return (
    <AuthContext.Provider value={profile}>
      {!isOnPageLoading && children}
    </AuthContext.Provider>
  );
};

export default Authenticated;
