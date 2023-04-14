import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
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
              {data?.linkedin && (
                <Tooltip title="Linkedin">
                  <IconButton
                    aria-label="linkedin"
                    onClick={() => {
                      window.open(data?.linkedin, "_blank");
                    }}
                  >
                    <IconBrandLinkedin
                      size={25}
                      strokeWidth={2}
                      color="#fff"
                      fill="#0077b5"
                    />
                  </IconButton>
                </Tooltip>
              )}
              {data?.work_email && (
                <Tooltip title="Work Email">
                  <IconButton
                    aria-label="work email"
                    onClick={() => {
                      window.open(`mailto:${data?.work_email}`, "_blank");
                    }}
                  >
                    <IconLink size={20} strokeWidth={2} color="black" />
                  </IconButton>
                </Tooltip>
              )}
              {data?.personal_email && (
                <Tooltip title="Personal Email">
                  <IconButton
                    aria-label="personal email"
                    onClick={() => {
                      window.open(`mailto:${data?.personal_email}`, "_blank");
                    }}
                  >
                    <IconLink size={20} strokeWidth={2} color="black" />
                  </IconButton>
                </Tooltip>
              )}
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
