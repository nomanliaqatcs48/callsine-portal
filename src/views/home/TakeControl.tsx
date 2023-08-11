import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";
import imageMobileHand from "../../assets/images/users/image-mobile-hand.png";
import { IconSquareRoundedCheckFilled } from "@tabler/icons-react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
            wrapperClassName="tw-mx-auto xl:tw-mx-0"
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
              className="tw-text-[45px] tw-text-center tw-font-bold tw-pl-0 xl:tw-text-left lg:tw-text-[70px]"
              variant="h2"
              align="left"
              sx={{
                p: { xs: 3, md: 3 },
                pb: { xs: 5 },
              }}
            >
              <span
                className="tw-font-bold tw-text-[70px]"
                style={{ color: "#1976D2" }}
              >
                CallSine
              </span>{" "}
              does the heavy lifting
            </Typography>

            <Box className="tw-mb-4">
              <Grid
                className="tw-flex-nowrap"
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <Checkbox
                    defaultChecked
                    sx={{
                      p: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: 30,
                        [theme.breakpoints.up("sm")]: {
                          fontSize: 40,
                        },
                      },
                    }}
                    className="tw-pointer-events-none"
                  />
                  {/*<IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="red"
                    fill="#1976D2"
                  />*/}
                </Grid>
                <Grid item>
                  <Typography
                    className="tw-text-[20px] sm:tw-text-[30px]"
                    variant="h4"
                    sx={{ fontWeight: 400, ml: 2 }}
                  >
                    AI-Driven Personalization
                    {/*Advanced Search*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                className="tw-text-[15px] sm:tw-text-[18px] tw-pt-3 tw-leading-[27px]"
                variant="h4"
                sx={{
                  p: { sm: 3 },
                  ml: 4,
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
            </Box>

            <Box className="tw-mb-4">
              <Grid
                className="tw-flex-nowrap"
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <Checkbox
                    defaultChecked
                    sx={{
                      p: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: 30,
                        [theme.breakpoints.up("sm")]: {
                          fontSize: 40,
                        },
                      },
                    }}
                    className="tw-pointer-events-none"
                  />
                  {/*<IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="red"
                    fill="#1976D2"
                  />*/}
                </Grid>
                <Grid item>
                  <Typography
                    className="tw-text-[20px] sm:tw-text-[30px]"
                    variant="h4"
                    sx={{ fontWeight: 400, ml: 2 }}
                  >
                    Streamlined Outreach Workflows
                    {/*Browser Extension*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                className="tw-text-[15px] sm:tw-text-[18px] tw-pt-3 tw-leading-[27px]"
                variant="h4"
                sx={{
                  p: { sm: 3 },
                  ml: 4,
                  mt: 0,
                  fontWeight: 400,
                }}
              >
                Efficiently reach ideal customers with automated engagement
                workflows powered by AI.
                {/*Prospect on popular social media sites and discover company
                <br /> connections from any website.*/}
              </Typography>
            </Box>

            <Box className="tw-mb-4">
              <Grid
                className="tw-flex-nowrap"
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <Grid item>
                  <Checkbox
                    defaultChecked
                    sx={{
                      p: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: 30,
                        [theme.breakpoints.up("sm")]: {
                          fontSize: 40,
                        },
                      },
                    }}
                    className="tw-pointer-events-none"
                  />
                  {/*<IconSquareRoundedCheckFilled
                    size={28}
                    strokeWidth={2}
                    color="#fff"
                    fill="#0077b5"
                  />*/}
                </Grid>
                <Grid item>
                  <Typography
                    className="tw-text-[20px] sm:tw-text-[30px]"
                    variant="h4"
                    sx={{ fontWeight: 400, ml: 2 }}
                  >
                    Data-Driven Learning
                    {/*Bulk Lookups*/}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                className="tw-text-[15px] sm:tw-text-[18px] tw-pt-3 tw-leading-[27px]"
                variant="h4"
                sx={{
                  p: { sm: 3 },
                  ml: 4,
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
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TakeControl;
