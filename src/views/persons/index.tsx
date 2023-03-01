import React from "react";
import { Typography } from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "./utils/utils";
import { usePersons } from "./hooks/usePersons";

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
    <MainCard title="Persons">
      <Typography variant="body2" />
      <MyTable
        columns={_columns()}
        data={personsData}
        totalItems={total || 0}
        tableName="HighlyQualifiedLeads"
        tableClassName="table-highly-qualified-leads gray-header table-sm"
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
