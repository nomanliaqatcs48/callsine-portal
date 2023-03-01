import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";

const DashboardPage = () => {
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
            <RemainingClicks isLoading={isLoading?.onPage} value={90} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
