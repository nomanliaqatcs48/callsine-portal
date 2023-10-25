import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid, Paper, Typography } from "@mui/material";
import _ from "lodash";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectPlaybookData } from "src/store/reducer";
import TemplateCenter from "src/ui-component/buttons/TemplateCenter";
import ViewPrompt from "src/ui-component/pages/prompts/ViewPrompt";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import { usePlaybook } from "../../hooks/playbook/usePlaybook";
import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";
import CreateOrEditPrompt from "../../ui-component/buttons/CreateOrEditPrompt";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";
import PlaybookList from "./components/PlaybookList";

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
      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Playbooks
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                  A Playbook is a grouping of prompts that you combine into a
                  series to streamline your outreach. You can create a playbook
                  for different types or reasons for outreach, like cold
                  prospecting, follow-ups, webinars or events etc.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
        </Typography>
      </Box>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container spacing={2} className="tw-p-0">
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
          >
            <Box className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              <Box className="tw-text-[20px] tw-tracking-[0.4px] tw-text-black tw-font-medium tw-py-2" />

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
              <TemplateCenter disabled={!selectedData} />
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
