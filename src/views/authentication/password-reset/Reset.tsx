import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import Logo from "../../../ui-component/Logo";
import { ToastError, ToastSuccess } from "src/helpers/toast";
import { passwordResetService } from "src/services/auth.service";

// ===============================|| AUTH - PASSWORD RESET ||=============================== //

const Reset: React.FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid) {
      ToastError("Invalid email address");
      return;
    }

    try {
      const response = await passwordResetService({ email });
      if (response.status === 200) {
        ToastSuccess(response.data.message);
        setSuccessMessage(
          `Check ${email} inbox or spam folder for password reset link.`
        );
        setEmail("");
      } else {
        ToastError(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {}
  };

  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: matchDownSM ? 2 : 8,
              }}
            >
              <Box sx={{ maxWidth: 480, width: "100%" }}>
                <Box
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Logo />
                </Box>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="tw-bg-primary"
                      disabled={!isEmailValid || email.length === 0}
                    >
                      Reset Password
                    </Button>
                  </Box>
                </form>
                {successMessage && (
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="subtitle1" color="green">
                      {successMessage}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Reset;
