import { Link } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import Logo from "../../../ui-component/Logo";
import AuthFooter from "../../../ui-component/cards/AuthFooter";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthWrapper from "../AuthWrapper";
import SetPassword from "../auth-forms/InvitePasswordSet";
// ================================|| AUTH3 - LOGIN ||================================ //

const InviteConfirm = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

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
                      <Grid item>
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
                            Hi, Welcome to Callsine!
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Create a password to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Grid>
                      <GoogleLoginBtn />
                    </Grid>
                    {/* < /> */}
                  {/* </Grid>
                  <Grid item xs={12}>
                    <MicrosoftLoginBtn />
                  </Grid> */}

                  {/* <Grid item xs={12}>
                    <hr className="divider sign-in" />
                  </Grid> */}

                  <Grid item xs={12}>
                    <SetPassword />
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
                        variant="subtitle1"
                        className="tw-font-normal"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?&nbsp;&nbsp;
                        <Typography
                          component={Link}
                          to="/signup"
                          variant="subtitle1"
                          className="tw-font-normal tw-underline"
                        >
                          Sign up
                        </Typography>
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

export default InviteConfirm;
