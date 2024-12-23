import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment-timezone";
import SendEmailNow from "../buttons/SendEmailNow";
import DeletePersonEmail from "../buttons/DeletePersonEmail";
import { useEmailsTab } from "../../hooks/persons/useEmailsTab";
import xss from "xss";
import _ from "lodash";

import { ClickTrackDataTypes } from "src/types/person";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  onLoadApi: any;
}

export default function VerticalTabs({ data, onLoadApi }: VerticalTabsProps) {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = useState<number>(0);
  let countIndexForEmailSubjectAtSidebar: number = 0;
  let countIndexForEmailSubject: number = 0;
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());

  let { id: personId, getEmails, showStatus } = useEmailsTab(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log("EMAIL", data);
  const displayFromEmail = (data: any) => {
    let _headers = data?.headers || [];
    let _from = { name: "From", value: "" };
    _from = _.find(_headers, (o: any) => {
      return o.name === "From";
    });

    return _from?.value;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 500,
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
          let _countSidebar = item?.subject
            ? ""
            : ++countIndexForEmailSubjectAtSidebar;
          return (
            <Tab
              key={idx}
              label={item?.subject ? item?.subject : "Email " + _countSidebar}
              {...a11yProps(idx)}
            />
          );
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
        let _count = item?.subject ? "" : ++countIndexForEmailSubject;
        setTimeout(() => {
          let _preview: any = document.querySelector(`.preview_${item?.id}`);
          let _htmlMsg = item?.html_message || "";
          if (_htmlMsg) {
            _htmlMsg = _htmlMsg.replace(/\n/g, "");
            _htmlMsg = _htmlMsg.replace(
              /<html>|<\/html>|<body>|<\/body>/gi,
              ""
            );
          }
          if (_htmlMsg.toLowerCase() === "none") {
            _htmlMsg = "";
          }
          if (_preview && _htmlMsg) {
            _preview.innerHTML = xss(_htmlMsg, {
              onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                if (name === "style") {
                  // escape its value using built-in escapeAttrValue function
                  // @ts-ignore
                  return name + '="' + xss.escapeAttrValue(value) + '"';
                }
              },
            });
          }
        }, 500);

        return (
          <TabPanel key={idx} value={value} index={idx}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h3">
                  {item?.subject ? item?.subject : "Email " + _count}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction={isLg ? "row" : "column"}
              justifyContent={isLg ? "space-between" : "start"}
              alignItems="center"
            >
              <div>
                <Typography
                  variant="subtitle2"
                  className="tw-flex tw-items-center"
                >
                  <strong>To:&nbsp;</strong>{" "}
                  {item?.to ? (
                    <a href={`mailto:${item?.to}`}>{item?.to}</a>
                  ) : (
                    <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
                  )}
                </Typography>
              </div>
              <div>
                <Tooltip title="Date Created">
                  <Typography variant="subtitle2">
                    {moment(item?.created_date).tz(timezone).format("LLLL")}
                  </Typography>
                </Tooltip>
              </div>
            </Grid>
            <Typography variant="subtitle2" className="tw-flex tw-items-center">
              <strong>From:&nbsp;</strong>{" "}
              {item?.headers ? (
                <a href={`mailto:${displayFromEmail(item)}`}>
                  {displayFromEmail(item)}
                </a>
              ) : (
                <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
              )}
            </Typography>
            <Typography variant="subtitle2" className="tw-flex tw-items-center">
              <strong>Status:&nbsp;</strong>{" "}
              {item?.status !== null ? (
                showStatus(item?.status)
              ) : (
                <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
              )}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Opened:&nbsp;</strong>
              {item?.trackings?.opened ? "Yes" : "No"}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Click Stats:&nbsp;</strong>{" "}
              {item?.click_tracking?.map(
                (data: ClickTrackDataTypes, index: number) => (
                  <div className="tw-ml-2" key={index}>
                    <span>Clicks: {data.click_count} &nbsp;</span>

                    <a href="{data.url}" target="__blank">
                      Link: {data.url}
                    </a>
                  </div>
                )
              )}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Thread ID:&nbsp;</strong> {item?.thread_id}
            </Typography>

            <div style={{ height: 10 }} />

            <Grid container>
              <Grid item xs={12}>
                {/*<textarea className={`preview_${item?.id}`} />*/}
                <div className={`preview_${item?.id}`} />
                {/*<TextField
                  aria-readonly
                  multiline
                  margin="dense"
                  id="html_message"
                  label="Message"
                  type="text"
                  defaultValue={item?.html_message}
                  fullWidth
                  rows={16}
                />*/}
              </Grid>
            </Grid>

            <div style={{ height: 50 }} />

            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  className="tw-flex tw-items-center"
                >
                  <strong>Scheduled Date:&nbsp;</strong>{" "}
                  {item?.scheduled_time ? (
                    moment(item?.scheduled_time).tz(timezone).format("LLLL")
                  ) : (
                    <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
                  )}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              {showStatus(item?.status) !== "Sent" && (
                <SendEmailNow
                  id={item?.id}
                  buttonText="Send Now"
                  variant="outlined"
                  style={{ marginRight: 10 }}
                  onLoadApi={onLoadApi}
                />
              )}

              <DeletePersonEmail
                id={item?.id}
                personId={Number(personId)}
                onLoadApi={() => {
                  onLoadApi();
                  setValue(0);
                }}
                variant="outlined"
              >
                Delete
              </DeletePersonEmail>
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
