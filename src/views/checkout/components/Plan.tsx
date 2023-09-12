import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { IPlan } from "./interfaces";

interface ChoosePlanProps {
  onPlanSelected: (plan: IPlan) => void;
}

const ChoosePlan: FC<ChoosePlanProps> = ({ onPlanSelected }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "team">("solo");
  const [teamMembers, setTeamMembers] = useState<number>(2);

  const selectPlan = (plan: "solo" | "team") => {
    setSelectedPlan(plan);
    const planDetails: IPlan = {
      billingCycle: billingCycle === "monthly" ? "monthly" : "annual",
      selectedPlan: plan,
      teamMembers: plan === "solo" ? 1 : teamMembers,
    };
    onPlanSelected(planDetails);
  };

  return (
    <Paper
      elevation={0}
      className="tw-rounded-lg tw-border-[1px] tw-z-50 tw-bg-transparent"
    >
      <Box className="tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4 tw-py-3">
        <Typography variant="h2" className=" tw-text-white  tw-py-2">
          Customize Your Plan
        </Typography>

        <Box className="tw-flex tw-space-x-2">
          <Button
            variant={billingCycle === "monthly" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setBillingCycle("monthly")}
            className={`tw-text-[16px] tw-font-medium tw-uppercase ${
              billingCycle === "monthly"
                ? "tw-text-blue-500 tw-bg-white"
                : "tw-text-white"
            }`}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "annual" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setBillingCycle("annual")}
            className={`tw-text-[16px] tw-font-medium tw-uppercase tw-border-white ${
              billingCycle === "annual"
                ? " tw-text-blue-500 tw-bg-white"
                : " tw-text-white"
            }`}
          >
            Yearly
          </Button>
        </Box>
      </Box>
      <Grid container className="tw-p-0">
        {/* Solo Plan */}
        <Grid
          item
          xs={12}
          sm={6}
          className="tw-border-r-[1px] tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6 tw-flex tw-flex-col"
        >
          <Box className="tw-px-4 tw-py-3 tw-flex tw-flex-col tw-justify-between tw-flex-grow">
            <div>
              <Typography
                variant="h4"
                className="tw-text-white tw-font-bold tw-mb-2"
              >
                Solo Plan
              </Typography>
              <Typography
                variant="h5"
                className="tw-text-white tw-font-medium tw-mb-2"
              >
                {billingCycle === "monthly" ? `$50/month` : `$500/year`}
              </Typography>
              <Typography variant="body1" className="tw-text-white tw-mb-2">
                Feature A<br />
                Feature B<br />
                Feature C
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => selectPlan("solo")}
              className="tw-text-[16px] tw-font-medium tw-border-white tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
            >
              Choose Solo Plan
            </Button>
          </Box>
        </Grid>

        {/* Team Plan */}
        <Grid
          item
          xs={12}
          sm={6}
          className="tw-py-3 xl:tw-py-6 tw-flex tw-flex-col"
        >
          <Box className="tw-px-4 tw-py-3 tw-flex tw-flex-col tw-justify-between tw-flex-grow">
            <div>
              <Typography
                variant="h4"
                className="tw-text-white tw-font-bold tw-mb-2"
              >
                Team Plan
              </Typography>
              <Typography
                variant="h5"
                className="tw-text-white tw-font-medium tw-mb-2"
              >
                {billingCycle === "monthly"
                  ? `$${50 * teamMembers}/month`
                  : `$${500 * teamMembers}/year`}
              </Typography>
              <Typography variant="body1" className="tw-text-white tw-mb-2">
                Feature A<br />
                Feature B<br />
                Feature C
              </Typography>
              <Box className="tw-mt-2 tw-mb-4">
                <Typography variant="body1" className="tw-text-white tw-mb-1">
                  Number of Team Members:
                </Typography>
                <Select
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(Number(e.target.value))}
                  className="tw-mt-1 tw-bg-transparent"
                >
                  {[...Array(19)].map((_, idx) => (
                    <MenuItem key={idx} value={idx + 2}>
                      {idx + 2}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => selectPlan("team")}
              className="tw-text-[16px] tw-font-medium tw-border-white tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
            >
              Choose Team Plan
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChoosePlan;
