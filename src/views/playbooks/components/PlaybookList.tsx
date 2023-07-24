import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { MouseEvent } from "react";

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
  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  const subtext = (item: any) => {
    let strippedString = item?.message.replace(/<[^>]*>?/gm, " ");
    strippedString = strippedString?.replace(/&nbsp;/gm, "");
    const result = strippedString.trim();

    return (
      <>
        <span className="tw-flex">
          <span
            className={`tw-w-11/12 tw-truncate tw-text-[#778da9] tw-font-extralight`}
          >
            {item?.message && item?.message.toLowerCase() !== "none"
              ? result
              : ""}
          </span>
        </span>
      </>
    );
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
                <Tooltip title={item?.name || ""}>
                  <ListItemText
                    primary={
                      <>
                        <Box
                          component={"span"}
                          className="tw-flex tw-justify-start"
                        >
                          <Box
                            component={"span"}
                            className="tw-text-black tw-font-semibold tw-truncate tw-mb-1"
                          >
                            {item?.name || ""}
                          </Box>
                        </Box>
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
