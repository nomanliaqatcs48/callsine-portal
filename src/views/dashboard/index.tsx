import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import { useAuth } from "../../contexts/auth";
import TotalPersonsCard from "../../ui-component/cards/TotalPersons";
import TotalMailAccounts from "../../ui-component/cards/TotalMailAccounts";
import CallsineDataGrid from "../../ui-component/tables/CallsineDataGrid";
import CallsineBarChart from "../../ui-component/charts/CallsineBarChart";
import CallsineLineChart from "../../ui-component/charts/CallsineLineChart";

const DashboardPage = () => {
  const auth: any = useAuth();
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    setIsLoading((prev: any) => ({ ...prev, onPage: false }));
  }, []);

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
      {/*<Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
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
            <CallsineDataGrid />
          </Grid>
        </Grid>
      </Grid>*/}
    </Grid>
  );
};

export default DashboardPage;
