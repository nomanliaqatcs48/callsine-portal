import { Box, CssBaseline, Drawer, IconButton, useTheme } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "./components/Checkout";
import ChoosePlan from "./components/Plan";
import { IPlan } from "./components/interfaces";
import { Main } from "./components/Main";
import { drawerWidth } from "./constants";
import { Background } from "src/ui-component/background/Background";
import logo from "src/assets/images/logos/CALLSINE-Web-Logo-White.png";
import { DrawerHeader } from "./components/DrawerHeader";
import CloseIcon from "@mui/icons-material/Close";

const stripePromise = loadStripe(
  "pk_test_51L3IDyGKOS0SXyxuuqkVIsUDlWyFOxqALFAmVNGRm2ywp3UaOF5EgZ204udj4Mx7UM92wwFCAeu4c4rHg0ebwWbN008onxddM7"
);

const CheckoutPage = () => {
  const theme = useTheme();

  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>({
    billingCycle: "monthly",
    selectedPlan: null,
    teamMembers: 0,
  });

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedPlan(null);
    setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    // console.log(data);
  };

  const handlePlanSelection = (plan: IPlan) => {
    setSelectedPlan(plan);
    handleDrawerOpen();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Elements stripe={stripePromise}>
        <CssBaseline />

        <Main theme={theme} open={open}>
          <div
            className={`tw-mt-[20px] tw-ml-[${
              open ? 20 : 80
            }px] tw-transition-all tw-delay-200`}
          >
            <img src={logo} alt="CallSine" width="250" className="tw-pr-5" />
          </div>
          <Background />
          <ChoosePlan
            selectedPlan={selectedPlan}
            onPlanSelected={handlePlanSelection}
          />
        </Main>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          {selectedPlan?.selectedPlan && (
            <CheckoutForm planData={selectedPlan} />
          )}
        </Drawer>
      </Elements>
    </Box>
  );
};

export default CheckoutPage;
