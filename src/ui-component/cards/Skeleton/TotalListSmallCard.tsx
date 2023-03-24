import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

// ==============================|| SKELETON - TOTAL LIST CARD ||============================== //

const TotalListSmall = () => (
  <Card>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" height={30} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalListSmall;
