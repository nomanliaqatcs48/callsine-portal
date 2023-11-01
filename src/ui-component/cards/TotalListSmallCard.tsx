import { Box, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import SmallWhiteBlue from "../../assets/images/bg/small-white-blue.jpg";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalListSmall from "../../ui-component/cards/Skeleton/TotalListSmallCard";
import TooltipComponent from "../tour/Tooltip";

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
    // height: 210,
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
  isLoading: boolean; // Property 'isLoading' with a boolean type
  value: {
    scheduled_today: string | number;
    sent_today: string | number;
    all_scheduled: string | number;
    unscheduled: string | number;
  };
  text: string; // Property 'text' with a string type
  handleFilterByUnscheduled?: any;
  handleFilterByAllScheduled?: any;
  handleFilterBySchedToday?: any;
  handleLastContacted?: any;
};

const TotalListSmallCard = ({
  isLoading,
  value,
  text,
  handleFilterByUnscheduled,
  handleFilterByAllScheduled,
  handleFilterBySchedToday,
  handleLastContacted,
}: TotalListSmallCardTypes) => {
  const theme: any = useTheme();

  const handleOnClickUnSched = () => {
    handleFilterByUnscheduled();
  };

  const handleOnClickAllSched = () => {
    handleFilterByAllScheduled();
  };

  const handleOnClickSchedToday = () => {
    handleFilterBySchedToday();
  };

  const handleOnClickLastContacted = () => {
    handleLastContacted();
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalListSmall />
      ) : (
        <TooltipComponent
          text={
            "Click on the numbers to filter the People table to get a quick view of what is happening."
          }
        >
          <CardWrapper
            border={false}
            content={false}
            sx={{
              backgroundImage: `url(${SmallWhiteBlue})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              border: "2px solid white", // Add a white border around the card
              position: "relative", // Set the position property to relative
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
                <Box sx={{ p: 1, px: 2, py: 1, pt: 3 }}>
                  <Typography
                    className={`tw-font-medium tw-text-[30px] tw-tracking-[0.8px] ${
                      value.scheduled_today === null ||
                      value.scheduled_today === 0
                        ? "tw-cursor-not-allowed"
                        : "tw-cursor-pointer"
                    } transition-color duration-300 z-99`}
                    onClick={() => {
                      if (
                        value.scheduled_today !== null &&
                        value.scheduled_today !== 0
                      ) {
                        handleOnClickSchedToday();
                      }
                    }}
                  >
                    {value.scheduled_today ? value.scheduled_today : 0}
                  </Typography>
                  <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                    Scheduled Today
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box sx={{ p: 1, px: 2, py: 1, pt: 3 }}>
                  <Typography
                    className={`tw-font-medium tw-text-[30px] tw-tracking-[0.8px] ${
                      value.sent_today === null || value.sent_today === 0
                        ? "tw-cursor-not-allowed"
                        : "tw-cursor-pointer"
                    } transition-color duration-300 z-99`}
                    onClick={() => {
                      if (value.sent_today !== null && value.sent_today !== 0) {
                        handleOnClickLastContacted();
                      }
                    }}
                  >
                    {value.sent_today ? value.sent_today : 0}
                  </Typography>
                  <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                    Sent Today
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box sx={{ p: 1, px: 2, py: 1 }}>
                  <Typography
                    className={`tw-font-medium tw-text-[30px] tw-tracking-[0.8px] ${
                      value.all_scheduled === null || value.all_scheduled === 0
                        ? "tw-cursor-not-allowed"
                        : "tw-cursor-pointer"
                    } transition-color duration-300 z-99`}
                    onClick={() => {
                      if (
                        value.all_scheduled !== null &&
                        value.all_scheduled !== 0
                      ) {
                        handleOnClickAllSched();
                      }
                    }}
                  >
                    {value.all_scheduled ? value.all_scheduled : 0}
                  </Typography>
                  <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                    All Scheduled
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box sx={{ p: 1, px: 2, pb: 3 }}>
                  <Typography
                    className={`tw-font-medium tw-text-[30px] tw-tracking-[0.8px] ${
                      value.unscheduled === null || value.unscheduled === 0
                        ? "tw-cursor-not-allowed"
                        : "tw-cursor-pointer"
                    } transition-color duration-300 z-99`}
                    onClick={() => {
                      if (
                        value.unscheduled !== null &&
                        value.unscheduled !== 0
                      ) {
                        handleOnClickUnSched();
                      }
                    }}
                  >
                    {value.unscheduled ? value.unscheduled : 0}
                  </Typography>
                  <Typography className="tw-text-[12px] tw-tracking-[0.36px] tw-font-light tw-text-white">
                    Unscheduled
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardWrapper>
        </TooltipComponent>
      )}
    </>
  );
};

export default TotalListSmallCard;
