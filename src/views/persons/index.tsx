import React from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
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

const PersonsPage = () => {
  const auth: any = useAuth();

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
  } = usePersons();

  const successfulUploadCsv = () => {
    getPeople();
    ToastSuccess("File successfully uploaded.");
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

  return (
    <>
      {console.log(personsData)}
      <WebsocketProvider userId={auth.id}>
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          People
        </Typography>
        <Grid className="tw-my-5" />
        <Grid
          container
          spacing={0}
          className="tw-space-y-5 lg:tw-space-y-0 lg:tw-space-x-3 xl:tw-space-x-0"
        >
          {/*search and filter*/}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={7}
            xl={9}
            className="tw-bg-white tw-p-3 tw-border tw-border-[#eff0f1] tw-rounded-lg sm:tw-px-32 xl:tw-flex xl:tw-px-3 xl:tw-items-center"
          >
            <Grid
              container
              className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4"
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                <SearchFieldV2 onChange={handleSearchOnBeforeChange} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                {/*<Filter
                id="title-filter"
                showLabel={true}
                labelText="Title"
                data={[{ label: "All", value: "" }]}
                onChange={() => null}
              />*/}
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
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                {/*<Filter
                id="company-filter"
                showLabel={true}
                labelText="Company"
                data={[{ label: "All", value: "" }]}
                onChange={() => null}
              />*/}
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
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                {/*<Filter
                id="industry-filter"
                showLabel={true}
                labelText="Industry"
                data={[{ label: "All", value: "" }]}
                onChange={() => null}
              />*/}
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
              </Grid>
            </Grid>
          </Grid>
          {/*card*/}
          <Grid
            item
            className="tw-flex tw-flex-col tw-justify-center tw-px-20 lg:tw-px-1 xl:tw-pl-5"
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={3}
          >
            <TotalListSmallCard
              isLoading={isLoading?.onPage}
              value={auth?.clicks_remaining || 0}
              text="Remaining People"
            />
          </Grid>
        </Grid>
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
                {total || 0} {total === 0 || total === 1 ? "Person" : "People"}{" "}
                Total
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
      </WebsocketProvider>
    </>
  );
};

export default PersonsPage;
