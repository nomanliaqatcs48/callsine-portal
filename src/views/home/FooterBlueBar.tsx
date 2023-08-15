import { Button, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const FooterBlueBar = () => {
  const BottomBar = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1976D2",
    // padding: "26px 182px",
    [theme.breakpoints.down("sm")]: {
      // padding: "46px 12px",
      // justifyContent: "center",
      // flexWrap: "wrap",
    },
  }));

  const navigate = useNavigate();

  return (
    <BottomBar className="tw-flex tw-flex-col tw-justify-center tw-py-[29px] tw-px-[20px] tw-items-center sm:tw-flex-row sm:tw-justify-between lg:tw-px-[96px] 2xl:tw-px-[240px]">
      <Typography
        className="tw-font-light tw-text-[13px]"
        variant="subtitle2"
        align="right"
        sx={{ color: "#F2F4F8" }}
      >
        © 2023 CallSine LLC. All Rights Reserved.
        {/*© 2023 Company Name. All rights reserved.*/}
      </Typography>
      <Typography
        className="tw-flex tw-gap-7 tw-font-light tw-text-[13px]"
        variant="subtitle2"
        align="left"
        sx={{ color: "#F2F4F8" }}
      >
        <Button
          variant="text"
          onClick={() => {
            navigate("/privacy");
          }}
          className="tw-text-[#F2F4F8] tw-font-light tw-text-[13px] tw-p-0"
          sx={{
            color: "#F2F4F8!important",
            textDecoration: "none!important",
          }}
        >
          Privacy
        </Button>{" "}
        <Button
          variant="text"
          onClick={() => {
            navigate("/terms-and-conditions");
          }}
          className="tw-text-[#F2F4F8] tw-font-light tw-text-[13px] tw-p-0"
          sx={{
            color: "#F2F4F8!important",
            textDecoration: "none!important",
          }}
        >
          Terms & Conditions
        </Button>
      </Typography>
    </BottomBar>
  );
};

export default FooterBlueBar;
