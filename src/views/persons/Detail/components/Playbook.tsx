import React from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

const Playbook = () => {
  const RenderCard = ({ header, content }: any) => {
    return (
      <Paper elevation={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {header}
            </Typography>
            <Typography variant="body2">{content}</Typography>
          </CardContent>
        </Card>
      </Paper>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs />
      <Grid item xs={6}>
        <RenderCard
          header="Sales Pitch"
          content={
            <>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </>
          }
        />

        <div style={{ height: 15 }} />

        <RenderCard
          header="Follow up"
          content={
            <>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </>
          }
        />
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Playbook;
