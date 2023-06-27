import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import { useAuth } from "../../contexts/auth";
import TotalPersonsCard from "../../ui-component/cards/TotalPersons";
import TotalMailAccounts from "../../ui-component/cards/TotalMailAccounts";
import CallsineDataGrid from "../../ui-component/tables/CallsineDataGrid";
import CallsineBarChart from "../../ui-component/charts/CallsineBarChart";
import CallsineLineChart from "../../ui-component/charts/CallsineLineChart";
import { devLog, devLogError } from "../../helpers/logs";
import { getSequenceEventScheduledEmailService } from "../../services/sequences.service";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { _columns } from "../../utils/dashboard/utils";
import MyTable from "../../ui-component/tables/MyTable";

const DashboardPage = () => {
  const auth: any = useAuth();
  let {
    isLoading,
    setIsLoading,
    getScheduledEmails,
    scheduledEmails,
    setScheduledEmails,
    total,
    setTotal,
    filters,
    setFilters,
    searchValue,
    setSearchValue,
    selectedFlatRows,
    setSelectedFlatRows,
  } = useDashboard();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <RemainingClicks
              isLoading={isLoading?.onPage}
              value={auth?.clicks_remaining || 0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalPersonsCard isLoading={isLoading?.onPage} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalMailAccounts />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MyTable
              columns={_columns()}
              data={scheduledEmails}
              totalItems={total || 0}
              tableName="ScheduledEmailsTable"
              tableClassName="table-scheduled-emails gray-header table-sm"
              isTableLoading={isLoading?.table}
              filters={filters}
              setFilters={setFilters}
              removePageSizeDropdown={false}
              // setSelectedFlatRows={setSelectedPersonRows}
              isResponsive={true}
              // removeSelection={false}
              // hiddenColumns={["last_name"]}
              // topContent={renderSearch}
              // setSortedId={setSortedId}
              // setIsOrderDesc={setIsOrderDesc}
              //
              // sortedId={sortedId}
              // isOrderDesc={isOrderDesc}
            />
          </Grid>
          {/*<Grid item xs={12}>
            <CallsineDataGrid />
          </Grid>
          <Grid item xs={12} className="3xl:tw-w-1/2">
            <CallsineLineChart
              _xs={290}
              _sm={600}
              _md={480}
              _lg={740}
              _xl={1000}
              _2xl={1250}
              _3xl={1520}
              _4xl={1620}
            />
          </Grid>
          <Grid item xs={12}>
            <CallsineBarChart
              _xs={290}
              _sm={600}
              _md={480}
              _lg={740}
              _xl={1000}
              _2xl={1250}
              _3xl={1520}
              _4xl={1620}
            />
          </Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
