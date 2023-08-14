import { Box } from "@mui/material";

const BlogPostItem = ({ children, ...props }: any) => {
  return (
    <>
      <Box {...props}>{children}</Box>
    </>
  );
};

export default BlogPostItem;
