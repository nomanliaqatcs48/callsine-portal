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
      <Typography className="tw-text-[24px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-3 tw-text-center">
        {children}
      </Typography>
    );
  };

  const CustomDesc = ({ children, ...props }: any) => {
    return (
      <Typography className="tw-text-[14px] tw-text-[#0e101a] tw-font-normal tw-leading-[22px] tw-mb-3 tw-text-center md:tw-text-left">
        {children}
      </Typography>
    );
  };

  const CustomButton = ({ children, ...props }: any) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className="tw-text-[14px] tw-font-bold tw-w-full tw-py-[12px] tw-my-[20px] tw-bg-primary hover:tw-bg-primaryDark"
      >
        {children}
      </Button>
    );
  };

  const CustomPrice = ({ children, ...props }: any) => {
    return (
      <Typography
        variant="body2"
        className="tw-text-center tw-text-[15px] tw-font-semibold tw-py-[10px]"
      >
        {children}
      </Typography>
    );
  };

  return (
    <>
      <Grid
        container
        className="tw-bg-[#fafafa] tw-overflow-hidden tw-min-h-[80vh] 2xl:tw-px-[180px] 3xl:tw-px-[240px]"
        sx={{
          backgroundImage: `url('${imageBgc}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box className="tw-pt-[150px] tw-px-3 sm:tw-px-20">
          <Box className="content">
            <Typography
              variant="h1"
              className="tw-text-white tw-text-[40px] tw-leading-[48px] tw-text-center tw-mb-[40px]"
            >
              🎉 Introducing CallSine's Flexible Subscription Plans!
            </Typography>
            <Typography
              variant="body2"
              className="tw-text-white tw-text-center tw-text-[20px] tw-font-normal tw-leading-[24px] tw-mb-[40px]"
            >
              At CallSine, we believe in empowering your marketing and sales
              teams like never before. We've crafted two subscription options
              tailored to your needs and budget, ensuring that you get the best
              value and functionality, without compromise.
            </Typography>
          </Box>

          <Box className="pricing-boxes tw-flex tw-flex-col tw-gap-5 tw-w-full md:tw-flex-row">
            <CustomGrid>
              <CustomCard>
                <CustomHeader>Monthly Freedom</CustomHeader>
                <CustomDesc>
                  <CustomPrice>$99 per seat per month</CustomPrice>
                  Ideal for those who prefer flexibility and wish to adapt to
                  changing needs. This option lets you enjoy all the premium
                  features, support, and seamless experience of CallSine, billed
                  on a convenient monthly basis. No strings attached!
                </CustomDesc>
                <CustomButton>Get Started</CustomButton>
              </CustomCard>
            </CustomGrid>
            <CustomGrid>
              <CustomCard>
                <CustomHeader>Annual Savings</CustomHeader>
                <CustomDesc>
                  <CustomPrice>$999 per seat per year</CustomPrice>
                  Ready to commit to excellence? Opt for our yearly subscription
                  and save big. With a one-time payment, you'll get the full
                  suite of CallSine features for an entire year. That's like
                  getting two months FREE compared to the monthly plan.
                </CustomDesc>
                <CustomButton>Get Started</CustomButton>
              </CustomCard>
            </CustomGrid>
          </Box>

          <Box className="footer-content tw-text-white tw-text-[15px] tw-font-normal tw-leading-[18px] tw-pt-[40px] tw-pb-[80px] tw-text-center">
            Whatever your preference, both plans guarantee CallSine's
            unparalleled quality, innovation, and customer support. Sign up
            today, and let's transform the way you connect!
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default PricingBox;
