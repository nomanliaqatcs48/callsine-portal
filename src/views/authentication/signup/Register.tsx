import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Box, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import Logo from "../../../ui-component/Logo";
import AuthRegister from "../auth-forms/AuthRegister";
import AuthFooter from "../../../ui-component/cards/AuthFooter";
import imageOne from "../../../assets/images/register/Group3.png";
import imageTwo from "../../../assets/images/register/Rectangle1.png"
// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}>

          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            
            <Grid item xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '50px',
                paddingRight: '50px'
              }}>
              <AuthRegister />
            </Grid>

          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper>
  );
};

export default Register;