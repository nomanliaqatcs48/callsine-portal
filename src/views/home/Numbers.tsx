import React from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../../assets/images/svg/number-bg.svg";

const Container = styled("div")(({ theme }) => ({
  padding: "126px 182px",
  [theme.breakpoints.down("sm")]: {
    padding: "40px 16px",
  },
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#3874CB",
}));

const Part = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "24px",
  borderRight: "1px solid #fff",
  [theme.breakpoints.down("sm")]: {
    borderRight: "none",
  },
}));

const Numbers: React.FC = () => {
  return (
    <Container>
      <Grid item xs={12} sm={12} alignItems={"center"}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            textDecoration: "none",
            color: "#fff",
            marginBottom: "45px",
            fontSize: "40px",
            fontWeight: 200,
          }}
        >
          RocketReach, connecting made simple
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Part>
            <Typography
              variant="h1"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "70px",
              }}
            >
              700
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 400,
                fontSize: "28px",
              }}
            >
              Million Profiles
            </Typography>
          </Part>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Part>
            <Typography
              variant="h1"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "70px",
              }}
            >
              35
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 400,
                fontSize: "28px",
              }}
            >
              Million Companies
            </Typography>
          </Part>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Part sx={{ border: "none" }}>
            <Typography
              variant="h1"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "70px",
              }}
            >
              46.2
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 400,
                fontSize: "28px",
              }}
            >
              Million Searches Run
            </Typography>
          </Part>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Numbers;
