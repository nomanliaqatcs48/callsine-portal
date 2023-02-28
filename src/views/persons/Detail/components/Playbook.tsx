import React from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

const Playbook = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs />
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Sales Pitch
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Paper>

        <div style={{ height: 15 }} />

        <Paper elevation={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Follow up
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Playbook;
