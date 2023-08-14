import React from "react";
import { Typography } from "@mui/material";

const BlogDate = ({ date }: any) => {
  return (
    <Typography
      variant="h6"
      className="tw-text-[13px] tw-text-[#9e9ea7] tw-font-medium tw-uppercase lg:tw-text-[14px]"
    >
      {date || "lorem ipsum"}
    </Typography>
  );
};

export default BlogDate;
