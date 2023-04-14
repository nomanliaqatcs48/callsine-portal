import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import Playbook from "./components/Playbook";
import Emails from "./components/Emails";
import PersonDetailCard from "./components/PersonDetailCard";
import PersonDetailOrgCard from "./components/PersonDetailOrgCard";
import StatCard from "./components/StatCard";
import { usePersonDetail } from "../../../hooks/persons/usePersonDetail";

const PersonDetailPage = () => {
  const [value, setValue] = React.useState(0);

  let { id, data, setData, isLoading, setIsLoading, getPersonDetail } =
    usePersonDetail();

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
    <MainCard title="Person Detail">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <PersonDetailCard data={data} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <PersonDetailOrgCard data={data} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <StatCard />
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Playbook" {...a11yProps(0)} />
          <Tab label="Emails" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <Playbook />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Emails />}
      </TabPanel>
    </MainCard>
  );
};

export default PersonDetailPage;
