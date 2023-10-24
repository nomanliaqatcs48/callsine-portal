import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";
import { usePersons } from "../../hooks/persons/usePersons";
import { useAuthentication } from "../../hooks/useAuthentication";
import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import TotalMailAccounts from "../../ui-component/cards/TotalMailAccounts";
import TotalPersonsCard from "../../ui-component/cards/TotalPersons";
import TotalScheduledEmailsCard from "../../ui-component/cards/TotalScheduledEmails";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/dashboard/utils";

const DashboardPage = () => {
  const { auth, updateProfile } = useAuth();
  let navigate = useNavigate();
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
  const { personsData } = usePersons(true, {
    limit: 60,
    offset: 0,
  });
  const { authProfile } = useAuthentication();
  const { mailAccountsData } = useMailAccounts(true, {
    limit: 60,
    offset: 0,
  });

  useEffect(() => {
    /*if (authProfile && authProfile?.team !== 24) {
      navigate("/people");
    }*/
  }, [authProfile]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6} md={6} xl={3}>
            <RemainingClicks
              isLoading={isLoading?.onPage}
              value={auth?.clicks_remaining || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={3}>
            <TotalPersonsCard isLoading={isLoading?.onPage} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={3}>
            <TotalMailAccounts />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={3}>
            <TotalScheduledEmailsCard
              isLoading={isLoading}
              value={total || 0}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="tw-mt-5">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography className="tw-text-lg tw-font-medium tw-pl-3">
              Scheduled Emails
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MyTable
              columns={_columns(
                getScheduledEmails,
                personsData,
                mailAccountsData
              )}
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
