import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";

import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalListSmall from "../../ui-component/cards/Skeleton/TotalListSmallCard";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
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
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
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
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className="tw-z-50">
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 600,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {value}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }} className="tw-z-50">
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    // color: theme.palette.primary[200],
                  }}
                >
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
