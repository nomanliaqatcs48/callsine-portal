import React from "react";
import { Typography } from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "./utils/utils";
import { useCampaigns } from "./hooks/useCampaigns";

const PersonsPage = () => {
  const {
    campaignsData,
    setCampaignsData,
    total,
    setTotal,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
  } = useCampaigns();

  return (
    <MainCard title="Campaigns">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
        tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
        venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
        commons construal. Duos aube grue dolor in reprehended in voltage veil
        esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate
        non president, sunk in culpa qui officiate descent molls anim id est
        labours.
      </Typography>
      <MyTable
        columns={_columns}
        data={campaignsData}
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
