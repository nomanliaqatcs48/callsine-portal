import { Box, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { devLog } from "../../helpers/logs";
import ReactSelect from "../../ui-component/dropdowns/ReactSelect";
import PlaybookList from "../persons/Detail/components/v2/Playbook/PlaybookList";
import _ from "lodash";
import ViewPlaybook from "../../ui-component/pages/playbooks/ViewPlaybook";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";

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
              <Box className="tw-w-full xl:tw-w-[185px]">
                <ReactSelect
                  name="generate-playbook"
                  className="basic-single tw-cursor-pointer"
                  variant="blue"
                  placeholder="Playbook"
                  isClearable={true}
                  isSearchable={true}
                  options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                  ].map((item: any, idx: number) => {
                    return item;
                  })}
                  onChange={(newValue: any, actionMeta: any) => {
                    devLog(() => {
                      // console.group("Value Changed");
                      // console.log(newValue);
                      // console.log(`action: ${actionMeta.action}`);
                      // console.groupEnd();
                    });
                    // handleGenerateOnChange(newValue);
                    // handleOpen();
                  }}
                />
              </Box>
            </Box>
            <Box className="search-container tw-py-3 tw-px-2 xl:tw-py-4 xl:tw-px-5" />
            <Box className="list-container">
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                data={
                  _.orderBy(
                    [{ position: "1" }, { position: "2" }],
                    ["position"],
                    ["asc"]
                  )
                    ? [
                        ..._.orderBy(
                          [{ position: "1" }, { position: "2" }],
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
