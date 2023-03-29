import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import Overview from "./components/Overview";
import Playbook from "./components/Playbook";
import Emails from "./components/Emails";

const PersonDetailPage = () => {
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
    <MainCard title="Person Detail">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Playbook" {...a11yProps(1)} />
          <Tab label="Emails" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <Overview />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Playbook />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <Emails />}
      </TabPanel>
    </MainCard>
  );
};

export default PersonDetailPage;
