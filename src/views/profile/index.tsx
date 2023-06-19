import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { devLog, devLogError } from "../../helpers/logs";
import {
  postUsersMeService,
  profileService,
} from "../../services/profile.service";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import {
  strengthColor,
  strengthIndicator,
} from "../../utils/password-strength";
import { useProfile } from "../../hooks/profile/useProfile";

const Profile = () => {
  const theme: any = useTheme();
  const {
    showPassword1,
    setShowPassword1,
    showPassword2,
    setShowPassword2,
    strength,
    setStrength,
    level,
    setLevel,
    isLoading,
    setIsLoading,
    handleClickShowPassword1,
    handleClickShowPassword2,
    handleMouseDownPassword1,
    handleMouseDownPassword2,
  } = useProfile();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetUserMe();
  }, []);

  const GetUserMe = async () => {
    try {
      let response = await profileService();
      if (response) {
        devLog(() => {
          console.log("response", response.data);
        });
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading((prev: any) => ({ ...prev, form: true }));
    if (!checkPasswords(data)) {
      setError("password2", {
        type: "manual",
        message: "Passwords don't match.",
      });
      setIsLoading((beforeVal: any) => ({
        ...beforeVal,
        form: false,
      }));
      return;
    }
    try {
      let res = await postUsersMeService(data);
      if (res?.data) {
        ToastSuccess("Profile successfully updated.");
        reset();
        setIsLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const checkPasswords = (values: any) => {
    return values?.password1 === values?.password2;
  };

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
                <Grid item xs={12} lg={12} className="">
                  <FormControl
                    fullWidth
                    error={Boolean(errors.password1)}
                    margin="dense"
                    disabled={isLoading?.form}
                    required
                  >
                    <InputLabel htmlFor="password1">Password</InputLabel>
                    <OutlinedInput
                      id="password1"
                      type={showPassword1 ? "text" : "password"}
                      {...register("password1", {
                        required: "This is required field.",
                        maxLength: {
                          value: 255,
                          message: "Too many characters",
                        },
                      })}
                      name="password1"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            edge="end"
                            size="large"
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      inputProps={{}}
                      autoComplete="off"
                      className="tw-bg-transparent"
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="password1"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </Grid>

                {/*confirm password*/}
                <Grid item xs={12} lg={12} className="">
                  <FormControl
                    fullWidth
                    error={Boolean(errors.password2)}
                    margin="dense"
                    disabled={isLoading?.form}
                    required
                  >
                    <InputLabel htmlFor="password2">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="password2"
                      type={showPassword2 ? "text" : "password"}
                      {...register("password2", {
                        required: "This is required field.",
                        maxLength: {
                          value: 255,
                          message: "Too many characters",
                        },
                      })}
                      name="password2"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                            size="large"
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      inputProps={{}}
                      autoComplete="off"
                      className="tw-bg-transparent"
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="password2"
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
                    onClick={handleSubmit((data) => onSubmit(data))}
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
