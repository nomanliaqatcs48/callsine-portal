import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import MyModal from "../modal/MyModal";

const CreateCampaign = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        disableElevation
        // disabled={isSubmitting}
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Create Campaign
      </Button>
      <MyModal
        open={open}
        onClose={handleClose}
        modalTitle="Create Campaign"
        labelledby="Create Campaign"
        describedby="create campaign modal"
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter name"
          type="text"
          fullWidth
          variant="standard"
        />

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </MyModal>
    </>
  );
};

export default CreateCampaign;
