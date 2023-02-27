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
      <Dialog open={open} fullWidth={true} maxWidth="xs" onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4">Create Campaign</Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCampaign;
