import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as CheckIcon } from "../../assets/images/svg/check.svg";
import "./index.css";

const PricingCard = ({ item, ...props }: any) => {
  return (
    <>
      <Box className="" sx={{ zIndex: "999" }}>
        <Card variant="outlined">
          <CardContent className="tw-py-10 tw-px-10">
            <Typography
              variant="h3"
              className="tw-text-[30px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-0"
            >
              Free
            </Typography>
            <Box className="price-per">
              <strong>$0</strong> <small> /month</small>
            </Box>
            <Typography className="tw-text-[#36313D] tw-text-[14px] tw-font-normal tw-leading-[21px] tw-py-[45px]">
              Best for launching your personal projects.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="tw-text-[18px] tw-text-primary tw-font-normal tw-w-full tw-py-[12px] tw-shadow-none tw-border tw-border-solid tw-border-primary tw-bg-transparent hover:tw-bg-primaryDark hover:tw-text-white"
            >
              Get Started
            </Button>
          </CardContent>
          <Box className="list-container tw-py-10 tw-px-10 tw-bg-[#F5F5F5]">
            <ul className="tw-flex tw-flex-col tw-gap-6">
              <li className="tw-flex tw-leading-[21px]">
                <Box className="tw-translate-x-[-20%] tw-translate-y-[-5%]">
                  <CheckIcon />
                </Box>
                <span>
                  Fast CallSine builds, Bring your own domain and host for no
                  charge
                </span>
              </li>
              <li className="tw-flex tw-leading-[21px]">
                <Box className="tw-translate-x-[-20%] tw-translate-y-[-5%]">
                  <CheckIcon />
                </Box>
                <span>Bring your own domain and host for no charge</span>
              </li>
            </ul>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default PricingCard;
