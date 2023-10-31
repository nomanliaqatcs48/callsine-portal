import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { useParams } from "react-router-dom";
import { useAsyncDebounce } from "react-table";
import {
  addUpdatePerson,
  selectPersonById,
} from "src/store/personTrackingReducer";
import TooltipComponent from "src/ui-component/tour/Tooltip";
import TourHighlight from "src/ui-component/tour/TourBoder";
import { useAuth } from "../../../../../../contexts/auth";
import { devLog, devLogError } from "../../../../../../helpers/logs";
import { ToastError, ToastSuccess } from "../../../../../../helpers/toast";
import { usePlaybook } from "../../../../../../hooks/persons/usePlaybook";
import { useFetchProspectSequenceEvent } from "../../../../../../hooks/persons/useProspectEvents";
import {
  getPlaybooks,
  setPlaybookV2Service,
} from "../../../../../../services/prompts.service";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import MyModal from "../../../../../../ui-component/modal/MyModal";
import SelectItemNull from "../../../../../../ui-component/pages/persons/detail/SelectItemNull";
import { load } from "../../../../../../utils/storage";
import WebsocketProvider, {
  WebsocketContext,
} from "../../../../../../websocket/websocketProvider";
import EditTypeHandler from "./EditTypeHandler";
import PlaybookList from "./PlaybookList";

type PersonProps = {
  personData: any;
};
const PlaybookV2 = ({ personData }: PersonProps) => {
  const { auth, updateProfile } = useAuth();
  const [websocketResponse, setWebsocketResponse] = useState<any>({});
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedSequenceEvent, setSelectedSequenceEvent] = useState<any>(null);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [promptId, setPromptId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOverwrite, setIsOverwrite] = useState<boolean>(false);
  const dispatch = useDispatch(); // Initialize useDispatch
  const person = useSelector((state) => selectPersonById(state, Number(id)));
  const [generating, setGenerating] = useState<boolean>(false);
  console.log("PERSON", personData?.status);
  useEffect(() => {
    if (
      person?.finalEmailPosition !== person?.lastEmailPosition ||
      person?.lastEmailPosition === 0
    ) {
      setGenerating(true);
      setSelectedIndex(null);
    } else {
      if (person) {
        setLoading((prev: any) => ({ ...prev, onPage: true }));
        getPrompts();
        ToastSuccess("Messages have completed generating.");
      }
      setGenerating(false);
    }
  }, [person]);

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
  // store.subscribe(() => {
  //   console.log(store.getState());
  // });

  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    if (open) {
      setIsOverwrite(false);
    }
  }, [open]);

  const getPrompts = async () => {
    try {
      let _profile: any = await load("profile");
      let res = await getPlaybooks(filters, searchValue);
      if (res?.data) {
        // devLog(() => {
        //   console.log("res.data?.results", res.data?.results);
        // });
        setPrompts(
          _.filter(res.data?.results, (o: any) => o?.team === _profile?.team)
        );
        setLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error("e", e?.response);
      });
      setLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleAddUpdatePerson = () => {
    // Dispatching the addUpdatePerson action to add/update the person in the Redux store
    dispatch(
      addUpdatePerson({
        personId: Number(id),
        finalEmailPosition: 0,
        lastEmailPosition: 0,
        completedGeneration: false,
      })
    );
  };

  const handleGeneratePlaybook = async (event: any) => {
    setLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));

    try {
      let res = await setPlaybookV2Service(
        Number(promptId),
        Number(id),
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          company_name: data?.org?.name,
          company_website: data?.org?.domain,
          company_domain: data?.org?.domain,
          org_name: "Union Resolute",
          org_domain: "unionresolute.com",
        },
        isOverwrite
      );
      if (res?.data) {
        ToastSuccess("Messages are generating.");
        handleAddUpdatePerson();
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

  const handleChangeIsOverwrite = (event: any) => {
    setIsOverwrite(event?.target?.checked);
  };

  useEffect(() => {
    console.log(websocketResponse);
    if (
      websocketResponse &&
      websocketResponse.message &&
      websocketResponse.message.event === "set_playbook"
    ) {
      console.log(websocketResponse);
      // executeRefreshTable();
    }
  }, [websocketResponse]);

  return (
    <>
      <WebsocketProvider userId={auth.id}>
        <WebsocketContext.Consumer>
          {(value: any) => {
            if (value.responsePayload) {
              setWebsocketResponse(value.responsePayload.notification);
            }
            return null;
          }}
        </WebsocketContext.Consumer>
        <Paper
          elevation={0}
          className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
        >
          {generating && (
            <Grid className="tw-rounded-lg tw-px-5 tw-bg-green-600 tw-mx-5 tw-py-4">
              <Typography color="white">
                Messages are currently generating.
              </Typography>
            </Grid>
          )}
          {person?.completedGeneration && (
            <Grid className="tw-rounded-lg tw-px-5 tw-bg-green-600 tw-mx-5 tw-py-4">
              <Typography color="white">
                Your messages have generated, you may need to refresh your page.
              </Typography>
            </Grid>
          )}
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

                <TourHighlight>
                  <Box className="tw-text-[20px] tw-tracking-[0.4px] tw-text-black tw-font-medium tw-py-2">
                    Email
                  </Box>
                </TourHighlight>

                {/*dropdown*/}

                <Box className="tw-w-full xl:tw-w-[200px]">
                  {!loading?.regeneratePlaybook &&
                  personData?.status === "Open" ? (
                    <TooltipComponent
                      text={
                        "We have already added an example playbook for you to get started with. Click this button, select the Playbook, then click Generate!"
                      }
                    >
                      <ReactSelect
                        name="generate-playbook"
                        className="basic-single tw-cursor-pointer"
                        variant="blue"
                        placeholder="GENERATE EMAILS"
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
                    </TooltipComponent>
                  ) : (
                    "Person Unenrolled"
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
                  <EditTypeHandler
                    selectedData={selectedData}
                    selectedIndex={selectedIndex}
                    selectedSequenceEvent={selectedSequenceEvent}
                    playBookData={playBookData}
                    personData={personData}
                    getPersonDetail={getPersonDetail}
                  />
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
            modalSxStyle={{
              width: { xs: 400 },
              padding: 0,
              "& h4": {
                backgroundColor: "#EAEAEA",
                padding: "20px 30px",
                fontSize: { xs: 14, lg: 16 },
              },
            }}
          >
            <DialogContent className="tw-px-[30px]">
              <Box className="tw-flex">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isOverwrite}
                        onChange={handleChangeIsOverwrite}
                        name="is_overwrite"
                      />
                    }
                    label="Replace previously generated, unscheduled drafts with new content?"
                  />
                </FormGroup>
              </Box>
            </DialogContent>
            <DialogActions className="tw-px-[30px] tw-pb-[30px]">
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
                variant="outlined"
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
      </WebsocketProvider>
    </>
  );
};

export default PlaybookV2;
