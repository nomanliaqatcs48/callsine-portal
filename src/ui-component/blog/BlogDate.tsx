import React from "react";
import { Typography } from "@mui/material";

const BlogDate = ({ children, ...props }: any) => {
  return (
    <Typography
      variant="h6"
      className="tw-text-[13px] tw-text-[#9e9ea7] tw-font-medium tw-uppercase lg:tw-text-[14px]"
      {...props}
    >
      {children || "lorem ipsum"}
    </Typography>
  );
};

export default BlogDate;
