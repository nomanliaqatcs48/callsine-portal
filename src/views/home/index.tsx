import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <Grid container>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
