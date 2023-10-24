import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { devLog, devLogError } from "../../helpers/logs";
import { profileService } from "../../services/profile.service";
import { checkIfAuthenticated } from "../../utils/auth";
import { load, save } from "../../utils/storage";

type AuthenticatedTypes = {
  children: React.ReactNode;
};

const Authenticated = ({ children }: AuthenticatedTypes) => {
  devLog(() => {
    console.log("in the authenticated");
  });
  const [auth, setProfile] = useState<any>(null);
  const [isOnPageLoading, setIsOnPageLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    getProfile();
  }, []);

  const updateProfile = async () => {
    try {
      let res = await profileService();
      if (res?.data) {
        await save("profile", res.data);
        setProfile(res.data);
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e);
      });
    }
  };

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
    <AuthContext.Provider value={{ auth, updateProfile }}>
      {!isOnPageLoading && children}
    </AuthContext.Provider>
  );
};

export default Authenticated;
