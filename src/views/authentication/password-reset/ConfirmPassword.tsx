import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import { passwordConfirmService } from "src/services/auth.service";
import { ToastError, ToastSuccess } from "src/helpers/toast";

const ConfirmPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("No token provided");
      return;
    }

    try {
      const response = await passwordConfirmService(token, { newPassword });
      console.log({ response });
      if (response.status === 200) {
        ToastSuccess(response.data.message);
      } else {
        ToastError(response.data.message);
      }
    } catch (error) {
      setError("Error resetting password");
      console.error("Error resetting password", error);
    }
  };

  return (
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
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="tw-bg-primary"
      >
        Set New Password
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

export default ConfirmPassword;
