import React, { useEffect, useState } from "react";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { gridSpacing } from "../../store/constant";
import moment from "moment/moment";
import { ErrorMessage } from "@hookform/error-message";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { devLog, devLogError } from "../../helpers/logs";
import {
  createAsEmailService,
  sendMailOauthService,
} from "../../services/emails.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { LoadingButton } from "@mui/lab";

type SendLaterTypes = {
  position: any;
  onLoadApi: any;
  useForm: any;
  [x: string]: any;
};

const SendLaterOauth = ({
  position,
  onLoadApi,
  useForm,
  ...props
}: SendLaterTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
  });
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      useForm?.register("scheduled_time", {
        required: "This is required field.",
      });
      useForm?.setValue("scheduled_time", null);

      setChecked(false);
    } else {
      useForm?.setValue(
        "scheduled_time",
        moment.utc().format("YYYY-MM-DD HH:mm:ss")
      );
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
    useForm?.setValue(
      "scheduled_time",
      moment.utc().format("YYYY-MM-DD HH:mm:ss")
    );
    setTimeout(() => setOpen(false));
  };

  const clickSendLater = (data: any) => {
    handleOpen();
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (!event.target.checked) {
      useForm?.unregister("days_interval");
    }
  };

  const handleChangeDaysInterval = (event: any) => {
    //
  };

  const handleChangeScheduledTime = (value: any) => {
    useForm?.setValue(
      "scheduled_time",
      moment.utc(value).format("YYYY-MM-DD HH:mm:ss")
    );
    useForm?.trigger("scheduled_time");
  };

  const onSubmit = async (data: any, event: any) => {
    devLog(() => {
      console.log("onSubmit data", data);
    });
    setIsLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await sendMailOauthService({
        ...data,
        send_later: true,
        is_auto_schedule: data?.is_auto_schedule,
        days_interval: data?.days_interval,
        in_reply_to: data?.id,
        from_email: data?.from_email,
        position: position,
        html_message: `<html><body>${
          data?.html_message +
          data?.signature.replace(/\n/g, "") +
          data?.parent_email_html_message.replace(/\n/g, "")
        }</body></html>`,
      });
      if (res?.data) {
        ToastSuccess("Email successfully scheduled.");
        handleClose(event, "");
        setIsLoading((prev: any) => ({ ...prev, form: false }));
        onLoadApi();
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
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
        <span className="tw-text-[#778da9] tw-text-xs tw-px-2">
          Send Later Via Mail Account
        </span>
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
          <DialogTitle variant="h4">Send Later Via Mail Account</DialogTitle>
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
                  <Grid item xs={12} className="tw-py-2">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...useForm?.register("is_auto_schedule")}
                            checked={checked}
                            onChange={handleChangeCheckbox}
                          />
                        }
                        label="Auto schedule other emails"
                      />
                    </FormGroup>
                  </Grid>
                </Box>
                <Box>
                  {checked && (
                    <>
                      <TextField
                        type="number"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        label="Enter number of days interval"
                        {...useForm?.register("days_interval", {
                          required: "This is required field.",
                        })}
                        onChange={handleChangeDaysInterval}
                      />
                      <ErrorMessage
                        errors={useForm?.errors}
                        name="days_interval"
                        render={({ message }) => (
                          <FormHelperText sx={{ color: "error.main" }}>
                            {message}
                          </FormHelperText>
                        )}
                      />
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              onClick={useForm?.handleSubmit((data: any, event: any) =>
                onSubmit(data, event)
              )}
              disabled={isLoading?.form}
              loading={isLoading?.form}
              variant="contained"
              color="primary"
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
            >
              Send
            </LoadingButton>
            <LoadingButton
              onClick={(event: any) => handleClose(event, "")}
              disabled={isLoading?.form}
              loading={isLoading?.form}
            >
              Cancel
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SendLaterOauth;
