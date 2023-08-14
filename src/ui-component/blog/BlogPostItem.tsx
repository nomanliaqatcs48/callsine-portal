import { Box } from "@mui/material";
import "./index.css";

const BlogPostItem = ({ children, ...props }: any) => {
  return (
    <>
      <Box
        className="post tw-flex tw-flex-col tw-gap-3 tw-px-[20px] tw-pt-[150px] lg:tw-px-[96px] 2xl:tw-px-[240px]"
        {...props}
      >
        {children}

        <Box className="tw-py-[30px]" />
      </Box>
    </>
  );
};

export default BlogPostItem;
