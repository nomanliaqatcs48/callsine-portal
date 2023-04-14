import React from "react";
import { usePersonStats } from "../../../../hooks/persons/usePersonStats";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

const StatCard = () => {
  let {
    id,
    personStatData,
    setPersonStatData,
    isLoading,
    setIsLoading,
    getPersonDetailStat,
  } = usePersonStats();

  const StatItem = ({ header, children }: any) => {
    return (
      <Grid item xs={12} md={4}>
        <Typography variant="h6" color="text.secondary" align="center">
          {header}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center">
          {children}
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Stats
            </Typography>
            <Grid container spacing={2}>
              <StatItem header="Emails Sent">
                {personStatData?.emails_sent}
              </StatItem>
              <StatItem header="Opened">{personStatData?.opened}</StatItem>
              <StatItem header="Clicked">{personStatData?.clicked}</StatItem>
              <StatItem header="Replied">{personStatData?.replied}</StatItem>
              <StatItem header="Pageviews">
                {personStatData?.pageviews}
              </StatItem>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default StatCard;
