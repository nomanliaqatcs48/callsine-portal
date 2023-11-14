import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { MouseEvent } from "react";
import { useTour } from "src/providers/tourprovider";
import TooltipComponent from "src/ui-component/tour/Tooltip";

type PlaybookListProps = {
  data: any[];
  selectedIndex: number | null;
  setSelectedIndex: any;
  setSelectedData: any;
  setPromptList?: any;
};

type PlaybookTypes = {
  name: string;
  subtext: string;
  prompts: any[];
};

const PlaybookList = ({
  data,
  selectedIndex,
  setSelectedIndex,
  setSelectedData,
  setPromptList,
}: PlaybookListProps) => {
  const { isTourActive } = useTour();
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
            className={`tw-w-11/12 tw-truncate tw-text-callsineGray tw-text-[16px] tw-font-light`}
          >
            {item?.message && item?.message.toLowerCase() !== "none"
              ? result
              : ""}
          </span>
        </span>
      </>
    );
  };
  console.log("Furqan Data", data);

  return (
    <>
      <TooltipComponent
        text={
          "Click on a Playbook from this list to view the Prompts associated with it."
        }
      >
        <List
          sx={{
            border: isTourActive ? 2 : 0,
            boxShadow: isTourActive ? 20 : 0,
          }}
          component="nav"
          aria-label="secondary mailbox folder"
          className="tw-py-0 tw-border-t tw-border-[#e8ecf5]"
        >

          {data?.length > 0 &&
            data.map((playbook: PlaybookTypes, idx: any) => {
              return (
                <ListItemButton
                  key={idx}
                  className="tw-transition-all tw-duration-700 tw-ease-linear"
                  selected={selectedIndex === idx}
                  onClick={(event) => {
                    handleListItemClick(event, idx);
                    setSelectedData(playbook);
                    setPromptList(playbook.prompts);
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
                  <Tooltip title={playbook?.name || ""}>
                    <ListItemText
                      primary={
                        <>
                          <Box
                            component={"span"}
                            className="tw-flex tw-justify-start"
                          >
                            <Box
                              component={"span"}
                              className="tw-text-black tw-font-medium tw-text-[18px] tw-leading-[27px] tw-truncate tw-tracking-[0.36px] tw-mb-1"
                            >
                              {playbook?.name || ""}
                            </Box>
                          </Box>
                        </>
                      }
                      // secondary={subtext(item)}
                      // secondary={subtext({
                      //   message: "This is a sample sub text",
                      // })}
                    />
                  </Tooltip>
                </ListItemButton>
              );
            })}
        </List>
      </TooltipComponent>
    </>
  );
};

export default PlaybookList;
