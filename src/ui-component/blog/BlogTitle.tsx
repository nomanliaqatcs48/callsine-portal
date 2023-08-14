import { Typography } from "@mui/material";
import React from "react";

const BlogTitle = ({ children, ...props }: any) => {
  return (
    <Typography
      variant="h1"
      className="tw-text-[24px] tw-text-black tw-font-medium tw-leading-[1.2] lg:tw-ml-[230px]"
      {...props}
    >
      {children || "Lorem Ipsum"}
    </Typography>
  );
};

export default BlogTitle;
