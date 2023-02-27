import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";
import MyModal from "../../../../ui-component/modal/MyModal";

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
          },
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <DialogActions>
          <Button onClick={handleAddStepClose}>Cancel</Button>
          <Button onClick={handleAddStepClose}>Add Step</Button>
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
