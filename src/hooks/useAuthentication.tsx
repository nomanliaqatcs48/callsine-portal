import { useEffect, useState } from "react";
import { checkIfAuthenticated } from "../utils/auth";
import { devLog, devLogError } from "../helpers/logs";
import { load, save } from "../utils/storage";
import { profileService } from "../services/profile.service";

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authProfile, setAuthProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    getProfile();
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

  const getProfile = async () => {
    try {
      let _profile = await load("profile");
      if (_profile) {
        setAuthProfile(_profile);
      } else {
        let res = await profileService();
        if (res?.data) {
          await save("profile", res.data);
          setAuthProfile(res.data);
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

  return {
    isAuthenticated,
    authProfile,
  };
};
