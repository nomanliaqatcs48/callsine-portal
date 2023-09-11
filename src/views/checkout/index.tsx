import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import imageBgcTop from "../../assets/images/users/Group3.png";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import CheckoutForm from "./components/Checkout";
import ChoosePlan from "./components/Plan";
import { IPlan } from "./components/interfaces";

const stripePromise = loadStripe(
  "pk_test_51L3IDyGKOS0SXyxuuqkVIsUDlWyFOxqALFAmVNGRm2ywp3UaOF5EgZ204udj4Mx7UM92wwFCAeu4c4rHg0ebwWbN008onxddM7"
);

const CheckoutPage = () => {
  const theme = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const handleSubmit = async (data: any) => {
    console.log(data);
  };
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const handlePlanSelection = (plan: IPlan) => {
    setSelectedPlan(plan);
  };

  return (
    <Elements stripe={stripePromise}>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3] tw-h-screen"
      >
        <Grid container className="tw-p-0 tw-h-full">
          {/* Checkout Form Side with blue background */}
          <Grid
            item
            xs={12}
            md={6}
            className="tw-p-5 tw-flex tw-flex-col tw-justify-center tw-bg-blue-500 tw-relative"
          >
            {/* Background Images */}
            <div className="tw-absolute tw-inset-0 tw-z-0">
              <img
                className="tw-h-auto tw-max-w-full"
                src={imageBgcTop}
                alt="description"
                style={{
                  position: "absolute",
                  zIndex: -1,
                  minHeight: downMd ? "calc(100vh + 92px)" : "100vh",
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
                  zIndex: -2,
                  minHeight: downMd ? "calc(100vh + 92px)" : "100vh",
                  width: "100%",
                }}
              />
            </div>
            <ChoosePlan onPlanSelected={handlePlanSelection} />
          </Grid>

          {/* Price Options Side with white background */}
          <Grid
            item
            xs={12}
            md={6}
            className="md:tw-border-l tw-border-[#f0f1f3] tw-p-5 tw-flex tw-flex-col tw-justify-center"
          >
            {selectedPlan && <CheckoutForm planData={selectedPlan} />}
          </Grid>
        </Grid>
      </Paper>
    </Elements>
  );
};

export default CheckoutPage;
