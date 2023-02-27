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
      <Dialog
        open={addStepOpen}
        fullWidth={true}
        maxWidth="xs"
        onClose={handleAddStepClose}
      >
        <DialogTitle>
          <Typography variant="h4">Add Step</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddStepClose}>Cancel</Button>
          <Button onClick={handleAddStepClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
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
