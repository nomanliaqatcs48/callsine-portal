import React, { useState } from "react";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { emailAddressPattern } from "../../helpers/forms";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<any>({
    form: false,
  });
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Paper elevation={1} className="tw-px-20 tw-py-10">
        <Grid container className="tw-max-w-2xl tw-mx-auto">
          <Grid item xs={12}>
            <Typography className="tw-text-lg">Profile</Typography>
          </Grid>
        </Grid>
        {/*form*/}
        <Grid container className="tw-max-w-2xl tw-mx-auto">
          <Grid item xs={12}>
            <Box component="form" noValidate autoComplete="off">
              <Grid container columnSpacing={1}>
                {/*firstname*/}
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={!!errors.first_name}
                    disabled={isLoading?.form}
                    required
                    margin="dense"
                    id="first_name"
                    label="First Name"
                    type="text"
                    fullWidth
                    {...register("first_name", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="first_name"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*lastname*/}
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={!!errors.last_name}
                    disabled={isLoading?.form}
                    required
                    margin="dense"
                    id="last_name"
                    label="Last Name"
                    type="text"
                    fullWidth
                    {...register("last_name", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="last_name"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*company name*/}
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={!!errors.company_name}
                    disabled={isLoading?.form}
                    required
                    margin="dense"
                    id="company_name"
                    label="Company Name"
                    type="text"
                    fullWidth
                    {...register("company_name", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="company_name"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*company website*/}
                <Grid item xs={12} lg={6}>
                  <TextField
                    error={!!errors.company_website}
                    disabled={isLoading?.form}
                    required
                    margin="dense"
                    id="company_website"
                    label="Company Website"
                    type="text"
                    fullWidth
                    {...register("company_website", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="company_website"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*password*/}
                <Grid item xs={12} lg={12}>
                  <TextField
                    error={!!errors.password}
                    disabled={isLoading?.form}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*confirm password*/}
                <Grid item xs={12} lg={12}>
                  <TextField
                    error={!!errors.confirm_password}
                    disabled={isLoading?.form}
                    margin="dense"
                    id="confirm_password"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    {...register("confirm_password")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="confirm_password"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*submit button*/}
                <Grid item xs={12} lg={12} className="tw-py-2">
                  <Button
                    onClick={() => null}
                    disabled={isLoading?.form}
                    variant="outlined"
                    color="primary"
                    className="tw-w-full tw-py-3 tw-uppercase tw-text-sm tw-rounded-lg"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Profile;
