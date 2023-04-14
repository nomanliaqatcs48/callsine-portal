import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";

type PersonDetailOrgCardTypes = {
  data: any;
};

const PersonDetailOrgCard = ({ data }: PersonDetailOrgCardTypes) => {
  return (
    <>
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Organization
            </Typography>
            <Typography color="text.secondary">{data?.org?.name}</Typography>
            <Typography variant="h6" color="text.secondary">
              Domain: {data?.org?.domain}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Revenue Range: {data?.org?.revenue_range}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Employee Count: {data?.org?.employee_count}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              SIC: {data?.org?.sic}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              SIC Description: {data?.org?.sic_description}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              NAICS: {data?.org?.naics}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              NAICS Description: {data?.org?.naics_description}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Industry: {data?.org?.industry}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default PersonDetailOrgCard;
