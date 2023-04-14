import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconSelect } from "@tabler/icons-react";

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
              Industry: {data?.org?.industry}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              SIC{" "}
              <Tooltip
                disableFocusListener
                title={
                  <>
                    <span>{data?.org?.sic}</span>
                    <br />
                    <span>Description: {data?.org?.sic_description}</span>
                  </>
                }
              >
                <IconButton aria-label="work email" size="small">
                  <IconSelect size={17} stroke={1.5} />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              NAICS{" "}
              <Tooltip
                disableFocusListener
                title={
                  <>
                    <span>{data?.org?.naics}</span>
                    <br />
                    <span>Description: {data?.org?.naics_description}</span>
                  </>
                }
              >
                <IconButton aria-label="work email" size="small">
                  <IconSelect size={17} stroke={1.5} />
                </IconButton>
              </Tooltip>
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default PersonDetailOrgCard;
