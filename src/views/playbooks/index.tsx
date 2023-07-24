import { Box, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { devLog } from "../../helpers/logs";
import ReactSelect from "../../ui-component/dropdowns/ReactSelect";
import PlaybookList from "./components/PlaybookList";
import _ from "lodash";
import ViewPlaybook from "../../ui-component/pages/playbooks/ViewPlaybook";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";
import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";

const PlaybooksPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedSequenceEvent, setSelectedSequenceEvent] = useState<any>(null);

  return (
    <>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container className="tw-p-0">
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
          >
            <Box className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              <Box className="tw-text-[0.95rem] tw-text-black tw-font-medium tw-py-2">
                Playbook
              </Box>
              <Box className="tw-w-full tw-flex tw-justify-center xl:tw-justify-end">
                <CreateOrEditPlaybook
                  onClick={() => null}
                  variant="contained"
                  color="primary"
                  className="tw-bg-[#1a76d2] tw-text-[11px] tw-text-white tw-px-[15px] tw-py-[10px] tw-rounded-md tw-uppercase"
                >
                  Add Prompt
                </CreateOrEditPlaybook>
              </Box>
            </Box>
            <Box className="search-container tw-py-3 tw-px-2 xl:tw-py-4 xl:tw-px-5" />
            <Box className="list-container">
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                data={
                  _.orderBy(
                    [
                      {
                        name: "Playbook 1",
                        message:
                          "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
                        position: "1",
                      },
                      {
                        name: "Playbook 2",
                        message:
                          "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
                        position: "2",
                      },
                    ],
                    ["position"],
                    ["asc"]
                  )
                    ? [
                        ..._.orderBy(
                          [
                            {
                              name: "Playbook 1",
                              message:
                                "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
                              position: "1",
                            },
                            {
                              name: "Playbook 2",
                              message:
                                "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
                              position: "2",
                            },
                          ],
                          ["position"],
                          ["asc"]
                        ),
                      ]
                    : []
                }
                setSelectedData={setSelectedData}
                setSelectedSequenceEvent={setSelectedSequenceEvent}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            {selectedIndex !== null && (
              <>
                {_.includes([0, 1, 2, 3], selectedData?.status) ? (
                  <ViewPlaybook />
                ) : (
                  <ViewPlaybook />
                )}
              </>
            )}

            {selectedIndex === null && (
              <SelectItemNull
                prompts={[]}
                stringForEmpty={"Empty data"}
                stringForNotEmpty={"Select a playbook"}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PlaybooksPage;
