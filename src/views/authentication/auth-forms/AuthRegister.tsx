import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "../../../hooks/useScriptRef";
import Google from "../../../assets/images/icons/social-google.svg";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { devLog, devLogError } from "../../../helpers/logs";
import { loginService, signupService } from "../../../services/auth.service";
import { load, save, saveString } from "../../../utils/storage";
import { toast } from "react-toastify";
import { insertBodyLoader, removeBodyLoader } from "../../../helpers/loaders";
import { profileService } from "../../../services/profile.service";
import GoogleLoginBtn from "./google/GoogleLoginBtn";
import MicrosoftLoginBtn from "./microsoft/MicrosoftLoginBtn";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme: any = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state: any) => state.customization);
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>(null);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<any>();

  const googleHandler = async () => {
    devLogError(() => {
      console.error("Register");
    });
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword1 = (event: any) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);

  const checkPasswords = (values: any) => {
    return values?.password1 === values?.password2;
  };

  const onSubmit = async (
    values: any,
    { setErrors, setStatus, setSubmitting }: any
  ) => {
    devLog(() => {
      console.log("onSubmit() values", values);
    });

    if (!checkPasswords(values)) {
      setStatus({ success: false });
      setErrors({ submit: "Passwords don't match." });
      setSubmitting(false);
      return;
    }

    insertBodyLoader();

    try {
      devLog(() => {
        console.log("values", values);
      });
      let res = await signupService(values);
      devLog(() => {
        console.log("res", res);
      });
      if (res?.data) {
        // await saveString("isAuthenticated", "yes");
        // await saveString("token", res.data.access_token);
        // await saveString("refresh", res.data.refresh_token);
        // await save("profile", res.data.user);
        // window.location.href = "/dashboard";
        // navigate("/pricing");
        /*toast.success(
          "Your account has been registered successfully. You can now login.",
          {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );*/
        /*if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }*/
        setTimeout(() => {
          login(values, { setErrors, setStatus, setSubmitting });
        }, 1000);
      }
    } catch (err: any) {
      devLogError(() => {
        console.error(err?.response);
      });
      if (scriptedRef.current) {
        setStatus({ success: false });
        if (err?.response?.data?.email?.length > 0) {
          setErrors({ submit: err?.response?.data?.email[0] });
        } else if (err?.response?.data?.password1?.length > 0) {
          setErrors({ submit: err?.response?.data?.password1[0] });
        } else if (err?.response?.data?.password2?.length > 0) {
          setErrors({ submit: err?.response?.data?.password2[0] });
        } else if (err?.response?.data?.username?.length > 0) {
          setErrors({ submit: err?.response?.data?.username[0] });
        } else {
          setErrors({ submit: "There's something wrong." });
        }

        setSubmitting(false);
      }

      removeBodyLoader();
    }
  };

  const login = async (
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
        password: values.password1,
      };
      let res = await loginService(requestData);
      devLog(() => {
        console.log("res", res);
      });
      if (res?.data) {
        await saveString("isAuthenticated", "yes");
        await saveString("token", res.data.access);
        await saveString("refresh", res.data.refresh);
        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
        navigate("/pricing");
        getProfile();
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
      removeBodyLoader();
    }
  };

  const getProfile = async () => {
    try {
      let _profile = await load("profile");
      if (_profile) {
        setProfile(_profile);

        removeBodyLoader();
      } else {
        let res = await profileService();
        if (res?.data) {
          await save("profile", res.data);
          setProfile(res.data);
        }
        devLog(() => {
          console.log("res", res);
        });

        removeBodyLoader();
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e);
      });

      removeBodyLoader();
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password1: "",
          password2: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required("First Name is required"),
          last_name: Yup.string().max(255).required("Last Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          username: Yup.string().max(255).required("Username is required"),
          password1: Yup.string().max(255).required("Password is required"),
          password2: Yup.string()
            .max(255)
            .required("Confirm password is required"),
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
            <Grid>
              <Typography
                className="tw-text-[40px] tw-font-semibold"
                sx={{
                  // font: 'normal normal 600 40px/80px',
                  letterSpacing: "2px",
                  color: "#000",
                }}
              >
                Create An Account
              </Typography>
              <Grid className="tw-my-3" item xs={12}>
                <Grid>
                  <GoogleLoginBtn />
                </Grid>
              </Grid>
              <Grid className="tw-my-3" item xs={12}>
                <MicrosoftLoginBtn />
              </Grid>
              <Typography
                className="tw-text-[18px] tw-font-normal tw-tracking-[0.9px]"
                sx={{
                  // font: "normal normal normal 18px/80px",
                  // letterSpacing: "0.9px",
                  color: "#000",
                  display: "flex",
                }}
              >
                Already an user?
                <Link
                  to="/login"
                  className="tw-no-underline hover:tw-no-underline tw-cursor-pointer tw-text-primaryLight tw-font-medium hover:tw-text-primary"
                >
                  <Typography
                    className="tw-text-[18px] tw-font-normal tw-tracking-[0.9px]"
                    sx={{
                      // font: "normal normal normal 18px/80px",
                      // letterSpacing: "0.9px",
                      color: "#1976D2",
                      marginLeft: "5px",
                    }}
                  >
                    Sign In
                  </Typography>
                </Link>
              </Typography>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                    First Name
                  </div>
                  <TextField
                    required
                    fullWidth
                    sx={{
                      "& input.MuiOutlinedInput-input": {
                        backgroundColor: "#FFF",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "1px solid #ECEFFF",
                          marginTop: "0px",
                          boxShadow: "0px 1px 3px #0000001A",
                        },
                        "&:hover fieldset": {
                          border: "1px solid #222",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid #222",
                        },
                      },
                    }}
                    type="text"
                    name="first_name"
                    value={values.first_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.first_name && errors.first_name && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-first_name-register"
                    >
                      {errors.first_name}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                    Last Name
                  </div>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    value={values.last_name}
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                    sx={{
                      "& input.MuiOutlinedInput-input": {
                        backgroundColor: "#FFF",
                        borderRadius: "10px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "1px solid #ECEFFF",
                          marginTop: "0px",
                          boxShadow: "0px 1px 3px #0000001A",
                        },
                        "&:hover fieldset": {
                          border: "1px solid #222",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid #222",
                        },
                      },
                    }}
                  />

                  {touched.last_name && errors.last_name && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-last_name-register"
                    >
                      {errors.last_name}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                  Email
                </div>
                <TextField
                  required
                  fullWidth
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                  sx={{
                    "& input.MuiOutlinedInput-input": {
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid #ECEFFF",
                        marginTop: "0px",
                        boxShadow: "0px 1px 3px #0000001A",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #222",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #222",
                      },
                    },
                  }}
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                  Username
                </div>
                <TextField
                  required
                  fullWidth
                  type="text"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                  sx={{
                    "& input.MuiOutlinedInput-input": {
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid #ECEFFF",
                        marginTop: "0px",
                        boxShadow: "0px 1px 3px #0000001A",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #222",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #222",
                      },
                    },
                  }}
                />

                {touched.username && errors.username && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-username-register"
                  >
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                  Password
                </div>
                <TextField
                  required
                  fullWidth
                  type={showPassword1 ? "text" : "password"}
                  value={values.password1}
                  name="password1"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  inputProps={{}}
                  sx={{
                    "& input.MuiOutlinedInput-input": {
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid #ECEFFF",
                        marginTop: "0px",
                        boxShadow: "0px 1px 3px #0000001A",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #222",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #222",
                      },
                    },
                  }}
                />
                {touched.password1 && errors.password1 && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password1-register"
                  >
                    {errors.password1}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <div className="tw-text-[15px] tw-py-1 tw-font-normal tw-tracking-[0.3px] tw-leading-[23px] tw-text-black">
                  Confirm Password
                </div>
                <TextField
                  required
                  fullWidth
                  type={showPassword2 ? "text" : "password"}
                  value={values.password2}
                  name="password2"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  inputProps={{}}
                  sx={{
                    "& input.MuiOutlinedInput-input": {
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid #ECEFFF",
                        marginTop: "0px",
                        boxShadow: "0px 1px 3px #0000001A",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #222",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #222",
                      },
                    },
                  }}
                />
                {touched.password2 && errors.password2 && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password2-register"
                  >
                    {errors.password2}
                  </FormHelperText>
                )}
              </Grid>
            </Box>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: "7px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ color: "#fff" }}
                  className="tw-bg-primary hover:tw-bg-primaryDark tw-text-white tw-uppercase tw-font-bold tw-rounded-[10px] tw-py-3.5 tw-text-[20px] tw-tracking-[0.4px]"
                >
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
