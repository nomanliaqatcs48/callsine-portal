import React from "react";
import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "./utils/utils";
import { usePersons } from "./hooks/usePersons";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchFieldV2 from "../../ui-component/forms/SearchFieldV2";
import Filter from "../../ui-component/dropdowns/Filter";

const PersonsPage = () => {
  const {
    personsData,
    setPersonsData,
    total,
    setTotal,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getPeople,
  } = usePersons();

  return (
    <div>
      <Typography className="tw-text-4xl">People</Typography>
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
              <SearchFieldV2 />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="title-filter"
                showLabel={true}
                labelText="Title"
                data={[{ label: "All", value: "" }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="company-filter"
                showLabel={true}
                labelText="Company"
                data={[{ label: "All", value: "" }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="industry-filter"
                showLabel={true}
                labelText="Industry"
                data={[{ label: "All", value: "" }]}
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
            value={total}
            text="Total"
          />
        </Grid>
      </Grid>
      <div style={{ height: 20 }} />
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
        isResponsive={true}
        // topContent={renderSearch}
        // setSortedId={setSortedId}
        // setIsOrderDesc={setIsOrderDesc}
        //
        // sortedId={sortedId}
        // isOrderDesc={isOrderDesc}
      />
    </div>
  );
};

export default PersonsPage;
