import React from "react";
import { Typography } from "@mui/material";

const BlogDate = ({ children, ...props }: any) => {
  return (
    <Typography
      variant="h6"
      className="tw-text-[14px] tw-text-[#9e9ea7] tw-font-medium tw-uppercase tw-tracking-[0.03em]"
      {...props}
    >
      {children || "lorem ipsum"}
    </Typography>
  );
};

export default BlogDate;
