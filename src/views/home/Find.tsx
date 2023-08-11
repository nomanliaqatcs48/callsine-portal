import React from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { IconThumbUpFilled, IconSearch, IconUsers } from "@tabler/icons-react";

const Container = styled("div")({
  marginTop: "0px",
  padding: "86px 182px",
  "@media (max-width: 600px)": {
    padding: "40px 16px",
  },
});

const Part = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "16px",
  backgroundColor: "#2C2C2C",
  borderRadius: "4px",
});

const Circle = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#FFFFFF",
  marginBottom: "15px",
});

const Find = () => {
  return (
    <Container style={{ backgroundColor: "#2C2C2C" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Part
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Circle>
              <IconSearch
                size={36}
                strokeWidth={2}
                color="#2C2C2C"
                // fill="#0077b5"
              />
            </Circle>
            <Typography
              className="tw-font-normal tw-leading-[46px] tw-mb-[10px] tw-text-center"
              variant="h2"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "30px",
              }}
            >
              Load Contacts
              {/*Find contact*/}
            </Typography>
            <Typography
              className="tw-font-light tw-text-[18px] tw-leading-[27px]"
              variant="subtitle1"
              align="center"
              sx={{
                textDecoration: "none",
                color: "#fff",
                opacity: 1,
              }}
            >
              CallSine effortlessly imports and manages your contacts for
              seamless outreach.
              {/*Find, contact, and close your ideal buyers with over 265M <br />{" "}
              contacts and streamlined engagement
              <br /> workflows powered by AI.*/}
            </Typography>
          </Part>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Part>
            <Circle>
              <IconThumbUpFilled
                size={40}
                strokeWidth={2}
                color="#2C2C2C"
                // fill="#0077b5"
              />
            </Circle>
            <Typography
              className="tw-font-normal tw-leading-[46px] tw-mb-[10px] tw-text-center"
              variant="h2"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "30px",
              }}
            >
              Train AI
              {/*Find contact*/}
            </Typography>
            <Typography
              className="tw-font-light tw-text-[18px] tw-leading-[27px]"
              variant="subtitle1"
              align="center"
              sx={{
                textDecoration: "none",
                color: "#fff",
                opacity: 1,
              }}
            >
              Empower your sales with our AI, honed to perfection for
              personalized emails.
              {/*Find, contact, and close your ideal buyers with over 265M <br />{" "}
              contacts and streamlined engagement
              <br /> workflows powered by AI.*/}
            </Typography>
          </Part>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Part>
            <Circle>
              <IconUsers
                size={36}
                strokeWidth={2}
                color="#2C2C2C"
                fill="#2C2C2C"
              />
            </Circle>
            <Typography
              className="tw-font-normal tw-leading-[46px] tw-mb-[10px] tw-text-center"
              variant="h2"
              sx={{
                textDecoration: "none",
                color: "#fff",
                marginBottom: "5px",
                fontSize: "30px",
              }}
            >
              Send Emails
              {/*Find contact*/}
            </Typography>
            <Typography
              className="tw-font-light tw-text-[18px] tw-leading-[27px]"
              variant="subtitle1"
              align="center"
              sx={{
                textDecoration: "none",
                color: "#fff",
                opacity: 1,
              }}
            >
              Experience efficient and targeted email campaigns with CallSine's
              user-friendly platform.
              {/*Find, contact, and close your ideal buyers with over 265M <br />{" "}
              contacts and streamlined engagement
              <br /> workflows powered by AI.*/}
            </Typography>
          </Part>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Find;
