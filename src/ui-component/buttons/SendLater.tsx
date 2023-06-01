import React from "react";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { Button } from "@mui/material";

const SendLater = () => {
  return (
    <>
      <Button className="tw-py-2 tw-px-0 sm:tw-py-3 sm:tw-px-1 sm:tw-min-w-min">
        <ScheduleSendOutlinedIcon sx={{ fontSize: 24, color: "#778da9" }} />
        <span className="tw-text-[#778da9] tw-text-xs tw-px-2">Send Later</span>
      </Button>
    </>
  );
};

export default SendLater;
