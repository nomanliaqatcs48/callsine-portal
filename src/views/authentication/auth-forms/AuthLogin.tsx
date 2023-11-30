import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "../../../hooks/useScriptRef";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import Google from "../../../assets/images/icons/social-google.svg";
import { loginService } from "../../../services/auth.service";
import { saveString } from "../../../utils/storage";
import { devLog, devLogError } from "../../../helpers/logs";
import { save } from "../../../utils/storage";
import { profileService } from "../../../services/profile.service";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const theme: any = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state: any) => state.customization);
  const [checked, setChecked] = useState(true);

  const googleHandler = async () => {
    devLog(() => {
      console.log("Login");
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit = async (
    values: any,
    { setErrors, setStatus, setSubmitting }: any
  ) => {
    try {
      devLog(() => {
        console.log("values", values);
      });
      values.username = values.email;
      const requestData = {
        username: values.email,
        password: values.password,
      };
      let res = await loginService(requestData);
      devLog(() => {
        console.log("res", res);
      });
      if (res?.data) {
        await saveString("isAuthenticated", "yes");
        await saveString("token", res.data.access);
        await saveString("refresh", res.data.refresh);

        let response = await profileService();
        if (response?.data) {
          await save("profile", response.data);
          // if(response.data?.subscription?.id) {
          window.location.href = "/people";
          // } else {
          //   window.location.href = "/wizard/checkout";
          // }
        }

        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: "Incorrect username or password." });
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      {/*<Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`,
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>*/}

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            // .email("Must be a valid email")
            .max(50)
            .required("Email or username is required"),
          password: Yup.string().max(50).required("Password is required"),
        })}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }: any) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{
                ...theme.typography.customInput,
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
                Username
              </div>
              {/*<InputLabel htmlFor="outlined-adornment-email-login">
                Email Address / Username
              </InputLabel>*/}
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                // label="Email Address / Username"
                inputProps={{}}
                autoComplete="off"
                sx={{
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "#2b8cc3!important",
                    },
                  },
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                  className="tw-ml-1"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{
                ...theme.typography.customInput,
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
              {/*<InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>*/}
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
                autoComplete="off"
                className="tw-bg-transparent"
                sx={{
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "#2b8cc3!important",
                    },
                  },
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                  className="tw-ml-1"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing={1}
            >
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              /> */}
              <Typography
                component={Link}
                to="/password-reset"
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>

              {/* <Typography
                component={Link}
                to="/signup"
                variant="subtitle1"
                className="tw-text-xs tw-no-underline tw-cursor-pointer tw-text-primaryLight tw-font-medium hover:tw-text-primary"
              >
                Don&apos;t have an account?
              </Typography> */}
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="tw-bg-primary hover:tw-bg-primaryDark tw-text-[20px] tw-leading-[30px] tw-text-white tw-uppercase tw-font-bold tw-rounded-lg tw-py-3"
                  // sx={{ color: "#fff" }}
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
