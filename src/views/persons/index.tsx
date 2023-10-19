import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, Typography, Stack } from "@mui/material";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/people/utils";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchFieldV2 from "../../ui-component/forms/SearchFieldV2";
import Filter from "../../ui-component/dropdowns/Filter";
import CreateOrEditPerson from "../../ui-component/buttons/CreateOrEditPerson";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useAuth } from "../../contexts/auth";
import ImportPeople from "../../ui-component/buttons/ImportPeople";
import { ToastSuccess } from "../../helpers/toast";
import ExportPeople from "../../ui-component/buttons/ExportPeople";
import DeleteSelectedPeople from "../../ui-component/buttons/DeleteSelectedPeople";
import GenerateSelectedPeople from "../../ui-component/buttons/GenerateSelectedPeople";
import { useAsyncDebounce } from "react-table";
import { usePersons } from "../../hooks/persons/usePersons";
import SearchFilter from "../../ui-component/forms/SearchFilter";
import WebsocketProvider, {
  WebsocketContext,
} from "../../websocket/websocketProvider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PersonsPage = () => {
  const auth: any = useAuth();

  const [websocketResponse, setWebsocketResponse] = useState<any>({});

  const [showAssign, setShowAssign] = useState(false);

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
  } = usePersons();

  const successfulUploadCsv = () => {
    getPeople();
    ToastSuccess("File successfully uploaded.");
  };

  const executeRefreshTable = () => {
    getPeople();
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
      websocketResponse &&
      websocketResponse.message &&
      websocketResponse.message.event === "bulk_import"
    ) {
      executeRefreshTable();
    }
  }, [websocketResponse]);

  // useEffect(() => {
  //   if (showAssign) {
  //     setFilterUserId(auth.id);
  //   } else {
  //     setFilterUserId(null);
  //   }
  // }, [showAssign]);

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
                  This is the list of people you have added to your account. You
                  can add people manually, import them from a CSV file, or
                  generate them from a list of companies. You can also view or
                  edit each item by clicking person's name.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
        </Typography>
        <Grid className="tw-my-5" />
        <Paper elevation={0} className="tw-mb-10 tw-bg-transparent">
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
                // isLoading={isLoading.onPage}
                isLoading={false}
                value={auth?.clicks_remaining || 0}
                text="Remaining People"
              />
            </Grid>
          </Grid>
        </Paper>

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
                  onLoadApi={getPeople}
                />
                <MyDivider />
                <Button
                  variant="outlined"
                  startIcon={showAssign ? <VisibilityOff /> : <Visibility />}
                  className="tw-mx-2"
                  onClick={handleToggleAssign}
                >
                  {showAssign ? "Hide Assign" : "Show Assign"}
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
              data={personsData}
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
            />
          </Paper>
        </Paper>
      </WebsocketProvider>
    </>
  );
};

export default PersonsPage;
