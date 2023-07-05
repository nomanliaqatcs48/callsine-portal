import React from "react";
import { Grid } from "@mui/material";
import CustomFieldsCol from "../../views/persons/Detail/components/CustomFieldsCol";

const CustomFieldsTab = ({ data }: any) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          xl={"auto"}
          className="xl:tw-p-9 xl:tw-w-1/2 3xl:tw-w-3/5"
        >
          <CustomFieldsCol data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomFieldsTab;
