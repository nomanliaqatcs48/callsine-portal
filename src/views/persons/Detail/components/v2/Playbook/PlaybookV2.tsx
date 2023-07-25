import { LoadingButton } from "@mui/lab";
import { Box, DialogActions, Grid, Paper } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { devLog, devLogError } from "../../../../../../helpers/logs";
import { ToastError, ToastSuccess } from "../../../../../../helpers/toast";
import { useFetchProspectSequenceEvent } from "../../../../../../hooks/persons/useProspectEvents";
import { setPlaybookV2Service } from "../../../../../../services/prompts.service";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import MyModal from "../../../../../../ui-component/modal/MyModal";
import DraftEmail from "./DraftEmail";
import SentOrScheduledEmail from "./SentOrScheduledEmail";
import PlaybookList from "./PlaybookList";
import { usePlaybook } from "../../../../../../hooks/persons/usePlaybook";
import { getPlaybooks } from "../../../../../../services/prompts.service";
import { useAsyncDebounce } from "react-table";
import SelectItemNull from "../../../../../../ui-component/pages/persons/detail/SelectItemNull";

const PlaybookV2 = () => {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedSequenceEvent, setSelectedSequenceEvent] = useState<any>(null);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [promptId, setPromptId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const {
    data: playBookData,
    setData: setPlayBookData,
    isLoading: playbookLoading,
    setIsLoading: setPlaybookLoading,
  } = usePlaybook();
  const [filters, setFilters] = useState<any>({
    limit: 99999,
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
  } = useFetchProspectSequenceEvent(String(id), filters, searchValue);
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
    } catch (e: any) {
      devLogError(() => {
        console.error("e", e?.response);
      });
      setLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleGeneratePlaybook = async (event: any) => {
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

        setTimeout(() => {
          setLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
          handleClose(event, "");
        });
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setPromptId(null);

      setTimeout(() => {
        setLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
        handleClose(event, "");
      });
    }
  };

  const handleGenerateOnChange = (newValue: any) => {
    setPromptId(newValue?.value);
  };

  const handleSearchOnChange = useAsyncDebounce(async () => {
    getPersonDetail();
  }, 1000);

  const handleSearchOnBeforeChange = (e: any) => {
    setLoading((prev: any) => ({ ...prev, search: true }));
    setSearchValue(e.target.value);
    void handleSearchOnChange();
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
            <Box className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              {/*title*/}
              <Box className="tw-text-[20px] tw-tracking-[0.4px] tw-text-black tw-font-medium tw-py-2">
                Email
              </Box>
              {/*dropdown*/}
              <Box className="tw-w-full xl:tw-w-[185px]">
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
                      devLog(() => {
                        // console.group("Value Changed");
                        // console.log(newValue);
                        // console.log(`action: ${actionMeta.action}`);
                        // console.groupEnd();
                      });
                      handleGenerateOnChange(newValue);
                      handleOpen();
                    }}
                  />
                )}
              </Box>
            </Box>
            <Box className="search-container tw-py-3 tw-px-2 xl:tw-pt-6 xl:tw-pb-4 xl:tw-px-5">
              <input
                type="search"
                placeholder="Search"
                onChange={handleSearchOnBeforeChange}
                className="tw-bg-[#f8fbff] tw-text-[16px] tw-text-black tw-font-light tw-tracking-[0.32px] tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
              />
            </Box>
            <Box className="list-container">
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                data={
                  _.orderBy(data?.results, ["position"], ["asc"])
                    ? [..._.orderBy(data?.results, ["position"], ["asc"])]
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
                  <SentOrScheduledEmail
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
                    onLoadApi={() => {
                      getPersonDetail();
                      setSelectedData(null);
                      setSelectedIndex(null);
                    }}
                    playBookData={playBookData}
                    selectedData={selectedData}
                    selectedSequenceEvent={selectedSequenceEvent}
                  />
                )}
              </>
            )}

            {selectedIndex === null && (
              <SelectItemNull
                prompts={playBookData?.prompts}
                stringForEmpty={"Empty data"}
                stringForNotEmpty={"Select an email"}
              />
            )}
          </Grid>
        </Grid>
      </Paper>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle={
            loading?.regeneratePlaybook || loading?.submit
              ? "Generating..."
              : "Generate Playbook?"
          }
          labelledby={
            loading?.regeneratePlaybook || loading?.submit
              ? "Generating..."
              : "Generate Playbook?"
          }
          describedby="Generate Playbook modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <DialogActions>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleGeneratePlaybook}
              loading={loading?.regeneratePlaybook || loading?.submit}
              disabled={loading?.regeneratePlaybook || loading?.submit}
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
            >
              Yes, please!
            </LoadingButton>
            <LoadingButton
              onClick={(event: any) => {
                handleClose(event, "");
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
