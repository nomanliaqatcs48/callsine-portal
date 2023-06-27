import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalOrderCard from "../../ui-component/cards/Skeleton/EarningCard";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    zIndex: 1,
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
    zIndex: 1,
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

const TotalScheduledEmailsCard = ({ isLoading, value }: any) => {
  const theme: any = useTheme();

  return (
    <>
      {isLoading?.onPage ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1,
                      }}
                    >
                      <WatchLaterIcon sx={{ color: "white", fontSize: 20 }} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
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
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.primary[200],
                  }}
                >
                  Scheduled Emails
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalScheduledEmailsCard;
