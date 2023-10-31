//@ts-nocheck

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
import { useEffect, useState } from "react";
import { patchPersonDetailService } from "src/services/persons.service";

function StatusDropdown({ status, id }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  console.log("STATUS DATA", status, id);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const handleChange = async (event: any) => {
    if (event.target.value !== "Open") {
      setDialogStatus(event.target.value);
      setOpenDialog(true);
    } else {
      setLocalStatus(event.target.value);
      try {
        // Prepare the payload to send to the backend
        const payload = {
          status: event.target.value, // assuming the backend expects a field named 'status'
        };
        // Call patchPersonDetailService to send the updated status to the backend
        const responseData = await patchPersonDetailService(id, payload);
        console.log("Update successful:", responseData);
      } catch (error) {
        console.error("Failed to update status:", error);
        // Optionally, you could revert the local status back to the original status
        // setLocalStatus(status);
      }
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    setLocalStatus(dialogStatus); // or whatever status was selected
    setOpenDialog(false);
    try {
      // Prepare the payload to send to the backend
      const payload = {
        status: dialogStatus, // assuming the backend expects a field named 'status'
      };
      // Call patchPersonDetailService to send the updated status to the backend
      const responseData = await patchPersonDetailService(id, payload);
      console.log("Update successful:", responseData);
    } catch (error) {
      console.error("Failed to update status:", error);
      // Optionally, you could revert the local status back to the original status
      // setLocalStatus(status);
    }
  };
  return (
    <>
      <Select
        value={localStatus}
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
