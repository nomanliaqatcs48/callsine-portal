import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import { useAuth } from "../../contexts/auth";

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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
