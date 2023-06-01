import React, { useEffect, useState } from "react";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
} from "@mui/material";
import { gridSpacing } from "../../store/constant";
import moment from "moment/moment";
import { ErrorMessage } from "@hookform/error-message";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { devLog, devLogError } from "../../helpers/logs";
import { createAsEmailService } from "../../services/emails.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { LoadingButton } from "@mui/lab";

type SendLaterTypes = {
  onLoadApi: any;
  useForm: any;
  [x: string]: any;
};

const SendLater = ({ onLoadApi, useForm, ...props }: SendLaterTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
  });

  useEffect(() => {
    if (open) {
      useForm?.register("scheduled_time", {
        required: "This is required field.",
      });
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    useForm?.unregister("scheduled_time");
  };

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

  const onSubmit = async (data: any) => {
    devLog("onSubmit data", data);
    setIsLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createAsEmailService(data);
      if (res?.data) {
        ToastSuccess("Email successfully scheduled.");
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, form: false }));
        onLoadApi();
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  return (
    <>
      <LoadingButton
        onClick={useForm?.handleSubmit((data: any) => clickSendLater(data))}
        className="tw-py-2 tw-px-0 sm:tw-py-3 sm:tw-px-1 sm:tw-min-w-min"
        {...props}
      >
        <ScheduleSendOutlinedIcon sx={{ fontSize: 24, color: "#778da9" }} />
        <span className="tw-text-[#778da9] tw-text-xs tw-px-2">Send Later</span>
      </LoadingButton>

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
            <LoadingButton
              onClick={handleClose}
              disabled={isLoading?.form}
              loading={isLoading?.form}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              onClick={useForm?.handleSubmit((data: any) => onSubmit(data))}
              disabled={isLoading?.form}
              loading={isLoading?.form}
              variant="outlined"
              color="primary"
            >
              Send Later
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SendLater;
