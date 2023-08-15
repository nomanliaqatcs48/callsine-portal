import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as CheckIcon } from "../../assets/images/svg/check.svg";
import { ReactComponent as StarsIcon } from "../../assets/images/svg/stars.svg";
import "./index.css";

const PricingCard = ({ item, isPopular = false, children, ...props }: any) => {
  const [isMostPopular, setIsMostPopular] = useState<boolean>(isPopular);
  const _features = item?.features || props?.features;

  return (
    <Box className={props?.className} sx={{ zIndex: "999" }}>
      {children || (
        <>
          <Card variant="outlined" className="tw-h-full lg:tw-rounded-none">
            <Box className="tw-h-full lg:tw-flex lg:tw-flex-col lg:tw-justify-between">
              <Box
                className={`plan-title-container tw-py-[10px] tw-px-[20px] tw-border-b tw-border-[#dfe1e6] lg:tw-px-[30px] ${
                  item?.hide || props?.hide ? "tw-border-b-0" : ""
                }`}
              >
                <Typography
                  variant="h3"
                  className={`tw-text-[24px] lg:tw-text-[30px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-0 ${
                    item?.hide || props?.hide ? "tw-invisible" : ""
                  }`}
                >
                  {item?.name || props?.name || "Lorem ipsum"}
                </Typography>
              </Box>
              <Box className="price-container lg:tw-px-[30px]">
                <Box
                  className={`price-per tw-py-5 ${
                    item?.hide || props?.hide ? "tw-border-b-0" : ""
                  }`}
                >
                  {item?.price || props?.price || ""}
                </Box>
              </Box>
              <Typography className="tw-text-[#36313D] tw-text-[16px] tw-px-[20px] tw-font-normal tw-leading-[28px] tw-pt-[45px] lg:tw-text-[18px] lg:tw-px-[30px]">
                {item?.description || props?.description || ""}
              </Typography>
              <Box
                className={`button-container tw-px-[20px] tw-border-b tw-border-[#dfe1e6] lg:tw-px-[30px] ${
                  item?.hide || props?.hide ? "tw-border-b-0" : ""
                }`}
              >
                {(item?.buttontext || props?.buttontext) && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={`tw-text-[18px] tw-font-normal tw-w-full tw-py-[12px] tw-my-[40px] tw-shadow-none tw-text-primary tw-border tw-border-solid tw-border-primary tw-bg-transparent hover:tw-bg-primaryDark hover:tw-text-white`}
                    onClick={item?.onClick || props?.onClick || null}
                  >
                    {item?.buttontext || props?.buttontext || "Get Started"}
                  </Button>
                )}
              </Box>
              <Box className="bottom-content-container tw-p-[20px] lg:tw-px-[30px]">
                <Typography>
                  {item?.bottomContent || props?.bottomContent}
                </Typography>
              </Box>
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
};

export default PricingCard;
