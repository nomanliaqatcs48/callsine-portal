import React from "react";
import { Box, Container, Divider, Grid, Paper, Tab, Tabs } from "@mui/material";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import Emails from "./components/Emails";
import { usePersonDetail } from "../../../hooks/persons/usePersonDetail";
import TrackingTab from "../../../ui-component/tabs/TrackingTab";
import ProfileFirstCol from "./components/ProfileFirstCol";
import ProfileSecondCol from "./components/ProfileSecondCol";
import GoBack from "../../../ui-component/buttons/GoBack";
import PlaybookV2 from "./components/v2/Playbook/PlaybookV2";

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
        <Grid item xs={12} className="tw-py-3">
          <GoBack />
        </Grid>
      </Grid>
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
                <ProfileFirstCol data={data} editMode={false} />
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

      <Box
        className="tw-bg-white tw-px-9 tw-pt-2 tw-pb-4 tw-border-[2px] tw-border-[#f4f4f4] tw-rounded-lg"
        // sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tw-border-b tw-border-[#e8ebf5]"
          sx={{
            "& .MuiTabs-scroller": {
              "& .MuiTabs-flexContainer": {
                "& .MuiButtonBase-root": {
                  "&:hover": {
                    color: "#3485d7",
                  },
                  "&.Mui-selected": {
                    color: "black",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3485d7",
                height: "1px",
              },
            },
          }}
        >
          <Tab
            label="Playbook"
            {...a11yProps(0)}
            className="tw-text-black tw-tracking-wider"
          />
          <Tab
            label="Tracking"
            {...a11yProps(1)}
            className="tw-text-black tw-tracking-wider"
          />
          {/*<Tab
            label="Emails"
            {...a11yProps(1)}
            className="tw-text-black tw-tracking-wider"
          />*/}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {value === 0 && <PlaybookV2 personData={data} />}
        {/*{value === 0 && <Playbook />}*/}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <TrackingTab />}
      </TabPanel>
      {/*<TabPanel value={value} index={1}>
        {value === 1 && <Emails />}
      </TabPanel>*/}
    </>
  );
};

export default PersonDetailPage;
