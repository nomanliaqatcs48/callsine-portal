import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalOrderCard from "../../ui-component/cards/Skeleton/EarningCard";

// assets
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconHandClick, IconUsers } from "@tabler/icons-react";
import { usePersons } from "../../views/persons/hooks/usePersons";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary.dark,
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

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

type TotalPersonsCardTypes = {
  isLoading: boolean;
};

const TotalPersonsCard = ({ isLoading }: TotalPersonsCardTypes) => {
  const theme: any = useTheme();

  const {
    personsData,
    setPersonsData,
    total,
    setTotal,
    filters,
    setFilters,
    getPeople,
  } = usePersons();

  return (
    <>
      {isLoading ? (
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
                      <IconUsers size={20} strokeWidth={2} color="white" />
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
                      {total}
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
                  Total Persons
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalPersonsCard;
