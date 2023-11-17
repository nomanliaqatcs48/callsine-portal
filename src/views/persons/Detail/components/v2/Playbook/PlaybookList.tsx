import ErrorIcon from "@mui/icons-material/ErrorOutline";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { setShowDraft } from "src/store/playbooks/showDraftSlice";

import { MouseEvent, useEffect, useState } from "react";

import _ from "lodash";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

type PlaybookListProps = {
  data: any[];
  selectedIndex: number | null;
  setSelectedIndex: any;
  setSelectedData: any;
  setSelectedSequenceEvent: any;
};

const PlaybookList = ({
  data,
  selectedIndex,
  setSelectedIndex,
  setSelectedData,
  setSelectedSequenceEvent,
}: PlaybookListProps) => {
  let navigate = useNavigate();
  // console.log(data);
  let countIndexForEmailSubject: number = 0;
  const addQueryParam = (playbookNum: number) => {
    navigate({
      pathname: window.location.pathname,
      search: `?playbook=${playbookNum + 1}`,
    });
  };
  useEffect(() => {
    const getQueryParam = (param: string) => {
      const queryParams = new URLSearchParams(window.location.search);
      return queryParams.get(param);
    };

    const playbookValue = getQueryParam("playbook");

    if (data) {
      if (playbookValue) {
        setSelectedIndex(+playbookValue - 1);
        setSelectedData(data[+playbookValue - 1]?.scheduledEmail);
      } else {
        setSelectedIndex(0);
        setSelectedData(data[0]?.scheduledEmail);
      }
    }
  });

  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
    addQueryParam(index);
  };
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());
  const dispatch = useDispatch();

  const subtext = (item: any) => {
    if (item?.status === "generated_email" && item?.promptResponse) {
      let strippedString = item?.promptResponse?.text?.replace(
        /<[^>]*>?/gm,
        " "
      );
      strippedString = strippedString?.replace(/&nbsp;/gm, "");
      const result = strippedString?.trim();

      return (
        <>
          <span className="tw-flex">
            <span className="tw-w-11/12 tw-truncate tw-text-[16px] tw-text-callsineGray tw-font-light tw-tracking-[0.32px]">
              {item?.promptResponse?.text &&
              item?.promptResponse?.text?.toLowerCase() !== "none"
                ? result
                : ""}
              {item?.promptResponse && (
                <span
                  className={`tw-text-[0.875rem] removeTags_html_${item?.id}`}
                />
              )}
            </span>
            <span className="tw-w-1/12 tw-text-right">
              {item?.scheduledEmail?.scheduled_time && (
                <Tooltip title="Scheduled">
                  <WatchLaterIcon sx={{ fontSize: 15, color: "#1a76d2" }} />
                </Tooltip>
              )}
            </span>
          </span>
        </>
      );
    } else if (item?.status === "scheduled" && item?.scheduledEmail) {
      let strippedString = item?.scheduledEmail?.html_message?.replace(
        /<[^>]*>?/gm,
        " "
      );
      strippedString = strippedString?.replace(/&nbsp;/gm, "");
      const result = strippedString?.trim();

      let isSent: boolean = false;
      let isFailed: boolean = false;

      if (item?.scheduledEmail?.status === 0) {
        isSent = true;
      } else if (item?.scheduledEmail?.status === 1) {
        isFailed = true;
      }

      return (
        <>
          <span className="tw-flex">
            <span className="tw-w-11/12 tw-truncate tw-text-[16px] tw-text-callsineGray tw-font-light tw-tracking-[0.32px]">
              {item?.scheduledEmail?.text || ""}
              {
                item?.scheduledEmail?.html_message &&
                item?.scheduledEmail?.html_message.toLowerCase() !== "none"
                  ? result
                  : ""
                // <span
                //     className={`tw-text-[0.875rem] removeTags_html_${item?.id}`}
                //   />
              }
            </span>
            <span className="tw-w-1/12 tw-text-right">
              {item?.scheduledEmail?.scheduled_time && (
                <>
                  {isSent ? (
                    <Tooltip title="Sent">
                      <MarkEmailReadOutlinedIcon
                        sx={{ fontSize: 15, color: "#1a76d2" }}
                      />
                    </Tooltip>
                  ) : isFailed ? (
                    <Tooltip title="Failed">
                      <ErrorIcon sx={{ fontSize: 15, color: "red" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Scheduled">
                      <WatchLaterIcon sx={{ fontSize: 15, color: "#1a76d2" }} />
                    </Tooltip>
                  )}
                </>
              )}
            </span>
          </span>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <>
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        className="tw-py-0 tw-border-t tw-border-[#e8ecf5]"
      >
        {data?.length > 0 &&
          data.map((item: any, idx: any) => {
            let _count = item?.scheduledEmail?.subject
              ? ""
              : ++countIndexForEmailSubject;
            return (
              <ListItemButton
                key={idx}
                className="tw-transition-all tw-duration-700 tw-ease-linear"
                selected={selectedIndex === idx}
                onClick={(event) => {
                  dispatch(setShowDraft(false));
                  handleListItemClick(event, idx);
                  if (item?.status === "generated_email") {
                    setSelectedData(item?.promptResponse);
                  } else {
                    setSelectedData(item?.scheduledEmail);
                  }
                  setSelectedSequenceEvent(item);
                }}
                sx={{
                  borderBottom: "1px solid #e8ecf5",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 150, 199, 0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 150, 199, 0.1)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      borderLeft: "8px solid #0096c7",
                      height: "100%",
                      left: 0,
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#f2fafc",
                  },
                }}
              >
                <Tooltip
                  title={
                    item?.scheduledEmail?.subject
                      ? item?.scheduledEmail?.position !== null
                        ? `${item?.scheduledEmail?.subject} (${item?.scheduledEmail?.position})`
                        : item?.scheduledEmail?.subject
                      : `Email ${_count}`
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        <div className="tw-text-black tw-font-normal tw-text-right tw-text-[14px] tw-tracking-[0.28px] tw-w-full">
                          {item?.scheduledEmail?.scheduled_time &&
                          _.includes(
                            [0, 1, 2, 3],
                            item?.scheduledEmail?.status
                          ) ? (
                            <Box className="tw-mb-[10px]">
                              {moment(item?.scheduledEmail?.scheduled_time)
                                .tz(timezone)
                                .format("lll")}
                            </Box>
                          ) : (
                            <span className="tw-invisible">This is hidden</span>
                          )}
                        </div>
                        <span className="tw-flex tw-justify-start">
                          <span className="tw-text-black tw-font-medium tw-text-[18px] tw-tracking-[0.36px] tw-truncate tw-mb-1">
                            {console.log(item)}
                            {item?.scheduledEmail?.subject
                              ? item?.scheduledEmail?.subject?.includes(
                                  "Subject Line: "
                                )
                                ? item?.scheduledEmail?.subject?.replace(
                                    /Subject Line: /gi,
                                    ""
                                  )
                                : item?.scheduledEmail?.subject
                              : `Email ${item?.position}`}
                          </span>
                          <span className="tw-text-callsineRed tw-font-medium tw-text-[14px] tw-tracking-[0.28px] tw-pl-1">
                            {_.includes(item?.status, "scheduled") &&
                            _.includes(
                              [0, 1, 2, 3],
                              item?.scheduledEmail?.status
                            )
                              ? ""
                              : "[Draft]"}
                          </span>
                        </span>
                      </>
                    }
                    secondary={subtext(item)}
                  />
                </Tooltip>
              </ListItemButton>
            );
          })}
      </List>
    </>
  );
};

export default PlaybookList;
