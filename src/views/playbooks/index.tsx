import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid, Paper, Typography } from "@mui/material";
import _ from "lodash";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectPlaybookData } from "src/store/reducer";
import TemplateCenter from "src/ui-component/buttons/TemplateCenter";
import ViewPrompt from "src/ui-component/pages/prompts/ViewPrompt";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import TooltipComponent from "src/ui-component/tour/Tooltip";
import { usePlaybook } from "../../hooks/playbook/usePlaybook";
import CreateOrEditPlaybook from "../../ui-component/buttons/CreateOrEditPlaybook";
import CreateOrEditPrompt from "../../ui-component/buttons/CreateOrEditPrompt";
import SelectItemNull from "../../ui-component/pages/persons/detail/SelectItemNull";
import InfoModal from "./components/InfoModal";
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
      <Box
        className="tw-flex tw-mb-10"
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
      >
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
        <TooltipComponent
          text={"Click here for a quick rundown on how to use Playbooks."}
        >
          <InfoModal />
        </TooltipComponent>
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

              <Box className="tw-w-full tw-flex tw-justify-between tw-mt-5 tw-mb-5">
                <div>
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={handleSearchOnBeforeChange}
                    className="tw-bg-[#F8FBFF] tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-px-[16px] tw-py-[11px] tw-outline-none placeholder:tw-text-callsineGray"
                  />
                </div>
                <TooltipComponent text="Click here to add a new playbook.">
                  <CreateOrEditPlaybook
                    onClick={() => null}
                    onLoadApi={() => null}
                    selectedData={selectedData}
                    variant="contained"
                    color="primary"
                    className="tw-bg-green-600 hover:tw-bg-green-500 tw-text-[14px] tw-font-medium tw-text-white tw-px-[16px] tw-py-[8px] tw-rounded-[8px] tw-uppercase"
                  >
                    Add Playbook
                  </CreateOrEditPlaybook>
                </TooltipComponent>
                
              </Box>
            </Box>
            {/* <Box className="search-container tw-py-3 tw-px-2 xl:tw-pt-6 xl:tw-pb-4 xl:tw-px-5">
              
            </Box> */}
            <Box className="list-container" >
              {playbookData.length > 0 ? (
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
              ): (
                  <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
                    <div className="tw-text-xl tw-py-10 tw-text-[#99a9be] tw-font-semibold tw-mt-4">
                    Empty Playbook
                    </div>
                  </div>
                )
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            <Box className="tw-border-b tw-border-[#f2f3f9] tw-pb-4 tw-mt-6 tw-pr-6 tw-w-full tw-flex tw-justify-center xl:tw-justify-end ">
              <TemplateCenter disabled={!selectedData} />
              <TooltipComponent
                text={
                  "Once a Playbook is selected use this button to add an additional Prompt to your Playbook."
                }
              >
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
              </TooltipComponent>
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
