import React from "react";
import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePersonTracking } from "../../hooks/persons/usePersonTracking";
import moment from "moment";

const TrackingTab = () => {
  let {
    id,
    trackingData,
    setTrackingData,
    isLoading,
    setIsLoading,
    getPersonDetailTracking,
  } = usePersonTracking();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <nav aria-label="tracking data">
            <List>
              {!isLoading?.onPage &&
                trackingData.map((o: any, idx: number) => {
                  return (
                    <ListItem disablePadding key={idx}>
                      <ListItemButton>
                        {/*<ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>*/}
                        <ListItemText
                          primary={
                            <>
                              <Typography color="text.secondary" variant="h6">
                                {o?.duration}
                              </Typography>
                              <Typography
                                variant="h4"
                                color="text.secondary"
                                sx={{ fontWeight: 600 }}
                              >
                                {o?.page_title}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Link
                                href={o?.url}
                                color="inherit"
                                underline="hover"
                              >
                                {o?.url}
                              </Link>
                              <Typography color="text.secondary" variant="h6">
                                {moment(o?.timestamp).format("LLLL")}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </nav>
        </Grid>
      </Grid>
    </>
  );
};

export default TrackingTab;
