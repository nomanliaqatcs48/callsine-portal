import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as CheckIcon } from "../../assets/images/svg/check.svg";
import { ReactComponent as StarsIcon } from "../../assets/images/svg/stars.svg";
import "./index.css";

const PricingCard = ({ item, isPopular = false, children, ...props }: any) => {
  const [isMostPopular, setIsMostPopular] = useState<boolean>(isPopular);

  return (
    <>
      <Box className="" sx={{ zIndex: "999" }} {...props}>
        {children || (
          <>
            <Box
              className={`tw-flex tw-justify-center tw-items-center tw-gap-3 tw-text-[14px] tw-font-normal tw-leading-[17px] tw-text-black tw-p-[12px] ${
                isMostPopular ? "tw-rounded-t-[12px]" : "tw-invisible"
              }`}
              sx={{
                backgroundImage: "linear-gradient(90deg,#4ac5fa,#2fcd70)",
              }}
            >
              <StarsIcon />
              <span>Most Popular</span>
            </Box>
            <Card
              variant="outlined"
              className={`${isMostPopular ? "tw-rounded-t-[0px]" : ""}`}
            >
              <CardContent className="tw-py-10 tw-px-10">
                <Typography
                  variant="h3"
                  className="tw-text-[30px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-0"
                >
                  {item?.name || "Lorem ipsum"}
                </Typography>
                <Box className="price-per">
                  {item?.price || (
                    <>
                      <strong>$0</strong> <small> /month</small>
                    </>
                  )}
                </Box>
                <Typography className="tw-text-[#36313D] tw-text-[16px] tw-font-normal tw-leading-[21px] tw-py-[45px] lg:tw-text-[18px]">
                  {item?.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={`tw-text-[18px] tw-font-normal tw-w-full tw-py-[12px] tw-shadow-none ${
                    isMostPopular
                      ? "tw-text-white tw-border tw-border-solid tw-border-primary tw-bg-primary hover:tw-bg-primaryDark"
                      : "tw-text-primary tw-border tw-border-solid tw-border-primary tw-bg-transparent hover:tw-bg-primaryDark hover:tw-text-white"
                  }`}
                  onClick={item?.onClick || null}
                >
                  {item?.buttonText || "Get Started"}
                </Button>
              </CardContent>
              {item?.features ? (
                <Box className="list-container tw-py-10 tw-px-10 tw-bg-[#F5F5F5]">
                  <ul className="tw-flex tw-flex-col tw-gap-6">
                    {item?.features?.map((i: any, idx: number) => {
                      return (
                        <li key={idx} className="tw-flex tw-leading-[21px]">
                          <Box className="tw-translate-x-[-20%] tw-translate-y-[-5%]">
                            <CheckIcon />
                          </Box>
                          <span>{i?.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              ) : (
                <Box className="list-container tw-py-10 tw-px-10 tw-bg-[#F5F5F5]">
                  <ul className="tw-flex tw-flex-col tw-gap-6">
                    <li className="tw-flex tw-leading-[21px]">
                      <Box className="tw-translate-x-[-20%] tw-translate-y-[-5%]">
                        <CheckIcon />
                      </Box>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </span>
                    </li>
                  </ul>
                </Box>
              )}
            </Card>
          </>
        )}
      </Box>
    </>
  );
};

export default PricingCard;
