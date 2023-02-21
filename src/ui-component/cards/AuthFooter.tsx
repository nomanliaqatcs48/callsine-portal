// material-ui
import { Link, Typography, Stack } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://app.callsine.com"
      target="_blank"
      underline="hover"
    >
      app.callsine.com
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://www.callsine.com/"
      target="_blank"
      underline="hover"
    >
      &copy; callsine.com
    </Typography>
  </Stack>
);

export default AuthFooter;
