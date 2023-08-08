import React, { useEffect, useState } from "react";
import {
  Box,
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
        className="xl:tw-min-h-[120vh]"
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
          minHeight: "110vh",
        }}
      >
        <img
          className="tw-h-auto tw-max-w-full"
          src={imageBgcTop}
          alt="description"
          style={{
            position: "absolute",
            zIndex: "999",
            // minHeight: "100vh",
            minHeight: downMd ? "calc(110vh + 92px)" : "100vh",
            width: "100%",
            mixBlendMode: "overlay",
            opacity: "0.4",
          }}
        />
        <img
          className="tw-h-auto tw-max-w-full"
          src={imageBgc}
          alt="description"
          style={{
            position: "absolute",
            /*minHeight: "100vh",*/ minHeight: downMd
              ? "calc(110vh + 92px)"
              : "100vh",
            width: "100%",
          }}
        />
        <Grid
          item
          // className={classes.leftSide}
          xs={12}
          md={7}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9",
            /*"@media (max-width: 600px)": {
              paddingTop: "80px", //"75px",
            },*/
            [theme.breakpoints.down("md")]: {
              paddingTop: "80px", //"75px",
            },
          }}
        >
          <Box className="lg:tw-ml-[30px] xl:tw-ml-[40px] 2xl:tw-ml-[190px]">
            <Typography
              variant="h2"
              className="tw-text-[40px] md:tw-text-[53px] lg:tw-text-[60px] tw-font-normal xl:tw-text-[80px] xl:tw-leading-[100px]"
              sx={{
                // fontSize: 60,
                p: { md: 3 },
                // pb: { xs: 5 },
                // fontWeight: 200,
                color: "#fff",
                fontFamily: "Poppins",
                [theme.breakpoints.down("md")]: {
                  p: 3,
                  textAlign: "center",
                },
              }}
            >
              CallSine unleashes the power of AI for sales
              {/*Reach every buyer <br /> on earth*/}
            </Typography>

            <Box className="tw-mb-10">
              <Typography
                variant="h4"
                className="tw-text-[20px] md:tw-text-[26px] xl:tw-text-[30px] xl:tw-leading-[46px]"
                sx={{
                  fontSize: 26,
                  paddingLeft: 3,
                  fontWeight: 400,
                  color: "#fff",
                  [theme.breakpoints.down("md")]: {
                    p: 3,
                    textAlign: "center",
                  },
                }}
              >
                CallSine™ was developed for salespeople and teams that are
                looking for a platform that does email outreach, at scale, and
                with individualized emails to each prospect.
                {/*Find, contact, and close your ideal buyers with over 265M
                <br />
                contacts and streamlined engagement workflows
                <br />
                powered by AI.*/}
              </Typography>
            </Box>
            <Box
              className="md:tw-pl-[22px]"
              sx={{
                // paddingLeft: "22px",
                marginTop: "15px",
                [theme.breakpoints.down("md")]: {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <Button
                className="lg:tw-text-[25px] tw-rounded-[5px]"
                sx={{
                  backgroundColor: "#fff !important",
                  color: "#1976D2",
                  padding: "12px 24px",
                  [theme.breakpoints.up("xl")]: {
                    padding: "16px 45px",
                  },
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                size="large"
              >
                Free Trial
                {/*Sign up for free*/}
              </Button>
              <Button
                className="lg:tw-text-[25px] tw-rounded-[5px]"
                sx={{
                  backgroundColor: "transparent !important",
                  color: "#fff",
                  padding: "12px 24px",
                  [theme.breakpoints.up("xl")]: {
                    padding: "15px 47px",
                  },
                  marginLeft: 3,
                  border: "1px solid #fff",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                  [theme.breakpoints.down("md")]: {
                    marginY: 1,
                    marginLeft: 0,
                  },
                }}
                size="large"
              >
                Schedule a Demo
                {/*Request for a demo*/}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5} lg={6}>
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
