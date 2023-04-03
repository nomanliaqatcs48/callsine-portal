import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import { useAuth } from "../../contexts/auth";
import TotalPersonsCard from "../../ui-component/cards/TotalPersons";
import TotalMailAccounts from "../../ui-component/cards/TotalMailAccounts";

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
              value={auth?.clicks_remaining}
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
    </Grid>
  );
};

export default DashboardPage;
