import { useSelector } from "react-redux";
import { selectPlaybookData } from "src/store/reducer";
import { Box, Grid, Paper } from "@mui/material";
import PlaybookList from "./components/PlaybookList";
import _ from "lodash";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";
import CreateOrEditPrompt from "../../ui-component/buttons/CreateOrEditPrompt";
import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";
import { usePlaybook } from "../../hooks/playbook/usePlaybook";
import ViewPrompt from "src/ui-component/pages/prompts/ViewPrompt";
import { devLog } from "src/helpers/logs";

// import ViewPlaybook from "../../ui-component/pages/playbooks/ViewPlaybook";
// import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";

const PlaybooksPage = () => {
  let {
    selectedIndex,
    setSelectedIndex,
    selectedData,
    setSelectedData,
    promptList,
    setPromptList,
    handleSearchOnBeforeChange,
  } = usePlaybook(true);

  let playbookData = useSelector(selectPlaybookData);

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

              <Box className="tw-w-full tw-flex tw-justify-center xl:tw-justify-end ">
                <CreateOrEditPlaybook
                  onClick={() => null}
                  onLoadApi={() => null}
                  selectedData={selectedData}
                  variant="contained"
                  color="primary"
                  className="tw-bg-green-600 hover:tw-bg-green-500 tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
                >
                  Add Playbook
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
                setPromptList={setPromptList}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            <Box className="tw-border-b tw-border-[#f2f3f9] tw-pb-4 tw-mt-6 tw-pr-6 tw-w-full tw-flex tw-justify-center xl:tw-justify-end ">
              <CreateOrEditPrompt
                onClick={() => null}
                onLoadApi={() => null}
                selectedData={selectedData}
                setPromptList={setPromptList}
                variant="contained"
                color="primary"
                className="tw-bg-gray-600 hover:tw-bg-gray-500 tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
                disabled={!selectedData}
              >
                Add Prompt
              </CreateOrEditPrompt>
            </Box>
            {selectedIndex !== null && (
              <>
                <ViewPrompt
                  prompts={promptList}
                  setPromptList={setPromptList}
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
