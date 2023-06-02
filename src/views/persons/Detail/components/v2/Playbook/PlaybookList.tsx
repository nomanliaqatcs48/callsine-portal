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
  const playbookItems = [
    {
      date: "Saturday",
      subject: "Campaign 1",
      msg: "Lorem ipsum ",
    },
    {
      date: "Saturday",
      subject:
        "Campaign Campaign lorem ipsum Campaign lorem ipsum Campaign lorem ipsum Campaign",
      msg: "Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor",
    },
    {
      date: "Saturday",
      subject:
        "Campaign Campaign lorem ipsum Campaign lorem ipsum Campaign lorem ipsum Campaign",
      msg: "Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor",
    },
  ];

  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
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
            setTimeout(() => {
              let _preview: any = document.querySelector(
                `.removeTags_html_${item?.id}`
              );
              let _htmlMsg = item?.html_message;
              if (_htmlMsg) {
                _htmlMsg = _htmlMsg.replace(/\n/g, "");
                _htmlMsg = _htmlMsg.replace(/<br \/>|<br>|<br\/>/gi, "");
                _htmlMsg = _htmlMsg.replace(
                  /<html>|<\/html>|<body>|<\/body>/gi,
                  ""
                );
              }
              if (_preview && _htmlMsg) {
                _preview.innerHTML = xss(_htmlMsg);
              }
            }, 500);

            return (
              <ListItemButton
                key={idx}
                className="tw-transition-all tw-duration-700 tw-ease-linear"
                selected={selectedIndex === idx}
                onClick={(event) => {
                  handleListItemClick(event, idx);
                  setSelectedData(item);
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
                <Tooltip title={item?.subject || `Subject ${idx + 1}`}>
                  <ListItemText
                    primary={
                      <>
                        <div className="tw-text-black tw-font-normal tw-text-right tw-text-[0.70rem] tw-w-full">
                          {item?.created_date
                            ? moment.utc(item.created_date).format("ll")
                            : "Today"}
                        </div>
                        <span className="tw-flex tw-justify-start">
                          <span className="tw-text-black tw-font-semibold tw-truncate tw-mb-1">
                            {item?.subject || `Subject ${idx + 1}`}
                          </span>
                          <span className="tw-text-[#db3f3e] tw-font-semibold tw-text-[0.75rem] tw-pl-1">
                            {_.includes([0, 1, 2, 3], item?.status)
                              ? ""
                              : "[Draft]"}
                          </span>
                        </span>
                      </>
                    }
                    secondary={
                      <>
                        <span className="tw-flex">
                          <span
                            className={`tw-w-11/12 tw-truncate tw-text-[#8c9fb7] tw-font-extralight`}
                          >
                            {item?.text || ""}
                            {item?.html_message && (
                              <span
                                className={`tw-text-[0.875rem] removeTags_html_${item?.id}`}
                              />
                            )}
                          </span>
                          <span className="tw-w-1/12 tw-text-right">
                            {item?.scheduled_time && (
                              <Tooltip title="Scheduled">
                                <WatchLaterIcon
                                  sx={{ fontSize: 15, color: "#1a76d2" }}
                                />
                              </Tooltip>
                            )}
                          </span>
                        </span>
                      </>
                    }
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
