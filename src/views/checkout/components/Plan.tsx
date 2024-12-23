import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IPlan } from "./interfaces";

const Content = styled.div`
  margin-top: 20px;
`;

interface ChoosePlanProps {
  selectedPlan: IPlan | null;
  onPlanSelected: (plan: IPlan) => void;
}

const ChoosePlan: FC<ChoosePlanProps> = ({ selectedPlan, onPlanSelected }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    selectedPlan?.billingCycle === "monthly" ? "monthly" : "annual"
  );

  const [teamMembers, setTeamMembers] = useState<number>(2);

  const selectPlan = (plan: "solo" | "team") => {
    const planDetails: IPlan = {
      billingCycle: billingCycle === "monthly" ? "monthly" : "annual",
      selectedPlan: plan,
      teamMembers: plan === "solo" ? 1 : teamMembers,
    };
    onPlanSelected(planDetails);
  };

  useEffect(() => {
    // Check if 'selectedPlan' exists and has 'selectedPlan' property
    if (selectedPlan?.selectedPlan) {
      // Determine the number of team members based on the selected plan
      const newTeamMembers =
        selectedPlan.selectedPlan === "solo" ? 1 : teamMembers;

      // Check if there's a change in 'billingCycle' or 'teamMembers' that requires an update
      if (
        selectedPlan.billingCycle !== billingCycle ||
        selectedPlan.teamMembers !== newTeamMembers
      ) {
        onPlanSelected({
          ...selectedPlan,
          billingCycle: billingCycle,
          teamMembers: newTeamMembers,
        });
      }
    }
  }, [billingCycle, onPlanSelected, selectedPlan, teamMembers]);

  return (
    <Paper elevation={0} className="tw-bg-transparent">
      <div className="tw-flex tw-flex-col tw-items-center">
        <Typography
          variant="h2"
          className=" tw-text-white tw-mb-[12px] tw-py-2"
        >
          Customize Your Plan
        </Typography>

        <div className="tw-relative tw-w-[216px] tw-h-auto tw-py-[2px] tw-bg-white tw-rounded-full tw-px-[2px] tw-space-x-2">
          <Button
            variant="text"
            color="primary"
            onClick={() => setBillingCycle("monthly")}
            className={`tw-bg-transparent tw-w-[100px] tw-z-10 tw-text-center tw-text-[16px] tw-font-medium tw-h-[40px] ${
              billingCycle === "monthly" ? "tw-text-white" : "tw-text-blue-400"
            }`}
          >
            Monthly
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => setBillingCycle("annual")}
            className={`tw-bg-transparent tw-w-[100px] tw-z-10 tw-text-center tw-text-[16px] tw-font-medium tw-h-[40px] ${
              billingCycle === "annual" ? " tw-text-white" : " tw-text-blue-400"
            }`}
          >
            Annually
          </Button>
          <span
            id="tglSpn"
            className={`tw-absolute tw-left-0 tw-top-[4px] tw-bg-blue-500 tw-rounded-full tw-w-[95px] tw-z-0 tw-h-[36px] tw-transition tw-duration-200 ${
              billingCycle === "annual" && "tw-translate-x-[105px]"
            }`}
          />
        </div>
      </div>
      <div className="col-span-12 tw-flex tw-flex-row tw-mt-[50px] tw-h-auto tw-justify-center">
        <div className="tw-w-[420px] tw-mr-[20px]">
          <div className="tw-bg-white tw-rounded-xl tw-min-h-[500px] tw-p-[20px]">
            <div>
              <div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-h-[40px] tw-mb-[10px]">
                <Typography variant="h3" className="tw-text-black tw-font-bold">
                  Solo
                </Typography>
              </div>
              <Content>
                <Typography className="tw-text-left">
                  Perfect for solopreneurs or sales pros looking to boost
                  productivity.
                </Typography>
              </Content>
              <Content>
                <Typography
                  variant="h1"
                  className="tw-text-black tw-font-bold tw-mb-2"
                >
                  {billingCycle === "monthly" ? `$99` : `$950`}
                  <span className="tw-text-[22px] tw-font-normal">
                    {billingCycle === "monthly" ? `/month` : `/year`}
                  </span>
                </Typography>
              </Content>

              <Content>
                <Button
                  variant="outlined"
                  onClick={() => selectPlan("solo")}
                  className={`tw-w-full tw-rounded-none tw-border-blue-400 tw-font-bold tw-h-[50px] tw-border-[1px] ${
                    selectedPlan?.selectedPlan === "solo"
                      ? "tw-bg-blue-400 tw-text-white hover:tw-bg-blue-400 hover:tw-text-white"
                      : "tw-bg-transparent tw-text-blue-400"
                  }`}
                >
                  Buy Plan
                </Button>
              </Content>

              <Content>
                <Content>
                  <Typography variant="body1" className="tw-text-black">
                    <CheckIcon /> Send up to 50 AI generated emails a day.
                  </Typography>
                </Content>

                <Content>
                  <Typography variant="body1" className="tw-text-black">
                    <CheckIcon /> Full access to our latest AI engine to
                    generate personalized emails to your entire outreach list.
                  </Typography>
                </Content>

                <Content>
                  <Typography variant="body1" className="tw-text-black">
                    <CheckIcon /> Engagement tracking on all emails sent.
                  </Typography>
                </Content>
              </Content>
            </div>
          </div>
        </div>

        <div className="tw-w-[420px] tw-ml-[20px]">
          <div
            className={`tw-bg-white tw-min-h-[500px] tw-rounded-xl tw-p-[20px] ${
              selectedPlan?.selectedPlan === "team"
                ? "tw-border-[1px] tw-border-blue-500"
                : "tw-border-none"
            }`}
          >
            <div>
              <div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-h-[40px] tw-mb-[10px]">
                <Typography variant="h3" className="tw-text-black tw-font-bold">
                  Team
                </Typography>
                <Typography className="tw-bg-purple-700 tw-rounded-full tw-p-[10px] tw-text-white tw-font-medium">
                  Most Popular
                </Typography>
              </div>
              <Content>
                <Typography className="tw-text-left">
                  Perfect for teams of 2 or more looking to accelerate pipeline
                  growth.
                </Typography>
              </Content>
              <Content>
                <Typography
                  variant="h1"
                  className="tw-text-black tw-font-bold tw-mb-2"
                >
                  {billingCycle === "monthly"
                    ? `$${89 * teamMembers}`
                    : `$${854 * teamMembers}`}
                  <span className="tw-text-[22px] tw-font-normal">
                    {billingCycle === "monthly" ? `/month` : `/year`}
                  </span>
                </Typography>
              </Content>
              <Content>
                <Button
                  variant="outlined"
                  onClick={() => selectPlan("team")}
                  className={`tw-w-full tw-rounded-none tw-border-blue-400 tw-font-bold tw-h-[50px] tw-border-[1px] ${
                    selectedPlan?.selectedPlan === "team"
                      ? "tw-bg-blue-400 tw-text-white hover:tw-bg-blue-400 hover:tw-text-white"
                      : "tw-bg-transparent tw-text-blue-400"
                  }`}
                >
                  Buy Plan
                </Button>
              </Content>
              <Content>
                <Content>
                  <Typography variant="body1" className="tw-text-black">
                    <CheckIcon /> Increase productivity across your team with
                    shared playbooks.
                  </Typography>
                </Content>

                <Content>
                  <Typography variant="body1" className="tw-text-black">
                    <CheckIcon /> Keep your outreach organized across your team
                    with lead assignment.
                  </Typography>
                </Content>

                <Content>
                  <Typography variant="body1" className="tw-text-black tw-mb-1">
                    Number of Team Members:
                  </Typography>
                  <Box className="tw-mt-2 tw-ml-[25px]">
                    <Select
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(Number(e.target.value))}
                      className="tw-mt-1 tw-bg-transparent tw-w-[80px]"
                    >
                      {[...Array(19)].map((_, idx) => (
                        <MenuItem key={idx} value={idx + 2}>
                          {idx + 2}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Content>
              </Content>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ChoosePlan;
