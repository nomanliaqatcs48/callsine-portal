import React from "react";
import { Box } from "@mui/material";
import Footer from "../../views/home/Footer";
import FooterBlueBar from "../../views/home/FooterBlueBar";
import "./index.css";
import GoBack from "../buttons/GoBack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const BlogPostItem = ({ children, ...props }: any) => {
  return (
    <>
      <Box
        className="post tw-flex tw-flex-col tw-gap-3 tw-px-[20px] tw-pt-[150px] lg:tw-px-[96px] 2xl:tw-px-[240px]"
        {...props}
      >
        <GoBack
          href={`/blog`}
          className="tw-flex tw-justify-start tw-text-inherit tw-text-[16px] tw-font-normal tw-text-black tw-no-underline tw-tracking-[0.32px] hover:tw-bg-transparent"
          sx={{ textDecoration: "none" }}
        >
          <KeyboardArrowLeftIcon
            fontSize="small"
            sx={{ color: "#3e3e3f", fontSize: 14 }}
          />{" "}
          Back to Blog
        </GoBack>

        {children}

        <Box className="tw-py-[30px]" />
      </Box>

      <Footer />
      <FooterBlueBar />
    </>
  );
};

export default BlogPostItem;
