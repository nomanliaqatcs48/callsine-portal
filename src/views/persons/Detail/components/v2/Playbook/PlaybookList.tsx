import { List, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { MouseEvent, useState } from "react";

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
                        <span className="tw-text-black tw-font-normal tw-text-right tw-text-[0.70rem]">
                          {item?.date || "Today"}
                        </span>
                        <span className="tw-flex tw-justify-start">
                          <span className="tw-text-black tw-font-semibold tw-truncate tw-mb-1">
                            {item?.subject || `Subject ${idx + 1}`}
                          </span>
                          <span className="tw-text-[#db3f3e] tw-font-semibold tw-text-[0.75rem] tw-pl-1">
                            [Draft]
                          </span>
                        </span>
                      </>
                    }
                    secondary={
                      <>
                        <span className="tw-flex">
                          <span className="tw-w-11/12 tw-truncate tw-text-[#8c9fb7] tw-font-extralight">
                            {item?.text || ""}
                          </span>
                          <span className="tw-w-1/12 tw-text-right">
                            <Tooltip title="Scheduled">
                              <WatchLaterIcon
                                sx={{ fontSize: 15, color: "#1a76d2" }}
                              />
                            </Tooltip>
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
