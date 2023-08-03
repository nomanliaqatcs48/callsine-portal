import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

export const usePermissions = () => {
  const auth: any = useAuth();
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());

  const isNotPremium = () => {
    let _now = moment.tz(timezone);
    let _termEnd = moment(auth?.subscription?.current_term_end).tz(timezone);
    let _diff = _now.diff(_termEnd);

    if (auth?.subscription?.status !== "active") {
      navigate("/");
    }

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
