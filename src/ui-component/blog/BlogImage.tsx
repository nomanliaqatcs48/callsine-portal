import React from "react";
import { Box } from "@mui/material";

const BlogImage = ({ ...props }) => {
  return (
    <Box className="" {...props}>
      <img
        src="https://picsum.photos/id/7/800/600"
        alt="featured-img"
        className="tw-max-w-full tw-h-full"
      />
    </Box>
  );
};

export default BlogImage;
