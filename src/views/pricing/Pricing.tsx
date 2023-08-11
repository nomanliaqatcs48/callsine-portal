import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import PricingCard from "../../ui-component/pricing/PricingCard";
import PageHeader from "./PageHeader";
import PricingBottomContent from "./PricingBottomContent";

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
          <PageHeader />

          <Box className="tw-py-[15px]" />

          <Box className="pricing-boxes tw-flex tw-flex-col tw-items-stretch tw-gap-5 lg:tw-flex-row">
            {pricingItems?.map((i: any, idx: number) => {
              return (
                <Box className="">
                  <PricingCard
                    key={idx}
                    {...i}
                    className="lg:tw-w-full tw-h-full"
                  />
                </Box>
              );
            })}
          </Box>

          <PricingBottomContent />
        </Box>
      </Grid>
    </>
  );
};

export default PricingBox;
