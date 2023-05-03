import React from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";

const Second = () => {
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
          background: "#fafafa",
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
            sx={{ fontSize: 42, p: { md: 3 }, pb: { xs: 5 } }}
          >
            Find Your Ideal Customers in a Click with CallSine
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image
            src="https://picsum.photos/seed/picsum/393/531"
            width={downMd ? "100%" : 393}
            height={downMd ? "auto" : 531}
            showLoading
            alt="callsine"
          />
          <Grid sx={{ height: 20 }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Second;
