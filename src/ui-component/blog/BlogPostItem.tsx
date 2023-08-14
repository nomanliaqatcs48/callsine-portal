import { Box } from "@mui/material";
import "./index.css";

const BlogPostItem = ({ children, ...props }: any) => {
  return (
    <>
      <Box
        className="tw-px-[20px] tw-pt-[150px] lg:tw-px-[96px] 2xl:tw-px-[240px]"
        {...props}
      >
        {children}
      </Box>
    </>
  );
};

export default BlogPostItem;
