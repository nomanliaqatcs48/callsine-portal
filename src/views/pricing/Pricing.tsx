import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import PricingCard from "../../ui-component/pricing/PricingCard";
import PageHeader from "./PageHeader";
import PricingBottomContent from "./PricingBottomContent";
import { useAuthentication } from "../../hooks/useAuthentication";
// import { ChargeBee, _hosted_page } from "chargebee-typescript";

const PricingBox = () => {
  let { isAuthenticated, authProfile } = useAuthentication();

  const pricingItems = [
    {
      name: "Monthly Freedom",
      price: (
        <>
          <Box className="tw-text-center">
            <strong className="tw-text-[30px]">$99</strong> <br />
            per seat per month
          </Box>
        </>
      ),
      description:
        "Ideal for those who prefer flexibility and wish to adapt to changing needs. This option lets you enjoy all the premium features, support, and seamless experience of CallSine, billed on a convenient monthly basis. No strings attached!",
      onClick: () => {
        window.open(
          `https://kvilar-unionresolute.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Premium-Plan-USD-Monthly&customer[email]=${authProfile?.email}&utm_source=cb-app-copy`
        );
      },
      buttontext: "Get Started",
      bottomContent: "For growing teams focused on building more together",
      isPopular: false,
    },
    {
      name: "Volume Discount",
      price: (
        <>
          <Box className="tw-text-center">
            <strong className="tw-text-[30px]">$79</strong> <br />
            per seat per month
          </Box>
        </>
      ),
      description:
        "Opt for our multi-seat subscription and save. if you have a need for 5 to 20 seats, you will get a $20 per month discount for all seats. That's a $240 savings per peat per year.  And it’s still month to month, no contract.",
      onClick: () => {
        window.open(
          `https://kvilar-unionresolute.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Premium-Plan-USD-Yearly&customer[email]=${authProfile?.email}&utm_source=cb-app-copy`
        );
      },
      buttontext: "Get Started",
      bottomContent:
        "For organization that need to scale how they collaborate and track work",
      isPopular: true,
    },
    {
      name: "Enterprise Elevation",
      price: (
        <>
          <Box className="tw-text-center">
            <strong className="tw-text-[30px]">Custom Pricing</strong>
          </Box>
        </>
      ),
      description:
        "For organizations requiring over 20 seats, our Enterprise Elevation plan offers custom-tailored features to meet your unique needs. Contact us to discuss your specific requirements, and we'll design a package that fits just right.",
      onClick: () => {
        //
      },
      buttontext: "Contact Sales",
      bottomContent:
        "For enterprises with global scale, security, and governance needs",
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

          <Box className="pricing-boxes tw-flex tw-flex-col tw-items-stretch tw-gap-5 lg:tw-gap-0 lg:tw-flex-row">
            {pricingItems?.map((i: any, idx: number) => {
              return (
                <Box className="tw-flex-1">
                  <PricingCard
                    key={idx}
                    {...i}
                    className="tw-h-full lg:tw-w-full"
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
