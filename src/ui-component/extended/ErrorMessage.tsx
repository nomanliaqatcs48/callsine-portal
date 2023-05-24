import React from "react";
import { FormHelperText } from "@mui/material";

type ErrorMessageTypes = {
  children: any;
  [x: string]: any;
};

const ErrorMessage = ({ children, ...props }: ErrorMessageTypes) => {
  return (
    <FormHelperText className="tw-py-2" sx={{ color: "error.main" }} {...props}>
      {children ||
        "Upload failed. Please make sure your CSV file uses the correct template"}
    </FormHelperText>
  );
};

export default ErrorMessage;
