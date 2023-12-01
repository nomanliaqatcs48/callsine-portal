import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import { passwordConfirmService } from "src/services/auth.service";
import { ToastError, ToastSuccess } from "src/helpers/toast";

import Logo from "src/ui-component/Logo";
import { Helmet } from "react-helmet-async";

const ConfirmPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  const passwordsMatch = newPassword === confirmPassword;
  const isPasswordLongEnough = newPassword.length >= 8;
  const isFormValid = newPassword && isPasswordLongEnough && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("No token provided");
      setError("No token provided");
      return;
    }

    if (!isPasswordLongEnough) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await passwordConfirmService(token, { newPassword });
      if (response.status === 200) {
        ToastSuccess(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        ToastError(response.data.message);
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Error resetting password", error);
      ToastError(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Confirm Password | CallSine</title>
      </Helmet>
      <div className="tw-mt-12">
        <div className="tw-w-full tw-mx-auto tw-flex tw-justify-center tw-mb-6">
          <Logo />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "300px",
            marginTop: "200px",
            margin: "auto",
          }}
        >
          <div className="tw-my-6 tw-font-semibold">Reset Password</div>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            variant="outlined"
            error={!isPasswordLongEnough && newPassword.length > 0}
            helperText={
              !isPasswordLongEnough &&
              newPassword.length > 0 &&
              "Password must be at least 8 characters long"
            }
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            error={!passwordsMatch}
            helperText={!passwordsMatch && "Passwords must match"}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="tw-bg-primary"
            disabled={!isFormValid}
          >
            Set New Password
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </form>
      </div>
    </>
  );
};

export default ConfirmPassword;
