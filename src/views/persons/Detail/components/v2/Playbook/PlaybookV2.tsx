import { MouseEvent, useState } from "react";
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const PlaybookV2 = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container className="tw-p-0">
          <Grid
            item
            xs={5}
            lg={4}
            className="lg:tw-border-[1px] lg:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
          >
            <div className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              {/*title*/}
              <div className="tw-text-[0.95rem] tw-text-black tw-font-medium tw-py-2">
                Playbooks
              </div>
              {/*dropdown*/}
              <div>
                <ReactSelect
                  name="generate-playbook"
                  className="basic-single tw-cursor-pointer"
                  variant="blue"
                  placeholder="GENERATE PLAYBOOK"
                  isClearable={false}
                  isSearchable={false}
                  options={[
                    { label: "Playbook 1", value: 1 },
                    { label: "Playbook 2", value: 2 },
                  ]}
                />
              </div>
            </div>
            <div className="search-container tw-py-3 tw-px-2 xl:tw-py-4 xl:tw-px-5">
              <input
                type="search"
                placeholder="Search"
                onChange={() => null}
                className="tw-bg-[#f8fbff] tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-2.5 tw-px-[1.2rem] tw-outline-none placeholder:tw-text-xs"
              />
            </div>
            <div className="list-container">
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                className="tw-py-0 tw-border-t tw-border-[#e8ecf5]"
              >
                {playbookItems.map((item, idx) => {
                  return (
                    <ListItemButton
                      className="tw-transition-all tw-duration-700 tw-ease-linear"
                      selected={selectedIndex === idx}
                      onClick={(event) => handleListItemClick(event, idx)}
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
                      <Tooltip title={item.subject}>
                        <ListItemText
                          primary={
                            <>
                              <div className="tw-text-black tw-font-light tw-text-right tw-text-[0.70rem]">
                                {item.date}
                              </div>
                              <div className="tw-flex tw-justify-start">
                                <div className="tw-text-black tw-font-semibold tw-truncate tw-mb-1">
                                  {item.subject}{" "}
                                </div>
                                <span className="tw-text-[#db3f3e] tw-font-semibold tw-text-[0.75rem] tw-pl-1">
                                  [Draft]
                                </span>
                              </div>
                            </>
                          }
                          secondary={
                            <>
                              <div className="tw-flex">
                                <div className="tw-w-11/12 tw-truncate tw-text-[#8c9fb7] tw-font-extralight">
                                  {item.msg}
                                </div>
                                <div className="tw-w-1/12 tw-text-right">
                                  <WatchLaterIcon
                                    sx={{ fontSize: 15, color: "#1a76d2" }}
                                  />
                                </div>
                              </div>
                            </>
                          }
                        />
                      </Tooltip>
                    </ListItemButton>
                  );
                })}
              </List>
            </div>
          </Grid>
          <Grid item xs={7} lg={8}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PlaybookV2;
