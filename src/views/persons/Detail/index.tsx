import { Box, Container, Divider, Grid, Paper, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { usePersonDetail } from "../../../hooks/persons/usePersonDetail";
import GoBack from "../../../ui-component/buttons/GoBack";
import TabPanel from "../../../ui-component/tabs/TabPanel";
import TrackingTab from "../../../ui-component/tabs/TrackingTab";
import Emails from "./components/Emails";
import ProfileFirstCol from "./components/ProfileFirstCol";
import ProfileSecondCol from "./components/ProfileSecondCol";
import PlaybookV2 from "./components/v2/Playbook/PlaybookV2";
import CustomFieldsTab from "../../../ui-component/tabs/CustomFieldsTab";
import EmailThread from "./components/EmailThread";

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

      <Box className="tw-py-2" />

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
            className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-black"
          />
          <Tab
            label="Emails"
            {...a11yProps(1)}
            className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-black"
          />
          <Tab
            label="Tracking"
            {...a11yProps(2)}
            className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-black"
          />
          <Tab
            label="Custom Fields"
            {...a11yProps(3)}
            className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-black"
          />
          <Tab
            label="Email Threads"
            {...a11yProps(4)}
            className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-black"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/*{value === 0 && <PlaybookV2 />}*/}
        {value === 0 && <PlaybookV2 personData={data} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Emails />}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {value === 2 && <TrackingTab />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {value === 3 && <CustomFieldsTab data={data} />}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {value === 4 && <EmailThread />}
      </TabPanel>
    </>
  );
};

export default PersonDetailPage;
