import { Box, Typography } from "@mui/material";
import React from "react";

const PageHeader = () => {
  return (
    <Box className="content">
      <Typography
        variant="h1"
        className="tw-text-white tw-font-normal tw-text-[40px] tw-leading-[48px] tw-text-center xl:tw-text-[80px] xl:tw-leading-[100px]"
      >
        🎉 Introducing CallSine's Flexible Subscription Plans!
      </Typography>

      <Box className="tw-mb-[40px]" />

      <Typography
        variant="body2"
        className="tw-text-white tw-text-center tw-text-[20px] tw-font-normal tw-leading-[24.7px] xl:tw-text-[30px] xl:tw-leading-[46px]"
      >
        At CallSine, we believe in empowering your marketing and sales teams
        like never before. We've crafted two subscription options tailored to
        your needs and budget, ensuring that you get the best value and
        functionality, without compromise.
      </Typography>

      <Box className="tw-mb-[40px]" />
    </Box>
  );
};

export default PageHeader;
