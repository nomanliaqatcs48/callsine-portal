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
import imageMobileHand from "../../assets/images/users/image-mobile-hand.png";
import { IconSquareRoundedCheckFilled } from "@tabler/icons-react";

const TakeControl = () => {
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
          px: { md: 1, lg: 10, xl: 5 },
          background: "#fafafa",
        }}
        className="2xl:tw-px-[180px] 3xl:tw-px-[240px]"
      >
        <Grid item xs={12} xl={6}>
          <Image
            src={imageMobileHand}
            width={downMd ? "100%" : 593}
            height={downMd ? "auto" : 531}
            showLoading
            alt="callsine"
          />
          <Grid sx={{ height: 20 }} />
        </Grid>
        <Grid
          item
          xs={12}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: 42,
                p: { xs: 3, md: 3 },
                pb: { xs: 5 },
                fontWeight: 1000,
              }}
            >
              <span style={{ color: "#1976D2" }}>Take control</span> of <br />
              us for better
            </Typography>

            <div>
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="red"
                    fill="#1976D2"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 22, fontWeight: 400, ml: 2 }}
                  >
                    AI-Driven Personalization
                    {/*Advanced Search*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 16,
                  p: { sm: 3 },
                  ml: 3,
                  mt: 0,
                  fontWeight: 400,
                }}
              >
                Tailored, personalized emails for each recipient, increasing
                engagement and conversion rates.
                {/*Find, contact, and close your ideal buyers with over 265M
                contacts and
                <br /> streamlined engagement workflows powered by AI.*/}
              </Typography>
            </div>

            <div>
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="red"
                    fill="#1976D2"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 22, fontWeight: 400, ml: 2 }}
                  >
                    Streamlined Outreach Workflows
                    {/*Browser Extension*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 16,
                  p: { sm: 3 },
                  ml: 3,
                  mt: 0,
                  fontWeight: 400,
                }}
              >
                Efficiently reach ideal customers with automated engagement
                workflows powered by AI.
                {/*Prospect on popular social media sites and discover company
                <br /> connections from any website.*/}
              </Typography>
            </div>

            <div>
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="#fff"
                    fill="#0077b5"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 22, fontWeight: 400, ml: 2 }}
                  >
                    Data-Driven Learning
                    {/*Bulk Lookups*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 16,
                  p: { sm: 3 },
                  ml: 3,
                  mt: 0,
                  fontWeight: 400,
                }}
              >
                Our AI evolves with each interaction, crafting personalized
                emails connected to each salesperson and recipient.
                {/*Download thousands of prospects meeting your specific target
                criteria
                <br /> instantly.*/}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TakeControl;
