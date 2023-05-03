import React from "react";
import { Button, Grid, Typography } from "@mui/material";

const Hero = () => {
  return (
    <>
      <Grid container sx={{ p: { xs: 1 } }}>
        <Grid item md={2} />
        <Grid item md={8}>
          <h1
            style={{ textAlign: "center", fontSize: 42, lineHeight: "2.5rem" }}
          >
            The Fast and Easy Way to{" "}
            <span style={{ fontWeight: "bold" }}>
              Find Your Ideal Customers
            </span>
          </h1>
          <Typography fontSize={22} align="center">
            Looking for a fast and easy way to find the contact information of
            your ideal customers? Look no further than CallSine, the powerful
            new Chrome extension that's designed specifically for sales reps.
          </Typography>
          <Grid
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
              sx={{ fontSize: 16 }}
            >
              Download CallSine today - it's free
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;
