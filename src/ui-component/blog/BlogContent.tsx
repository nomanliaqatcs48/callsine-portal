import { Box } from "@mui/material";
import React from "react";

const BlogContent = ({ children, ...props }: any) => {
  return (
    <Box
      className="tw-text-[15px] tw-text-[#6e6d7a] tw-leading-[1.5]"
      {...props}
    >
      {children || "lorem ipsum"}
    </Box>
  );
};

export default BlogContent;
