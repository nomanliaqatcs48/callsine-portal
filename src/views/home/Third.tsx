import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Image } from "mui-image";

const Third = () => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid container sx={{ flexDirection: { xs: "row", md: "row-reverse" } }}>
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
            sx={{ fontSize: 42, p: { md: 3 } }}
          >
            Find clients easily on LinkedIn without any technical skills
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
        </Grid>
      </Grid>
    </>
  );
};

export default Third;
