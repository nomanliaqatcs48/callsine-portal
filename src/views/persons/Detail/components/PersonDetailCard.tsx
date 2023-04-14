import React from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { IconBrandLinkedin, IconLink } from "@tabler/icons-react";

type PersonDetailCardTypes = {
  data: any;
};

const PersonDetailCard = ({ data }: PersonDetailCardTypes) => {
  return (
    <>
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Typography variant="h2" align="center" color="text.secondary">
              {data?.first_name} {data?.last_name}
            </Typography>
            <Typography variant="body2" align="center">
              {data?.job_title}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconBrandLinkedin
                size={32}
                strokeWidth={2}
                color="#fff"
                fill="#0077b5"
              />
              <IconLink size={20} strokeWidth={2} color="black" />
              <IconLink size={20} strokeWidth={2} color="black" />
            </div>
            <div>
              <Typography variant="h6" align="center" color="text.secondary">
                Email Domain: {data?.email_domain}
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary">
                City: {data?.city}
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary">
                State: {data?.state}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default PersonDetailCard;
