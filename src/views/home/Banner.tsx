import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";
import dashboard from "../../assets/images/users/Web 1920 – 79@2x.png";
import { IconSquareRoundedCheckFilled } from "@tabler/icons-react";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import imageBgcTop from "../../assets/images/users/Group3.png";

const Banner = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid
        container
        sx={{
          paddingRight: "0px",
          marginRight: "0px",
          marginBottom: "0px",
          background: "#fafafa",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          alignItems: "center",
          zIndex: "9",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <img
          className="h-auto max-w-full"
          src={imageBgcTop}
          alt="description"
          style={{
            position: "absolute",
            zIndex: "999",
            minHeight: "100vh",
            width: "100%",
          }}
        />
        <img
          className="h-auto max-w-full"
          src={imageBgc}
          alt="description"
          style={{ position: "absolute", minHeight: "100vh", width: "100%" }}
        />
        <Grid
          item
          // className={classes.leftSide}
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9",
            "@media (max-width: 600px)": {
              paddingTop: "75px",
            },
          }}
        >
          <div>
            <Typography
              variant="h2"
              sx={{
                fontSize: 60,
                p: { md: 3 },
                pb: { xs: 5 },
                fontWeight: 200,
                color: "#fff",
                fontFamily: "Poppins",
              }}
            >
              Reach every buyer <br /> on earth
            </Typography>

            <div>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 26,
                  paddingLeft: 3,
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                Find, contact, and close your ideal buyers with over 265M
                <br />
                contacts and streamlined engagement workflows
                <br />
                powered by AI.
              </Typography>
            </div>
            <div style={{ paddingLeft: "22px", marginTop: "15px" }}>
              <Button
                sx={{
                  backgroundColor: "#fff !important",
                  color: "#1976D2",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                size="large"
              >
                Sign up for free
              </Button>
              <Button
                sx={{
                  backgroundColor: "transparent !important",
                  color: "#fff",
                  padding: "12px 24px",
                  marginLeft: 3,
                  border: "1px solid #fff",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
                size="large"
              >
                Request for a demo
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Image
            src={dashboard}
            width={downMd ? "100%" : "100%"}
            height={downMd ? "100%" : "100%"}
            alt="callsine"
            style={{ marginLeft: "20%", overflowY: "hidden" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Banner;
