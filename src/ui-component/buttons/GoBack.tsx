import React from "react";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type GoBackTypes = {
  children?: any;
  [x: string]: any;
};

const GoBack = ({ children, ...props }: GoBackTypes) => {
  return (
    <Button
      href={`/people`}
      className="tw-text-inherit tw-text-xs tw-font-medium tw-text-[#3e3e3f]"
      {...props}
    >
      {children || (
        <>
          <KeyboardArrowLeftIcon
            fontSize="small"
            sx={{ color: "#3e3e3f", fontSize: 14 }}
          />{" "}
          Back to People
        </>
      )}
    </Button>
  );
};

export default GoBack;
