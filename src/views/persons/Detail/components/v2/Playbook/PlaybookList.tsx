import { List, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { MouseEvent, useState } from "react";
import { devLog } from "../../../../../../helpers/logs";
import xss from "xss";
import { useEmailsTab } from "../../../../../../hooks/persons/useEmailsTab";
import moment from "moment";
import _ from "lodash";

type PlaybookListProps = {
  data: any[];
  selectedIndex: number | null;
  setSelectedIndex: any;
  setSelectedData: any;
};

const PlaybookList = ({
  data,
  selectedIndex,
  setSelectedIndex,
  setSelectedData,
}: any) => {
  let countIndexForEmailSubject: number = 0;
  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  const subtext = (item: any) => {
    if (item.status === "generated_email" && item?.promptResponse) {
      return (
        <>
          <span className="tw-flex">
            <span
              className={`tw-w-11/12 tw-truncate tw-text-[#8c9fb7] tw-font-extralight`}
            >
              {item?.promptResponse?.text || ""}
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
    } else if (item.status === "scheduled" && item?.scheduledEmail) {
      const strippedString = item?.scheduledEmail?.html_message.replace(
        /<[^>]*>?/gm,
        ""
      );
      const result = strippedString.trim();
      return (
        <>
          <span className="tw-flex">
            <span
              className={`tw-w-11/12 tw-truncate tw-text-[#8c9fb7] tw-font-extralight`}
            >
              {item?.scheduledEmail?.text || ""}
              {
                item?.scheduledEmail?.html_message && result
                // <span
                //     className={`tw-text-[0.875rem] removeTags_html_${item?.id}`}
                //   />
              }
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
                  handleListItemClick(event, idx);
                  if (item?.status === "generated_email") {
                    setSelectedData(item?.promptResponse);
                  } else {
                    setSelectedData(item?.scheduledEmail);
                  }
                }}
                sx={{
                  borderBottom: "1px solid #e8ecf5",
                  "&.Mui-selected": {
                    backgroundColor: "#f2fafc",
                    "&:hover": {
                      backgroundColor: "#f2fafc",
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
                  title={item?.scheduledEmail?.subject || `Email ${_count}`}
                >
                  <ListItemText
                    primary={
                      <>
                        <div className="tw-text-black tw-font-normal tw-text-right tw-text-[0.70rem] tw-w-full">
                          {item?.scheduledEmail?.scheduled_time &&
                          _.includes(
                            [0, 1, 2, 3],
                            item?.scheduledEmail?.status
                          ) ? (
                            moment(item?.scheduledEmail?.scheduled_time).format(
                              "lll"
                            )
                          ) : (
                            <span className="tw-invisible">This is hidden</span>
                          )}
                        </div>
                        <span className="tw-flex tw-justify-start">
                          <span className="tw-text-black tw-font-semibold tw-truncate tw-mb-1">
                            {item?.scheduledEmail?.subject || `Email ${_count}`}
                          </span>
                          <span className="tw-text-[#db3f3e] tw-font-semibold tw-text-[0.75rem] tw-pl-1">
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
