import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import React, { FC, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "src/store";

import {
  Box,
  Button,
  DialogActions,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAsyncDebounce } from "react-table";
import { usePersonCounts } from "src/hooks/persons/usePersonCounts";
import useGetUserMe from "src/hooks/settings/useGetUser";
import MyModal from "src/ui-component/modal/MyModal";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import { useAuth } from "../../contexts/auth";
import { ToastSuccess } from "../../helpers/toast";
import { usePersons } from "../../hooks/persons/usePersons";
import CreateOrEditPerson from "../../ui-component/buttons/CreateOrEditPerson";
import DeleteSelectedPeople from "../../ui-component/buttons/DeleteSelectedPeople";
import ExportPeople from "../../ui-component/buttons/ExportPeople";
import GenerateSelectedPeople from "../../ui-component/buttons/GenerateSelectedPeople";
import ImportPeople from "../../ui-component/buttons/ImportPeople";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchFieldV2 from "../../ui-component/forms/SearchFieldV2";
import SearchFilter from "../../ui-component/forms/SearchFilter";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/people/utils";
import WebsocketProvider, {
  WebsocketContext,
} from "../../websocket/websocketProvider";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// At the top of your file, or in a global declarations.d.ts file
declare global {
  interface Window {
    _gs: any; // Use 'any' if you don't have a specific type for the _gs function
  }
}

interface ExplainerModalProps {
  open: boolean;
  onClose: () => void;
}

const ExplainerModal: FC<ExplainerModalProps> = ({ open, onClose }) => (
  <MyModal
    open={open}
    onClose={onClose}
    modalTitle="How we process your contact lists..."
    labelledby="Are you sure?"
    describedby="delete person modal"
    modalSxStyle={{ width: { xs: 400 } }}
  >
    <Typography>
      Right now, we are gathering intel on all of your contacts to help improve
      the personalization of your emails. Some contacts and their associated
      companies may take seconds, but some may take longer to track down. You
      can feel free to start working on the contacts that are currently marked
      with a green check in the column "Data Available."
    </Typography>
    <DialogActions>
      <Button onClick={onClose}>Awesome, Thanks</Button>
    </DialogActions>
  </MyModal>
);

const PersonsPage = () => {
  const { auth, updateProfile } = useAuth();

  const [explainerOpen, setExplainerOpen] = useState<boolean>(false);

  const [websocketResponse, setWebsocketResponse] = useState<any>({});

  const [showAssign, setShowAssign] = useState(false);
  const { loading, data, error } = useGetUserMe();

  useEffect(() => {
    // Check if the _gs function exists on the window object
    if (window?._gs && data) {
      console.log("in the indentify");
      // Call the _gs function with the 'identify' command and the user data
      window?._gs("identify", {
        email: data?.email,
        name: data?.first_name,
        // other special properties...
      });
    } else {
      console.error("The _gs function is not available on the window object.");
    }
  }, [data]); // Empty dependency array means this effect runs once on component mount

  // useEffect(() => {
  //   // Assume checkIfTeamExists is a function that checks if a team exists for the user
  //   const checkIfTeamExists = async () => {
  //     if (!auth?.team) {
  //       // Adjust this condition based on your actual data structure
  //       await updateProfile();
  //     }
  //   };

  //   checkIfTeamExists();
  // }, [auth, updateProfile]);

  const {
    personsData,
    setPersonsData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    selectedPersonRows,
    setSelectedPersonRows,
    getPeople,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
    searchFilterValue,
    setSearchFilterValue,
    setFilterUserId,
    setSchedEmailNull,
    setSchedEmailNotNull,
    setSchedEmailToday,
    setLastContactedToday,
  } = usePersons();

  const personsList = useSelector(
    (state: RootState) => state.personsLists.personsList
  );

  const { getPersonCounts, personCounts, isFetching } = usePersonCounts();

  useEffect(() => {
    // if (!isLoading && personsList && personsList.length === 0) {
    //   getPeople();
    //   getPersonCounts();
    // }
    getPersonCounts();
  }, []);

  const successfulUploadCsv = () => {
    getPeople();
    getPersonCounts();
    ToastSuccess("File successfully uploaded.");
  };

  const executeRefreshTable = () => {
    getPeople();
    getPersonCounts();
  };

  const handleSearchOnBeforeChange = (e: any) => {
    setIsLoading((prev: any) => ({ ...prev, search: true }));
    setSearchValue(e.target.value);
    void handleSearchOnChange();
  };

  const handleSearchTitle = (e: any) => {
    setSearchFilterValue((prev: any) => ({ ...prev, title: e.target.value }));
    void handleSearchOnChange();
  };

  const handleSearchCompany = (e: any) => {
    setSearchFilterValue((prev: any) => ({ ...prev, company: e.target.value }));
    void handleSearchOnChange();
  };

  const handleSearchIndustry = (e: any) => {
    setSearchFilterValue((prev: any) => ({
      ...prev,
      industry: e.target.value,
    }));
    void handleSearchOnChange();
  };

  const handleSearchOnChange = useAsyncDebounce(async () => {
    setFilters((prev: any) => ({ ...prev, limit: 10, offset: 0 }));
  }, 1000);

  const MyDivider = () => {
    return (
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="tw-hidden lg:tw-block"
        sx={{ borderColor: "#778DA9", borderRightWidth: 1 }}
      />
    );
  };

  const handleToggleAssign = () => {
    setShowAssign(!showAssign); // Toggle the state from true to false and vice versa
  };

  useEffect(() => {
    if (
      (websocketResponse &&
        websocketResponse.message &&
        websocketResponse.message.event === "bulk_import") ||
      (websocketResponse &&
        websocketResponse.message &&
        websocketResponse.message.event === "bulk_import_refresh")
    ) {
      executeRefreshTable();
    }
  }, [websocketResponse]);

  useEffect(() => {
    if (showAssign) {
      setFilterUserId(auth.id);
      setSchedEmailNotNull(false);
      setSchedEmailNull(false);
      setSchedEmailToday(false);
      setLastContactedToday(false);
    } else {
      setFilterUserId(null);
    }
  }, [showAssign]);

  const handleModalClose = () => {
    setExplainerOpen(false);
  };

  const handleFilterByUnscheduled = () => {
    setFilterUserId(null);
    setSchedEmailNotNull(false);
    setSchedEmailNull(true);
    setSchedEmailToday(false);
    setLastContactedToday(false);
  };

  const handleFilterByAllScheduled = () => {
    setFilterUserId(null);
    setSchedEmailNull(false);
    setSchedEmailNotNull(true);
    setSchedEmailToday(false);
    setLastContactedToday(false);
  };

  const handleFilterBySchedToday = () => {
    setFilterUserId(null);
    setSchedEmailNull(false);
    setSchedEmailNotNull(false);
    setSchedEmailToday(true);
    setLastContactedToday(false);
  };

  const handleLastContacted = () => {
    setFilterUserId(null);
    setSchedEmailNull(false);
    setSchedEmailNotNull(false);
    setSchedEmailToday(false);
    setLastContactedToday(true);
  };

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
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          People
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                  This is a list of all of the people you have added to your
                  account for outreach. You can add people manually, import them
                  from a CSV file, or generate them from a list of companies.
                  You can also view or edit each person by clicking on their
                  name.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
        </Typography>
        <Grid className="tw-my-5" />
        <Paper elevation={0} className="tw-mb-5 tw-bg-transparent">
          <Grid
            container
            spacing={0}
            className="tw-space-y-5 lg:tw-space-y-0 lg:tw-space-x-3 xl:tw-space-x-0 tw-bg-transparent"
          >
            {/*search and filter*/}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={9}
              className="tw-bg-white tw-p-3 tw-border tw-border-[#eff0f1] tw-rounded sm:tw-px-5 xl:tw-flex xl:tw-px-3 xl:tw-items-center"
            >
              <Grid
                container
                className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4"
              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                  <SearchFieldV2 onChange={handleSearchOnBeforeChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                  <Stack spacing={2}>
                    <label
                      htmlFor="search-title"
                      className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start"
                    >
                      Title
                    </label>
                    <SearchFilter
                      searchValue={searchFilterValue?.title}
                      onChange={handleSearchTitle}
                      placeholder="Search Title"
                      id="search-title"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                  <Stack spacing={2}>
                    <label
                      htmlFor="search-company"
                      className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start"
                    >
                      Company
                    </label>
                    <SearchFilter
                      searchValue={searchFilterValue?.company}
                      onChange={handleSearchCompany}
                      placeholder="Search Company"
                      id="search-company"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                  <Stack spacing={2}>
                    <label
                      htmlFor="search-industry"
                      className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start"
                    >
                      Industry
                    </label>
                    <SearchFilter
                      searchValue={searchFilterValue?.industry}
                      onChange={handleSearchIndustry}
                      placeholder="Search Industry"
                      id="search-industry"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            {/*card*/}
            <Grid
              item
              className="tw-flex tw-flex-col tw-justify-center tw-px-20 lg:tw-px-1 xl:tw-pl-5 tw-bg-white"
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={3}
            >
              <TotalListSmallCard
                isLoading={isFetching}
                value={{
                  scheduled_today: personCounts?.data?.scheduled_today,
                  sent_today: personCounts?.data?.sent_today,
                  all_scheduled: personCounts?.data?.all_scheduled,
                  unscheduled: personCounts?.data?.unscheduled,
                }}
                text="Remaining People"
                handleFilterByUnscheduled={handleFilterByUnscheduled}
                handleFilterByAllScheduled={handleFilterByAllScheduled}
                handleFilterBySchedToday={handleFilterBySchedToday}
                handleLastContacted={handleLastContacted}
              />
            </Grid>
          </Grid>
        </Paper>
        {personsList && personsList.length > 0 && (
          <Grid
            className="tw-rounded-lg tw-px-5 tw-bg-green-600 tw-mx-5 tw-py-4"
            onClick={() => setExplainerOpen(true)}
          >
            <Box flexDirection={"row"}>
              <Typography color="white">
                Your list is succesfully processing. Proceed with contacts who
                have the green "Data Available." We are working on the rest!
                What does this mean?
              </Typography>
            </Box>
          </Grid>
        )}
        <Paper
          elevation={0}
          className="tw-rounded tw-border tw-border-[#eff0f1]"
        >
          <div style={{ height: 20 }} />

          <Paper elevation={2} className="tw-pt-4">
            <Grid container>
              <Grid item xs={12} lg={2}>
                <Typography className="tw-text-[24px] tw-tracking-[0.48px] tw-font-normal tw-pl-3">
                  Person Details
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={10}
                className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-1 lg:tw-items-center lg:tw-justify-end lg:tw-px-3"
              >
                <GenerateSelectedPeople
                  selectedRows={selectedPersonRows}
                  // onLoadApi={getPeople}
                  // onLoadCount={getPersonCounts}
                  executeRefreshTable={executeRefreshTable}
                />
                <MyDivider />
                <Button
                  variant="text"
                  startIcon={<Visibility />}
                  className="tw-mx-2"
                  onClick={handleToggleAssign}
                >
                  {showAssign ? "Show All" : "Show Assigned"}
                </Button>
                <MyDivider />

                <CreateOrEditPerson
                  btnText={
                    <>
                      <PersonAddAlt1Icon
                        color="primary"
                        sx={{ fontSize: 15 }}
                        className="tw-mr-2"
                      />
                      Add Person
                    </>
                  }
                  onSubmit={getPeople}
                  onClick={() => null}
                  userId={auth.id}
                />

                <MyDivider />

                <ImportPeople onLoadApi={successfulUploadCsv} />

                <MyDivider />

                <ExportPeople />

                <MyDivider />

                <DeleteSelectedPeople
                  selectedRows={selectedPersonRows}
                  onLoadApi={getPeople}
                />

                <MyDivider />

                <Button
                  onClick={() => null}
                  disabled={false}
                  variant="text"
                  className="tw-text-[16px] tw-tracking-[0.32px] tw-text-callsineLightBlue tw-font-normal hover:tw-bg-transparent focus:tw-bg-transparent active:tw-bg-transparent tw-cursor-auto"
                >
                  {total || 0}{" "}
                  {total === 0 || total === 1 ? "Person" : "People"} Total
                </Button>
              </Grid>
            </Grid>

            <MyTable
              columns={_columns()}
              data={personsList}
              totalItems={total || 0}
              tableName="PersonsTable"
              tableClassName="table-persons gray-header table-sm"
              isTableLoading={isLoading?.table}
              filters={filters}
              setFilters={setFilters}
              removePageSizeDropdown={false}
              setSelectedFlatRows={setSelectedPersonRows}
              isResponsive={true}
              removeSelection={false}
              hiddenColumns={["last_name"]}
              // topContent={renderSearch}
              setSortedId={setSortedId}
              setIsOrderDesc={setIsOrderDesc}
              //
              sortedId={sortedId}
              isOrderDesc={isOrderDesc}
              // setFilterUserId={showAssign ? auth.id : null}
            />
          </Paper>
        </Paper>
        <ExplainerModal open={explainerOpen} onClose={handleModalClose} />
      </WebsocketProvider>
    </>
  );
};

export default PersonsPage;
