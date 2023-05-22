import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import Playbook from "./components/Playbook";
import Emails from "./components/Emails";
import PersonDetailCard from "./components/PersonDetailCard";
import PersonDetailOrgCard from "./components/PersonDetailOrgCard";
import StatCard from "./components/StatCard";
import { usePersonDetail } from "../../../hooks/persons/usePersonDetail";
import TrackingTab from "../../../ui-component/tabs/TrackingTab";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as LinkedinIcon } from "../../../assets/images/svg/linkedin.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/images/svg/facebook.svg";
import ProfileFirstCol from "./components/ProfileFirstCol";
import ProfileSecondCol from "./components/ProfileSecondCol";

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
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={0} className="tw-p-3 tw-rounded-md">
            <Grid container className="tw-justify-evenly">
              <Grid
                item
                xs={12}
                xl={"auto"}
                className="lg:tw-px-10 xl:tw-flex-col xl:tw-items-center xl:tw-justify-center xl:tw-border-r xl:tw-w-1/2 xl:tw-p-10 2xl:tw-px-16 3xl:tw-w-2/5"
              >
                <ProfileFirstCol data={data} />
              </Grid>
              <Grid item xs={12} className="tw-w-full tw-py-4 xl:tw-hidden">
                <Divider variant="middle" />
              </Grid>
              <Grid
                item
                xs={12}
                xl={"auto"}
                className="xl:tw-p-9 xl:tw-w-1/2 3xl:tw-w-3/5"
              >
                <ProfileSecondCol data={data} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Container className="tw-py-2" />

      {/*<Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <PersonDetailCard data={data} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <PersonDetailOrgCard data={data} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <StatCard />
        </Grid>
      </Grid>*/}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Playbook" {...a11yProps(0)} />
          <Tab label="Emails" {...a11yProps(1)} />
          <Tab label="Tracking" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <Playbook />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Emails />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <TrackingTab />}
      </TabPanel>
    </>
  );
};

export default PersonDetailPage;
