import React from "react";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Fifth = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid
        container
        sx={{
          p: { xs: 1, md: 3 },
          pt: { xs: 10, md: 10 },
          pb: { xs: 10, md: 10 },
          px: { lg: 15, xl: 30 },
          background: "rgb(9,9,10)",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            color="#fff"
            sx={{ fontSize: 46, p: { md: 3 } }}
          >
            The LinkedIn + Email Prospecting is now 🚀
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{ fontSize: 16, fontWeight: 600 }}
          >
            It's free, why not try it? ❤️
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Fifth;
