import moment from "moment-timezone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const usePermissions = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());

  const isNotPremium = () => {
    try {
      let _now = moment.tz(timezone);
      if (auth?.subscription) {
        let _termEnd = moment(auth?.subscription?.current_term_end).tz(
          timezone
        );
        let _diff = _now.diff(_termEnd);
      }
    } catch {
      let diff = "";
    }

    // if (auth?.subscription?.status !== "active") {
    //   navigate("/dashboard");
    // }

    /*if (!auth?.subscription?.status) {
      if (_diff > 0) {
        navigate("/");
      }
    } else if (auth?.subscription?.status === "inactive") {
      navigate("/");
    }*/
  };

  return { isNotPremium };
};
