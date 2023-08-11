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
import PricingCard from "../../ui-component/pricing/PricingCard";

const PricingBox = () => {
  const pricingItems = [
    {
      name: "Monthly Freedom",
      price: (
        <>
          <Box>$99 per seat per month</Box>
        </>
      ),
      description:
        "Ideal for those who prefer flexibility and wish to adapt to changing needs. This option lets you enjoy all the premium features, support, and seamless experience of CallSine, billed on a convenient monthly basis. No strings attached!",
      onClick: () => {
        window.open(
          "https://kvilar-unionresolute.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Premium-Plan-USD-Monthly&utm_source=cb-app-copy"
        );
      },
      buttontext: "Get Started",
      /*features: [
        {
          name: "Lorem ipsum dolor",
        },
      ],*/
      isPopular: false,
    },
    {
      name: "Annual Savings",
      price: (
        <>
          <Box>$999 per seat per year</Box>
        </>
      ),
      description:
        "Ready to commit to excellence? Opt for our yearly subscription and save big. With a one-time payment, you'll get the full suite of CallSine features for an entire year. That's like getting two months FREE compared to the monthly plan.",
      onClick: () => {
        window.open(
          "https://kvilar-unionresolute.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Premium-Plan-USD-Yearly&utm_source=cb-app-copy"
        );
      },
      buttontext: "Get Started",
      isPopular: true,
    },
    {
      name: "Enterprise Elevation",
      price: (
        <>
          <Box>Custom Pricing</Box>
        </>
      ),
      description:
        "For organizations requiring bespoke solutions, our Enterprise Elevation plan offers custom-tailored features to meet your unique needs. Contact us to discuss your specific requirements, and we'll design a package that fits just right.",
      onClick: () => {
        //
      },
      buttontext: "Contact Sales",
      isPopular: false,
    },
  ];

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
      <Typography
        className="tw-text-[30px] tw-text-[#0e101a] tw-font-bold tw-leading-[32px] tw-mb-3 tw-text-center"
        {...props}
      >
        {children}
      </Typography>
    );
  };

  const CustomDesc = ({ children, ...props }: any) => {
    return (
      <Typography
        className="tw-text-[18px] tw-text-[#0e101a] tw-font-normal tw-leading-[28px] tw-mb-3 tw-text-center md:tw-text-left"
        {...props}
      >
        {children}
      </Typography>
    );
  };

  const CustomButton = ({ children, ...props }: any) => {
    return (
      <Button
        variant="contained"
        color="primary"
        className="tw-text-[18px] tw-font-bold tw-w-full tw-py-[12px] tw-my-[30px] tw-bg-primary hover:tw-bg-primaryDark"
        {...props}
      >
        {children}
      </Button>
    );
  };

  const CustomPrice = ({ children, ...props }: any) => {
    return (
      <Typography
        variant="body2"
        className="tw-text-center tw-text-[18px] tw-font-semibold tw-py-[10px]"
        {...props}
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
              className="tw-text-white tw-text-[40px] tw-leading-[48px] tw-text-center tw-mb-[40px] xl:tw-text-[80px] xl:tw-leading-[100px]"
            >
              🎉 Introducing CallSine's Flexible Subscription Plans!
            </Typography>
            <Typography
              variant="body2"
              className="tw-text-white tw-text-center tw-text-[20px] tw-font-normal tw-leading-[24px] tw-mb-[40px] xl:tw-text-[30px] xl:tw-leading-[46px]"
            >
              At CallSine, we believe in empowering your marketing and sales
              teams like never before. We've crafted two subscription options
              tailored to your needs and budget, ensuring that you get the best
              value and functionality, without compromise.
            </Typography>
          </Box>

          <Box className="pricing-boxes tw-flex tw-flex-col tw-justify-center tw-gap-5 tw-w-full lg:tw-flex-row">
            {pricingItems?.map((i: any, idx: number) => {
              return <PricingCard key={idx} {...i} className="lg:tw-w-1/3" />;
            })}
            {/*<PricingCard isPopular={false} className="lg:tw-w-1/3" />
            <PricingCard isPopular={true} className="lg:tw-w-1/3" />
            <PricingCard isPopular={true} className="lg:tw-w-1/3" />*/}
            {/*{pricingItems.map((i: any, idx: number) => {
              return (
                <CustomGrid key={idx}>
                  <CustomCard>
                    <CustomHeader>{i?.header}</CustomHeader>
                    <CustomDesc>
                      <CustomPrice>{i?.price}</CustomPrice>
                      {i?.desc}
                    </CustomDesc>
                    <CustomButton onClick={i?.onClick}>
                      {i?.buttontext}
                    </CustomButton>
                  </CustomCard>
                </CustomGrid>
              );
            })}*/}
          </Box>

          <Box className="footer-content tw-text-white tw-text-[18px] tw-font-normal tw-leading-[31px] tw-pt-[40px] tw-pb-[80px] tw-text-center">
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
