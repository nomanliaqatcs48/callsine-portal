import React from "react";
import { Box } from "@mui/material";

const BlogImage = ({ src, ...props }: any) => {
  return (
    <Box className="tw-mb-5 lg:tw-h-[500px]" {...props}>
      <img
        src={src || "https://picsum.photos/id/7/800/600"}
        alt="featured-img"
        className="tw-max-w-full tw-h-full tw-mx-auto lg:tw-mb-[50px]"
      />
    </Box>
  );
};

export default BlogImage;
