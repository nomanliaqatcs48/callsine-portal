import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import imageBgcTop from "../../assets/images/users/Group3.png";
import imageBgc from "../../assets/images/users/Rectangle1.png";

const PricingBox = () => {
  const CustomGrid = ({ children, ...props }: any) => {
    return (
      <Box className="" sx={{ zIndex: "999" }} {...props}>
        {children}
      </Box>
    );
  };

  const CustomCard = ({ children, ...props }: any) => {
    return (
      <Card variant="outlined" className="tw-py-10 tw-px-10" {...props}>
        {children}
      </Card>
    );
  };

  const CustomHeader = ({ children, ...props }: any) => {
    return (
      <Typography className="tw-text-[24px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-3">
        {children}
      </Typography>
    );
  };

  const CustomDesc = ({ children, ...props }: any) => {
    return (
      <Typography className="tw-text-[14px] tw-text-[#0e101a] tw-font-normal tw-leading-[22px] tw-mb-3">
        {children}
      </Typography>
    );
  };

  const CustomButton = ({ children, ...props }: any) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className="tw-text-[14px] tw-font-bold tw-w-full tw-py-[12px] tw-bg-primary hover:tw-bg-primaryDark "
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <Grid
        container
        className="tw-bg-[#fafafa] tw-relative tw-overflow-hidden tw-min-h-[100vh] 2xl:tw-px-[180px] 3xl:tw-px-[240px]"
      >
        <img
          className="tw-h-auto tw-max-w-full"
          src={imageBgcTop}
          alt="description"
          style={{
            position: "absolute",
            zIndex: "999",
            minHeight: "calc(100vh + 92px)",
            objectFit: "cover",
            width: "100%",
            mixBlendMode: "overlay",
            opacity: "0.4",
          }}
        />
        <img
          className="tw-h-auto tw-max-w-full"
          src={imageBgc}
          alt="description"
          style={{
            position: "absolute",
            minHeight: "calc(100vh + 92px)",
            width: "100%",
          }}
        />
        <Box className="tw-flex tw-flex-col tw-gap-5 tw-pt-[150px] tw-px-3 tw-w-full sm:tw-px-20 lg:tw-pt-[87px]">
          <CustomGrid>
            <CustomCard>
              <CustomHeader>Monthly Plan</CustomHeader>
              <CustomDesc>
                Basic writing suggestions and tone detection.
              </CustomDesc>
              <CustomButton>Get Started</CustomButton>
            </CustomCard>
          </CustomGrid>
          <CustomGrid>
            <CustomCard>
              <CustomHeader>Yearly Plan</CustomHeader>
              <CustomDesc>
                Basic writing suggestions and tone detection.
              </CustomDesc>
              <CustomButton>Get Started</CustomButton>
            </CustomCard>
          </CustomGrid>
        </Box>
      </Grid>
    </>
  );
};

export default PricingBox;
