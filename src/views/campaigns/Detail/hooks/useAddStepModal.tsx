import React from "react";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MyModal from "../../../../ui-component/modal/MyModal";
import { gridSpacing } from "../../../../store/constant";

export const useAddStepModal = () => {
  const [addStepOpen, setAddStepOpen] = React.useState<boolean>(false);

  const handleAddStepClickOpen = () => {
    setAddStepOpen(true);
  };

  const handleAddStepClose = () => {
    setAddStepOpen(false);
  };

  const renderAddStepModal = () => {
    return (
      <MyModal
        open={addStepOpen}
        onClose={handleAddStepClose}
        modalTitle="Add Step"
        labelledby="Add Step"
        describedby="add step modal"
        modalSxStyle={{
          width: {
            xs: 300,
            sm: 600,
            md: 800,
            lg: 900,
            xl: 1200,
          },
        }}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item sm={7} xs={12}>
            column 1
            <Box component="form" noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  margin="dense"
                  id="day"
                  label="Day Number"
                  type="number"
                  fullWidth
                  defaultValue={1}
                />
              </div>
              <div>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  label="Step Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  required
                  margin="dense"
                  id="subject"
                  label="Email Subject"
                  type="text"
                  fullWidth
                />
              </div>
              <div>This is for email content (CKEditor)</div>
            </Box>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Grid>
              <Typography>Preview</Typography>
              <Grid className="preview-wrapper" />
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleAddStepClose}>Cancel</Button>
          <Button onClick={handleAddStepClose}>Create</Button>
        </DialogActions>
      </MyModal>
    );
  };

  return {
    addStepOpen,
    setAddStepOpen,
    handleAddStepClickOpen,
    handleAddStepClose,
    renderAddStepModal,
  };
};
