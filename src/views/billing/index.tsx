import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import {
  cancelStripeSubscription,
  fetchUserInvoices,
  getStripeSubscription,
} from "src/services/payments.service";
import CurrentCards from "./components/currentCards";

interface SubscriptionInfo {
  plan?: string;
  cycle?: string;
  team_members?: number;
  next_billing: string;
  status: string;
}

interface Invoice {
  id: string;
  date: number; // Using a Unix timestamp (seconds since the epoch)
  amount: number;
  download_link: string;
}

const Billing = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>();
  const [invoices, setInvoices] = useState<Invoice[]>([]); // Mockup data for invoices

  const onUpdateCard = () => {
    return null;
  };
  const fetchSubscriptionInfo = async () => {
    try {
      const response = await getStripeSubscription({});
      if (response && response.data) {
        setSubscriptionInfo({
          plan: response.data.selected_plan,
          cycle: response.data.selected_cycle,
          team_members: response.data?.team_members,
          next_billing: response.data.current_term_end,
          status: response.data.status,
          // ... you can map other response fields as needed
        });
      }
    } catch (error) {
      console.error("Error fetching subscription information:", error);
    }
  };
  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const capitalizeFirstLetter = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const cancelSubscription = async () => {
    try {
      const response = await cancelStripeSubscription({});
      const data = response.data;
      if (data.message) {
        console.log(data.message);
        fetchSubscriptionInfo();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoices = await fetchUserInvoices();
        setInvoices(invoices);
      } catch (error) {
        console.error("Error fetching user invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Billing & Subscription
        </Typography>
      </Box>

      <Paper elevation={0} className="tw-rounded tw-border tw-border-[#f0f1f3]">
        <Grid container spacing={2} className="tw-p-5">
          <Grid item xs={12}>
            <Typography variant="h6">Subscription Information</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body1">
              Plan:{" "}
              {subscriptionInfo?.plan &&
                capitalizeFirstLetter(subscriptionInfo?.plan)}
            </Typography>
            {subscriptionInfo?.plan === "team" && (
              <Typography variant="body1">
                Team Members: {subscriptionInfo.team_members}
              </Typography>
            )}
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body1">
              Cycle:{" "}
              {subscriptionInfo?.cycle &&
                capitalizeFirstLetter(subscriptionInfo?.cycle)}
            </Typography>
            <Typography variant="body1">
              {subscriptionInfo?.status === "active"
                ? "Next Billing Date:"
                : "Subscription Ends:"}{" "}
              {subscriptionInfo?.next_billing &&
                new Date(subscriptionInfo?.next_billing).toDateString()}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            {subscriptionInfo?.status === "active" ? (
              <Button
                variant="contained"
                className="tw-bg-red-700"
                onClick={cancelSubscription}
              >
                Cancel Subscription
              </Button>
            ) : (
              <Typography className="tw-text-red-700"> Cancelled</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Cards On File:</Typography>
            <CurrentCards onUpdateCard={onUpdateCard} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Invoices</Typography>
          </Grid>

          <List className="tw-w-full">
            {invoices.map((invoice, index) => (
              <ListItem
                key={index}
                className="tw-w-full tw-flex tw-justify-between"
              >
                <ListItemText
                  primary={`Invoice ${invoice.id}`}
                  secondary={`Date: ${new Date(
                    invoice?.date * 1000
                  ).toDateString()}, Amount: $${invoice.amount}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="download">
                    <a
                      href={invoice.download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download />
                    </a>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Paper>
    </>
  );
};

export default Billing;
