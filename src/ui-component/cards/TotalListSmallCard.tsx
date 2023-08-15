import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";

import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalListSmall from "../../ui-component/cards/Skeleton/TotalListSmallCard";
import SmallWhiteBlue from "../../assets/images/bg/small-white-blue.jpg";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  // backgroundColor: theme.palette.primary.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    // opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //
type TotalListSmallCardTypes = {
  isLoading: boolean;
  value: string | number;
  text: string;
};

const TotalListSmallCard = ({
  isLoading,
  value,
  text,
}: TotalListSmallCardTypes) => {
  const theme: any = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalListSmall />
      ) : (
        <CardWrapper
          border={false}
          content={false}
          sx={{
            backgroundImage: `url(${SmallWhiteBlue})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className="tw-z-50">
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                      className="tw-font-medium tw-text-[40px] tw-tracking-[0.8px] tw-text-white"
                    >
                      {value}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }} className="tw-z-50">
                <Typography className="tw-text-[18px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                  {text}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalListSmallCard;
