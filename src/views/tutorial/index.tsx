import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import useGetUserMe from "src/hooks/settings/useGetUser";
import { useTutorial } from "src/hooks/wizard/useTutorial";
import icon from "../../assets/images/icons/logo-color-2x.png";
import imageBgcTop from "../../assets/images/users/Group3.png";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import { useNavigate } from "react-router-dom";

export default function VerticalLinearStepper() {
  const { loading, data, error } = useGetUserMe();

  const navigate = useNavigate()
  const theme = useTheme();

  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const { steps, activeStep, handleNext, handleBack, handleReset, submitted } =
    useTutorial();

  // usePlaybook(true);

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
        pt={2}
        className="tw-h-auto tw-w-full"
        style={{
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          minHeight: "calc(100vh + 92px)",
        }}
      >
        <img
          className=" tw-h-[67px] tw-py-[0px] tw-px-[10px]"
          src={icon}
          alt="CALLSINE ICON"
          style={{ marginRight: matchDownSM ? 8 : 16 }}
        />
        <Box
          sx={{
            marginTop: 10,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,

            position: "absolute",
            maxWidth: 800,
            minWidth: 800,
            zIndex: 10,
          }}
        >
          <Box className="tw-h-[20px]" />

          <Box className="tw-h-[20px]" />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel style={{ color: "white" }}>
                  <Typography color="white" fontSize={20}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography color="white" fontSize={15}>
                    {step.description}
                  </Typography>
                  {step.content()}

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index < steps.length - 1 ? (
                        // Show the Continue button if it's not the last step
                        <Button
                          variant="outlined"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          className="tw-bg-white"
                        >
                          Continue
                        </Button>
                      ) : (
                        // If it's the last step, show the Finish button only if submitted is true
                        <Button
                          variant="outlined"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          className="tw-bg-white"
                        >
                          Got It, Thanks
                        </Button>
                      )}
                      <Button
                        // disabled={index === 0}
                        onClick={() => {
                          if(index === 0) {
                            navigate(-1)
                          }
                          handleBack()
                        }}
                        sx={{ mt: 1, mr: 1 }}
                        className="tw-text-white"
                      >
                        <Typography color="white">Back </Typography>
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
              <Typography color="white">
                All steps completed - you&apos;re finished
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
}
