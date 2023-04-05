import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment/moment";
import SendEmailNow from "../buttons/SendEmailNow";
import DeletePersonEmail from "../buttons/DeletePersonEmail";
import { useEmailsTab } from "../../hooks/persons/useEmailsTab";
import xss from "xss";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface VerticalTabsProps {
  data: any;
}

export default function VerticalTabs({ data }: VerticalTabsProps) {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = useState<number>(0);

  let { id: personId, getEmails, showStatus } = useEmailsTab(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: 250,
          minWidth: 250,
          textAlign: "left",
          float: "left",
        }}
      >
        {data.map((item: any, idx: number) => {
          return <Tab label={item?.subject} {...a11yProps(idx)} />;
        })}
        {/*<Tab
          label={
            <>
              Item One asdsad asd asd asd asdasdas.d asdasdasdsadh asdhasdjns
              asdasd askjdhasjdhkasdas basdasd jebnv== kenvilar
            </>
          }
          {...a11yProps(0)}
          style={{ textAlign: "left", float: "left" }}
        />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />*/}
      </Tabs>
      {data.map((item: any, idx: number) => {
        setTimeout(() => {
          let _preview: any = document.querySelector(`.preview_${item?.id}`);
          let _htmlMsg = item?.html_message;
          if (_preview && _htmlMsg) {
            _preview.innerHTML = xss(_htmlMsg);
          }
        }, 500);

        console.log("isLg", isLg);

        return (
          <TabPanel value={value} index={idx}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h3">{item?.subject}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction={isLg ? "row" : "column"}
              justifyContent={isLg ? "space-between" : "start"}
              alignItems="center"
            >
              <div>
                <Typography variant="subtitle2">
                  <strong>To:</strong>{" "}
                  {item?.to ? (
                    <a href={`mailto:${item?.to}`}>{item?.to}</a>
                  ) : (
                    ""
                  )}
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2">
                  {moment.utc(item?.created_date).format("LLLL")}
                </Typography>
              </div>
            </Grid>
            <Typography variant="subtitle2">
              <strong>Status:</strong> {showStatus(item?.status)}
            </Typography>

            <div style={{ height: 10 }} />

            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2" className={`preview_${item?.id}`} />
              </Grid>
            </Grid>

            <div style={{ height: 50 }} />

            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  <strong>Scheduled Time:</strong>{" "}
                  {moment(item?.scheduled_time).format("LLLL")}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              {showStatus(item?.status) === "Queued" && (
                <SendEmailNow
                  id={item?.id}
                  buttonText="Send Now"
                  variant="outlined"
                  style={{ marginRight: 10 }}
                />
              )}

              <DeletePersonEmail
                buttonText="Delete"
                id={item?.id}
                personId={Number(personId)}
                onLoadApi={getEmails}
                variant="outlined"
              />
            </Grid>
          </TabPanel>
        );
      })}
      {/*<TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>*/}
    </Box>
  );
}
