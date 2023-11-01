import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "src/services/axios";
import { endpoints } from "src/services/endpoints";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

interface SetPasswordProps {}

const SetPassword: React.FC<SetPasswordProps> = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log("loading");
  const { token } = useParams<{ token: string }>(); // 2. Invoke useParams to get token
  console.log(token);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: any) => {
    console.log(e);
    e.preventDefault(); // prevent the default form submission
    console.log("default prevented");

    if (!password || !confirmPassword) {
      alert("Please enter password.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Assuming you have a configured axios instance as http
    http
      .post(`${endpoints.API_GENERAL}password-set/${token}/`, {
        password: password,
      })
      .then((response) => {
        e.preventDefault(); // prevent the default form submission
        console.log("default prevented");
        // You might also want to authenticate the user here or redirect to the login page.
        // alert(response.data.message); // "Registration successful."
        setOpen(true);

        // Redirect to login or dashboard, e.g.:
        // navigate("/login");
      })
      .catch((error) => {
        e.preventDefault(); // prevent the default form submission
        console.log("default prevented", error);
        setError(true);
        setErrorMessage("Error setting password: " + error.message);
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    handleNav();
  };

  const handleNav = () => {
    if (!error) {
      navigate("/login"); // Redirect to the login page}
    }
  };

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{
          "& > div > input": {
            padding: "10.5px 14px 11.5px !important",
            backgroundColor: "white",
          },
          "& fieldset": {
            borderRadius: 2,
            borderColor: "transparent",
            boxShadow: "0 0px 3px 1px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div className="tw-text-[15px] tw-leading-[23px] tw-tracking-[0.3px] tw-text-black tw-py-3 tw-font-normal">
          Password
        </div>
        <OutlinedInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </FormControl>

      <FormControl
        fullWidth
        sx={{
          "& > div > input": {
            padding: "10.5px 14px 11.5px !important",
            backgroundColor: "white",
          },
          "& fieldset": {
            borderRadius: 2,
            borderColor: "transparent",
            boxShadow: "0 0px 3px 1px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div className="tw-text-[15px] tw-leading-[23px] tw-tracking-[0.3px] tw-text-black tw-py-3 tw-font-normal">
          Confirm Password
        </div>
        <OutlinedInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <AnimateButton>
          <Button
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            fullWidth
            className="tw-bg-primary hover:tw-bg-primaryDark tw-text-[20px] tw-leading-[30px] tw-text-white tw-uppercase tw-font-bold tw-rounded-lg tw-py-3"
          >
            Set Password
          </Button>
        </AnimateButton>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <>
          {!error ? (
            <>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogContent>
                <DialogContentText>You can now login.</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Go to Login
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
              {" "}
              <DialogTitle>Registration Unsuccessful</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {errorMessage} <br /> If you continue to have issues, please
                  contact your team admin.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Try Again
                </Button>
              </DialogActions>{" "}
            </>
          )}
        </>
      </Dialog>
    </Box>
  );
};

export default SetPassword;
