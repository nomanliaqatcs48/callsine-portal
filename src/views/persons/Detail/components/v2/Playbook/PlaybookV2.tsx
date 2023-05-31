import {
  Button,
  DialogActions,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import PlaybookList from "./PlaybookList";
import DraftEmail from "./DraftEmail";
import Email from "./Email";
import SelectItem from "./SelectItem";
import React, { useState } from "react";
import { usePlaybook } from "../../../../../../hooks/persons/usePlaybook";
import MyModal from "../../../../../../ui-component/modal/MyModal";
import { setPlaybook } from "../../../../../../services/prompts.service";
import { ToastError, ToastSuccess } from "../../../../../../helpers/toast";
import { devLogError } from "../../../../../../helpers/logs";
import { useParams } from "react-router-dom";

const PlaybookV2 = () => {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [promptId, setPromptId] = useState<number | null>(null);

  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    getPersonDetail,
    open,
    setOpen,
    handleOpen,
    handleClose,
  } = usePlaybook();

  const handleGeneratePlaybook = async () => {
    setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));

    try {
      let res = await setPlaybook(Number(promptId), Number(id), {
        first_name: data?.first_name,
        last_name: data?.last_name,
        company_name: data?.org?.name,
        company_website: data?.org?.domain,
        company_domain: data?.org?.domain,
        org_name: "Union Resolute",
        org_domain: "unionresolute.com",
      });
      if (res?.data) {
        ToastSuccess("Message successfully generated.");
        setData(res.data);
        getPersonDetail();
        setPromptId(null);
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));

        //reset prompt
        setIsLoading((prev: any) => ({ ...prev, resetPrompt: true }));
        setTimeout(() => {
          setIsLoading((prev: any) => ({ ...prev, resetPrompt: false }));
          handleClose();
        });
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(e.response);
      setPromptId(null);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
  };

  const handleGenerateOnChange = (newValue: any) => {
    setPromptId(newValue?.value);
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
            xs={12}
            sm={5}
            lg={4}
            className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
          >
            <div className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              {/*title*/}
              <div className="tw-text-[0.95rem] tw-text-black tw-font-medium tw-py-2">
                Playbooks
              </div>
              {/*dropdown*/}
              <div className="tw-w-full xl:tw-w-[185px]">
                <ReactSelect
                  name="generate-playbook"
                  className="basic-single tw-cursor-pointer"
                  variant="blue"
                  placeholder="GENERATE PLAYBOOK"
                  isClearable={true}
                  isSearchable={true}
                  options={[
                    { label: "Playbook 1", value: 1 },
                    { label: "Playbook 2", value: 2 },
                  ]}
                  onChange={(newValue: any, actionMeta: any) => {
                    // devLog("Value Changed");
                    // devLog(newValue);
                    // devLog(`action: ${actionMeta.action}`);
                    // devLog("===========");
                    handleGenerateOnChange(newValue);
                    handleOpen();
                  }}
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
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                data={data?.prompts || []}
                setSelectedData={setSelectedData}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            {selectedIndex !== null && (
              <>
                {/*<Email />*/}
                <DraftEmail playBookData={data} selectedData={selectedData} />
              </>
            )}

            {selectedIndex === null && <SelectItem />}
          </Grid>
        </Grid>
      </Paper>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Generate Playbook?"
          labelledby="Generate Playbook?"
          describedby="Generate Playbook modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          {/*<Typography variant="subtitle1">Generate Playbook?</Typography>*/}
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleGeneratePlaybook}
              disabled={isLoading?.regeneratePlaybook || isLoading?.submit}
            >
              Yes, please!
            </Button>
            <Button
              onClick={handleClose}
              disabled={isLoading?.regeneratePlaybook || isLoading?.submit}
            >
              Cancel
            </Button>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default PlaybookV2;
