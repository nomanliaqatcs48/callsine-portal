import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import ActionBtn from "./components/ActionBtn";
import People from "./components/People";
import Overview from "./components/Overview";
import Emails from "./components/Emails";

const CampaignDetailPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <MainCard title="Campaign Detail">
      <Grid container justifyContent="end" alignItems="center">
        <Grid item>
          <ActionBtn />
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="People" {...a11yProps(1)} />
          <Tab label="Emails" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <Overview />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <People />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <Emails />}
      </TabPanel>
    </MainCard>
  );
};

export default CampaignDetailPage;
