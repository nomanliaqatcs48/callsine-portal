import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import PlaybookList from "./components/PlaybookList";
import _ from "lodash";
import ViewPlaybook from "../../ui-component/pages/playbooks/ViewPlaybook";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";
import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";
import { usePlaybook } from "../../hooks/playbook/usePlaybook";

const PlaybooksPage = () => {
  let {
    playbookData,
    setPlaybookData,
    filters,
    setFilters,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
    selectedIndex,
    setSelectedIndex,
    selectedData,
    setSelectedData,
    isLoading,
    setIsLoading,
    getAllPlaybook,
    handleSearchOnChange,
    handleSearchOnBeforeChange,
  } = usePlaybook(true);

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
              <Box className="tw-text-[20px] tw-tracking-[0.4px] tw-text-black tw-font-medium tw-py-2">
                Playbook
              </Box>
              <Box className="tw-w-full tw-flex tw-justify-center xl:tw-justify-end">
                <CreateOrEditPlaybook
                  onClick={() => null}
                  onLoadApi={() => null}
                  variant="contained"
                  color="primary"
                  className="tw-bg-primary tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
                >
                  Add Prompt
                </CreateOrEditPlaybook>
              </Box>
            </Box>
            <Box className="search-container tw-py-3 tw-px-2 xl:tw-pt-6 xl:tw-pb-4 xl:tw-px-5">
              <input
                type="search"
                placeholder="Search"
                onChange={handleSearchOnBeforeChange}
                className="tw-bg-[#F8FBFF] tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
              />
            </Box>
            <Box className="list-container">
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                data={
                  _.orderBy(playbookData, ["position"], ["asc"])
                    ? [..._.orderBy(playbookData, ["position"], ["asc"])]
                    : []
                }
                setSelectedData={setSelectedData}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            {selectedIndex !== null && (
              <>
                <ViewPlaybook
                  selectedData={selectedData}
                  onLoadApi={() => null}
                />
              </>
            )}

            {selectedIndex === null && (
              <SelectItemNull
                prompts={playbookData}
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
