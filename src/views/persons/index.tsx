import React from "react";
import { Grid } from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "./utils/utils";
import { usePersons } from "./hooks/usePersons";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";

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
    <MainCard title="People">
      <div style={{ height: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
    </MainCard>
  );
};

export default PersonsPage;
