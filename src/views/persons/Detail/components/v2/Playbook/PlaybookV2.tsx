import { LoadingButton } from "@mui/lab";
import { DialogActions, Grid, Paper } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { devLogError } from "../../../../../../helpers/logs";
import { ToastError, ToastSuccess } from "../../../../../../helpers/toast";
import { useFetchProspectSequenceEvent } from "../../../../../../hooks/persons/useProspectEvents";
import { setPlaybookV2Service } from "../../../../../../services/prompts.service";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import MyModal from "../../../../../../ui-component/modal/MyModal";
import DraftEmail from "./DraftEmail";
import Email from "./Email";
import PlaybookList from "./PlaybookList";
import SelectItem from "./SelectItem";
import { usePlaybook } from "../../../../../../hooks/persons/usePlaybook";
import { getPlaybooks } from "../../../../../../services/prompts.service";

const PlaybookV2 = () => {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [promptId, setPromptId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const {
    data: playBookData,
    setData: setPlayBookData,
    isLoading: playbookLoading,
    setIsLoading: setPlaybookLoading,
  } = usePlaybook();
  const [filters, setFilters] = React.useState<any>({
    limit: 9999,
    offset: 0,
    currentPage: 1,
  });
  const {
    data,
    loading,
    setData,
    setLoading,
    error,
    handleOpen,
    handleClose,
    getPersonDetail,
    open,
  } = useFetchProspectSequenceEvent(String(id));
  console.log(playBookData);
  // const {
  //   data,
  //   setData,
  //   isLoading,
  //   setIsLoading,
  //   getPersonDetail,
  //   open,
  //   setOpen,
  //   handleOpen,
  //   handleClose,
  // } = usePlaybook();

  useEffect(() => {
    getPrompts();
  }, []);

  const getPrompts = async () => {
    try {
      let res = await getPlaybooks(filters, searchValue);
      if (res?.data) {
        setPrompts(res.data?.results);
        setLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch ({ response }) {
      devLogError("e", response);
      setLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleGeneratePlaybook = async () => {
    setLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));

    try {
      let res = await setPlaybookV2Service(Number(promptId), Number(id), {
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
        setLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));

        setTimeout(() => {
          handleClose();
        });
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(e.response);
      setPromptId(null);
      setLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));

      setTimeout(() => {
        handleClose();
      });
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
                {!loading?.regeneratePlaybook && (
                  <ReactSelect
                    name="generate-playbook"
                    className="basic-single tw-cursor-pointer"
                    variant="blue"
                    placeholder="GENERATE PLAYBOOK"
                    isClearable={true}
                    isSearchable={true}
                    options={prompts.map((item: any, idx: number) => {
                      item.value = item?.id;
                      item.label = item?.name || "";

                      return item;
                    })}
                    onChange={(newValue: any, actionMeta: any) => {
                      // devLog("Value Changed");
                      // devLog(newValue);
                      // devLog(`action: ${actionMeta.action}`);
                      // devLog("===========");
                      handleGenerateOnChange(newValue);
                      handleOpen();
                    }}
                  />
                )}
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
                data={data?.results ? [...data?.results] : []}
                setSelectedData={setSelectedData}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            {selectedIndex !== null && (
              <>
                {_.includes([0, 1, 2, 3], selectedData?.status) ? (
                  <Email
                    onLoadApi={() => {
                      getPersonDetail();
                      setSelectedData(null);
                      setSelectedIndex(null);
                    }}
                    selectedData={selectedData}
                    position={selectedIndex + 1}
                  />
                ) : (
                  <DraftEmail
                    position={selectedIndex + 1}
                    onLoadApi={getPersonDetail}
                    playBookData={data}
                    selectedData={selectedData}
                  />
                )}
              </>
            )}

            {selectedIndex === null && (
              <SelectItem prompts={playBookData?.prompts} />
            )}
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
          <DialogActions>
            <LoadingButton
              variant="outlined"
              color="primary"
              onClick={handleGeneratePlaybook}
              loading={loading?.regeneratePlaybook || loading?.submit}
              disabled={loading?.regeneratePlaybook || loading?.submit}
            >
              Yes, please!
            </LoadingButton>
            <LoadingButton
              onClick={() => {
                handleClose();
                setLoading((prev: any) => ({
                  ...prev,
                  regeneratePlaybook: true,
                }));
                setTimeout(() =>
                  setLoading((prev: any) => ({
                    ...prev,
                    regeneratePlaybook: false,
                  }))
                );
              }}
              loading={loading?.regeneratePlaybook || loading?.submit}
              disabled={loading?.regeneratePlaybook || loading?.submit}
            >
              Cancel
            </LoadingButton>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default PlaybookV2;
