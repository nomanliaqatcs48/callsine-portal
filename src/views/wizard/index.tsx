import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useWizard } from "src/hooks/wizard/useWizard";
import { useMediaQuery, useTheme } from "@mui/material";
import icon from "../../assets/images/icons/logo-color-2x.png";
import { useSelector } from "react-redux";
import { selectPlaybookData } from "src/store/reducer";
import _ from "lodash";
import { usePlaybook } from "src/hooks/playbook/usePlaybook";

export default function VerticalLinearStepper() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const { steps, activeStep, handleNext, handleBack, handleReset } =
    useWizard();

  usePlaybook(true);

  const playbooks = useSelector(selectPlaybookData);

  React.useEffect(() => {
    console.log(
      "playbooks",
      _.orderBy(playbooks, ["position"], ["asc"])
        ? [..._.orderBy(playbooks, ["position"], ["asc"])]
        : []
    );
  }, [playbooks]);

  return (
    <Box
      className="tw-h-full tw-bg-gradient-to-r tw-from-white tw-to-cyan"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 800, minWidth: 800 }}>
        <Box className="tw-h-[20px]" />
        <img
          className=" tw-h-[67px] tw-py-[10px] tw-px-[10px]"
          src={icon}
          alt="CALLSINE ICON"
          style={{ marginRight: matchDownSM ? 8 : 16 }}
        />
        <Box className="tw-h-[20px]" />
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      Last step
                    </Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {step.content()}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="outlined"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      className="tw-bg-white"
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      className="tw-text-white"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            sx={{ p: 3 }}
            className="tw-bg-transparent"
          >
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
              className="tw-text-white"
            >
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
