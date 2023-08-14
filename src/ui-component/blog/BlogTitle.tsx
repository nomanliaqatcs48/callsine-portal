import { Typography } from "@mui/material";
import React from "react";

const BlogTitle = ({ children, ...props }: any) => {
  return (
    <Typography
      variant="h1"
      className="tw-text-[24px] tw-text-black tw-font-normal tw-leading-[48px] tw-mb-[20px] lg:tw-text-[80px] lg:tw-leading-[100px]"
      {...props}
    >
      {children || "Lorem Ipsum"}
    </Typography>
  );
};

export default BlogTitle;
