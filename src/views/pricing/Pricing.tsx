import { Box, Grid, Typography } from "@mui/material";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import { useAuthentication } from "../../hooks/useAuthentication";
import PricingCard from "../../ui-component/pricing/PricingCard";
import PricingFeatures from "../../ui-component/pricing/PricingFeatures";
import PricingFeaturesHeader from "../../ui-component/pricing/PricingFeaturesHeader";
import {
  compareFeaturesHeader,
  compareFeaturesItems,
  pricingItems,
} from "../../utils/pricing/utils";
import PageHeader from "./PageHeader";
import PricingBottomContent from "./PricingBottomContent";
// import { ChargeBee, _hosted_page } from "chargebee-typescript";

const PricingBox = () => {
  let { isAuthenticated, authProfile } = useAuthentication();
  console.log(authProfile);

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
        <Box className="tw-pt-[150px] tw-px-3 sm:tw-px-20 2xl:tw-px-0">
          <PageHeader />

          <Box className="tw-py-[15px]" />

          <Box className="pricing-boxes tw-flex tw-flex-col tw-items-stretch tw-gap-5 lg:tw-gap-0 lg:tw-flex-row">
            {pricingItems()?.map((i: any, idx: number) => {
              return (
                <Box className={`tw-flex-1 ${i?.hide ? "tw-hidden" : ""}`}>
                  <PricingCard
                    key={idx}
                    {...i}
                    item={i}
                    className="tw-h-full lg:tw-w-full"
                  />
                </Box>
              );
            })}
          </Box>

          <Box className="feature-header tw-flex tw-justify-center tw-bg-[#eceaed] tw-my-5 tw-py-[15px] lg:tw-my-0">
            <Typography className=" tw-font-semibold tw-text-[18px]">
              Features
            </Typography>
          </Box>

          <Box className="tw-flex tw-flex-col tw-gap-y-8 lg:tw-gap-y-0">
            {compareFeaturesHeader.map((i: any, idx: number) => {
              return <PricingFeaturesHeader key={idx} item={i} />;
            })}
            {compareFeaturesItems.map((i: any, idx: number) => {
              return <PricingFeatures key={idx} item={i} />;
            })}
          </Box>

          <PricingBottomContent />
        </Box>
      </Grid>
    </>
  );
};

export default PricingBox;
