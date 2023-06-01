import React, { useState } from "react";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { gridSpacing } from "../../store/constant";
import moment from "moment/moment";
import { ErrorMessage } from "@hookform/error-message";
import { emailAddressPattern } from "../../helpers/forms";
import MyEditor from "../editor/MyEditor";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { devLog } from "../../helpers/logs";

const SendLater = ({ onSubmit, useForm }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickSendLater = (data: any) => {
    handleOpen();
  };

  const handleChangeScheduledTime = (value: any) => {
    // let _parentDate = moment.utc(parentEmailData?.scheduled_time);
    // let _thisScheduledDate = moment.utc(value);
    // let _diff = _parentDate.diff(_thisScheduledDate);

    /*if (_diff >= 0) {
      setError("scheduled_time", {
        type: "custom",
        message: "Scheduled time should be AFTER parent email’s scheduled time",
      });
      return;
    }*/

    useForm?.setValue(
      "scheduled_time",
      moment.utc(value).format("YYYY-MM-DD HH:mm:ss")
    );
    useForm?.trigger("scheduled_time");
  };

  return (
    <>
      <Button
        onClick={useForm?.handleSubmit((data: any) => clickSendLater(data))}
        className="tw-py-2 tw-px-0 sm:tw-py-3 sm:tw-px-1 sm:tw-min-w-min"
      >
        <ScheduleSendOutlinedIcon sx={{ fontSize: 24, color: "#778da9" }} />
        <span className="tw-text-[#778da9] tw-text-xs tw-px-2">Send Later</span>
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          // fullWidth={true}
          // maxWidth="xl"
          aria-labelledby="Send Later"
          aria-describedby="Send Later"
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4">Send Later</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  {/*date time picker*/}
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Scheduled Time"
                          onChange={(newValue) =>
                            handleChangeScheduledTime(newValue)
                          }
                          // disabled={isLoading?.form}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <ErrorMessage
                      errors={useForm?.errors}
                      name="scheduled_time"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              // disabled={isLoading?.form}
            >
              Cancel
            </Button>
            <Button
              onClick={useForm?.handleSubmit((data: any) => onSubmit(data))}
              // disabled={isLoading?.form}
              variant="outlined"
              color="primary"
            >
              Send Later
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SendLater;
