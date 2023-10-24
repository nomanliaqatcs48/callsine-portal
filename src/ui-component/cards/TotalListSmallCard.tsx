import { Box, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import SmallWhiteBlue from "../../assets/images/bg/small-white-blue.jpg";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalListSmall from "../../ui-component/cards/Skeleton/TotalListSmallCard";

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
            border: "2px solid white", // Add a white border around the card
          }}
        >
          <Grid
            container
            style={{
              height: "100%", // Ensure the container takes up the full height of the card
              borderLeft: "2px solid white", // Add a vertical white border
              borderTop: "2px solid white", // Add a horizontal white border
            }}
          >
            <Grid item xs={6} sm={6}>
              {" "}
              {/* Adjust grid item for top-left quadrant */}
              <Box sx={{ p: 1, px: 2, py: 1, pt: 3 }}>
                <Typography className="tw-font-medium tw-text-[30px] tw-tracking-[0.8px] tw-text-white">
                  53
                </Typography>
                <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                  Scheduled Today
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box sx={{ p: 1, px: 2, py: 1, pt: 3 }}>
                <Typography className="tw-font-medium tw-text-[30px] tw-tracking-[0.8px] tw-text-white">
                  22
                </Typography>
                <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                  Sent Today
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box sx={{ p: 1, px: 2, py: 1 }}>
                <Typography className="tw-font-medium tw-text-[30px] tw-tracking-[0.8px] tw-text-white">
                  530
                </Typography>
                <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                  All Scheduled
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box sx={{ p: 1, px: 2, pb: 3 }}>
                <Typography className="tw-font-medium tw-text-[30px] tw-tracking-[0.8px] tw-text-white">
                  210
                </Typography>
                <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                  Unscheduled
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalListSmallCard;
