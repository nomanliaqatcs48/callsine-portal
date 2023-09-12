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
import _ from "lodash";
import { usePlaybook } from "src/hooks/playbook/usePlaybook";
import imageBgcTop from "../../assets/images/users/Group3.png";
import imageBgc from "../../assets/images/users/Rectangle1.png";

export default function VerticalLinearStepper() {
  const theme = useTheme();

  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const { steps, activeStep, handleNext, handleBack, handleReset } =
    useWizard();

  usePlaybook(true);

  return (
    <>
      <img
        className="tw-h-full tw-max-w-full"
        src={imageBgcTop}
        alt="description"
        style={{
          position: "fixed",
          zIndex: "1",
          // minHeight: "100vh",
          minHeight: downMd ? "calc(100vh + 92px)" : "100vh",
          width: "100%",
          mixBlendMode: "overlay",
          opacity: "0.4",
        }}
      />
      <img
        className="tw-h-full tw-max-w-full"
        src={imageBgc}
        alt="description"
        style={{
          position: "fixed",
          /*minHeight: "100vh",*/ minHeight: downMd
            ? "calc(100vh + 92px)"
            : "100vh",
          width: "100%",
          zIndex: -1,
        }}
      />
      <Box
        className="tw-h-auto tw-w-full"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            maxWidth: 800,
            minWidth: 800,
            zIndex: 10,
          }}
        >
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
                      <Typography
                        variant="caption"
                        color="rgba(255,255,255,0.5)"
                      >
                        Last step
                      </Typography>
                    ) : null
                  }
                >
                  <Typography color="black">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography color="black">{step.description}</Typography>
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
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
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
    </>
  );
}
