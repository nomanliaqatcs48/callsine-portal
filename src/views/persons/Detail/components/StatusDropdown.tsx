import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

function StatusDropdown() {
  const [status, setStatus] = useState("Open");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState("");

  const handleChange = (event: any) => {
    if (event.target.value !== "Open") {
      setDialogStatus(event.target.value);
      setOpenDialog(true);
    } else {
      setStatus(event.target.value);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setStatus(dialogStatus); // or whatever status was selected
    setOpenDialog(false);
  };

  return (
    <>
      <Select
        value={status}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="DNC">DNC</MenuItem>
        <MenuItem value="Wrong Contact">Wrong Contact</MenuItem>
        <MenuItem value="Bounced">Bounced</MenuItem>
        <MenuItem value="In Conversation">In Conversation</MenuItem>
      </Select>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you move the Person to a status other than open, the Person will
            be removed from outreach and any emails scheduled will be skipped.
            Are you sure you want to change the status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Yes, Change the Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StatusDropdown;
