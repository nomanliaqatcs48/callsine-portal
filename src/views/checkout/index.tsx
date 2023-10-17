import CloseIcon from "@mui/icons-material/Close";
import { Box, CssBaseline, Drawer, IconButton, useTheme } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import logo from "src/assets/images/logos/CALLSINE-Web-Logo-White.png";
import useGetUserMe from "src/hooks/settings/useGetUser";
import { Background } from "src/ui-component/background/Background";
import CheckoutForm from "./components/Checkout";
import { DrawerHeader } from "./components/DrawerHeader";
import { Main } from "./components/Main";
import ChoosePlan from "./components/Plan";
import { IPlan } from "./components/interfaces";
import { drawerWidth } from "./constants";

const stripePromise = loadStripe(
  "pk_test_51L3IDyGKOS0SXyxuuqkVIsUDlWyFOxqALFAmVNGRm2ywp3UaOF5EgZ204udj4Mx7UM92wwFCAeu4c4rHg0ebwWbN008onxddM7"
);

const CheckoutPage = () => {
  const { loading, data, error } = useGetUserMe();
  const theme = useTheme();

  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>({
    billingCycle: "monthly",
    selectedPlan: null,
    teamMembers: 0,
  });

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = () => {
    setSelectedPlan(null);
    setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    // console.log(data);
  };

  const handlePlanSelection = useCallback(
    (plan: IPlan) => {
      setSelectedPlan(plan);
      handleDrawerOpen(); // I'm assuming this function changes some state to open a drawer component
    },
    [setSelectedPlan, handleDrawerOpen]
  );

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
            <CheckoutForm planData={selectedPlan} profileData={data} />
          )}
        </Drawer>
      </Elements>
    </Box>
  );
};

export default CheckoutPage;
