import React from "react";
import {
  Button,
  Grid,
  Link,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";

const Fourth = () => {
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
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              align="center"
              textTransform="uppercase"
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              They know us better than we do
            </Typography>
          </div>
          <div style={{ height: 20 }} />
          <div>
            <Typography
              align="center"
              textTransform="uppercase"
              sx={{
                fontSize: { xs: 26, sm: 42 },
                fontWeight: 600,
              }}
            >
              Happy customers ❤️
            </Typography>
          </div>
          <div style={{ height: 20 }} />
          <div>
            <Rating
              name="read-only"
              value={5}
              size="large"
              readOnly
              sx={{ fontSize: "2.875rem" }}
            />
          </div>
          <div style={{ height: 20 }} />
          <div style={{ fontSize: 18, fontWeight: 400 }}>
            <strong>5/5</strong> on Google Chrome Store
          </div>
          <div style={{ height: 15 }} />
          <div>
            <Link
              href="https://chrome.google.com/webstore/detail/callsine/adfdjhchgaagmbpiobdijaemefkdkndm"
              underline="hover"
              sx={{ fontSize: 14, fontWeight: 400 }}
            >
              See all reviews
            </Link>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Fourth;
