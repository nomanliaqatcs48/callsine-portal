import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "../../../ui-component/Logo";
import AuthFooter from "../../../ui-component/cards/AuthFooter";
import GoogleLoginBtn from "../auth-forms/GoogleLoginBtn";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import config from "src/config";
import MicrosoftLoginBtn from "../auth-forms/microsoft/MicrosoftLoginBtn";
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: config.googleClientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item className="tw-mb-4">
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/*<Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>*/}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid>
                      <GoogleLoginBtn />
                    </Grid>
                    {/* < /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <MicrosoftLoginBtn />
                  </Grid>

                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  {/*<Grid item xs={12}>
                    <Divider />
                  </Grid>*/}
                  {/*<Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        to="/signup"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>*/}
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
