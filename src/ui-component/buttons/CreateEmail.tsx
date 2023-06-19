import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyEditor from "../editor/MyEditor";
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
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import xss from "xss";
import { gridSpacing } from "../../store/constant";
import { ErrorMessage } from "@hookform/error-message";
import { devLog, devLogError } from "../../helpers/logs";
import { emailAddressPattern } from "../../helpers/forms";
import { useEmailsTab } from "../../hooks/persons/useEmailsTab";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { createAsEmailService } from "../../services/emails.service";
import { usePersonDetail } from "../../hooks/persons/usePersonDetail";
import { ToastError, ToastSuccess } from "../../helpers/toast";

type CreateEmailTypes = {
  html_message: any;
  handleEditorPreview: any;
  buttonText: string;
  [x: string]: any;
};

const CreateEmail = ({
  html_message,
  handleEditorPreview,
  buttonText,
  ...props
}: CreateEmailTypes) => {
  const { id: personId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [parentEmailData, setParentEmailData] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
    from_email: false,
    subject: false,
  });
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    trigger,
    setError,
    formState: { errors },
  } = useForm();
  const { emails } = useEmailsTab(open);
  const { mailAccountsData } = useMailAccounts(open);
  let { data: personDetail, isLoading: isPersonLoading } =
    usePersonDetail(open);

  useEffect(() => {
    if (open) {
      [
        "in_reply_to",
        "person",
        "from_email",
        "html_message",
        "scheduled_time",
      ].map((item: any) => {
        // register
        if (item !== "in_reply_to") {
          register(item, { required: "This is required field." });
        } else {
          register(item);
        }

        // set values
        if (item === "person") {
          setValue("person", Number(personId));
        } else if (item === "html_message") {
          setValue("html_message", html_message.replace(/\n/g, "<br />"));
        }

        setValue("to", personDetail?.work_email);
      });
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleChangeParentEmail = (event: SelectChangeEvent) => {
    let { id, from_email, to, subject }: any = event.target.value || "";
    setValue("in_reply_to", id);
    trigger("in_reply_to");

    setIsLoading((prev: any) => ({ ...prev, from_email: true, subject: true }));
    if (event.target.value) {
      setParentEmailData(event.target.value);
      setValue("from_email", from_email as string);
      setValue("to", to);
      setValue("subject", subject);
      setTimeout(() =>
        setIsLoading((prev: any) => ({
          ...prev,
          from_email: false,
          subject: false,
        }))
      );
    } else {
      setParentEmailData("");
      setValue("from_email", "");
      setValue("to", personDetail?.work_email);
      setValue("subject", "");
      setTimeout(() =>
        setIsLoading((prev: any) => ({
          ...prev,
          from_email: false,
          subject: false,
        }))
      );
    }
  };

  const handleChangeFromEmail = (event: SelectChangeEvent) => {
    setValue("from_email", event.target.value);
    trigger("from_email");
  };

  const handleChangeScheduledTime = (value: any) => {
    let _parentDate = moment.utc(parentEmailData?.scheduled_time);
    let _thisScheduledDate = moment.utc(value);
    let _diff = _parentDate.diff(_thisScheduledDate);

    /*if (_diff >= 0) {
      setError("scheduled_time", {
        type: "custom",
        message: "Scheduled time should be AFTER parent email’s scheduled time",
      });
      return;
    }*/

    setValue("scheduled_time", moment.utc(value).format("YYYY-MM-DD HH:mm:ss"));
    trigger("scheduled_time");
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    value = `<html><body>${value}</body></html>`;
    devLog(() => {
      console.log("handleMyEditorOnChange() value", value);
    });
    setValue("html_message", value);
    handleEditorPreview(value);
  };

  const handlePreview = (data: any) => {
    let _preview: any = document.querySelector(".preview-wrapper");
    if (_preview) {
      if (data) {
        setTimeout(() => {
          _preview.innerHTML = xss(data);
        }, 500);
      } else {
        setTimeout(() => {
          _preview.innerHTML = "";
        }, 200);
      }
    }
  };

  const onSubmit = async (data: any) => {
    devLog(() => {
      console.log("onSubmit data", data);
    });
    setIsLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createAsEmailService(data);
      if (res?.data) {
        ToastSuccess("Email successfully created.");
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpen} {...props}>
        {buttonText}
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby="Create Email"
          aria-describedby="Create Email"
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4">Create Email</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <FormControl
                      fullWidth
                      error={!!errors.in_reply_to}
                      margin="dense"
                      disabled={isLoading?.form}
                    >
                      <InputLabel id="in_reply_to">Parent Email</InputLabel>
                      <Select
                        labelId="in_reply_to"
                        id="in_reply_to"
                        label="Parent Email"
                        defaultValue={""}
                        onChange={handleChangeParentEmail}
                      >
                        {!emails?.length && (
                          <MenuItem value="" disabled>
                            No data available.
                          </MenuItem>
                        )}

                        {emails?.length > 0 && (
                          <MenuItem value="">Please select</MenuItem>
                        )}

                        {emails?.length > 0 &&
                          emails.map((item: any) => {
                            return (
                              <MenuItem value={item} key={item?.id}>
                                ID: {item?.id} <br />
                                Subject: {item?.subject} <br />
                                Scheduled Time:{" "}
                                {moment(item?.scheduled_time).format(
                                  "YYYY-MM-DD hh:mm:ss A"
                                )}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="in_reply_to"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  {!isLoading?.from_email && (
                    <div>
                      <FormControl
                        fullWidth
                        error={!!errors.from_email}
                        margin="dense"
                        required
                        disabled={isLoading?.form || getValues("in_reply_to")}
                      >
                        <InputLabel id="from_email">From:</InputLabel>
                        <Select
                          labelId="from_email"
                          id="from_email"
                          label="From:"
                          defaultValue={getValues("from_email")}
                          onChange={handleChangeFromEmail}
                        >
                          {!mailAccountsData?.length && (
                            <MenuItem value="">No data available.</MenuItem>
                          )}

                          {mailAccountsData?.length > 0 &&
                            mailAccountsData.map((item: any, idx: number) => {
                              return (
                                <MenuItem value={item?.id} key={idx}>
                                  {item?.email}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <ErrorMessage
                        errors={errors}
                        name="from_email"
                        render={({ message }) => (
                          <FormHelperText sx={{ color: "error.main" }}>
                            {message}
                          </FormHelperText>
                        )}
                      />
                    </div>
                  )}

                  {!isPersonLoading?.onPage && (
                    <div>
                      <TextField
                        error={!!errors.to}
                        disabled={isLoading?.form || getValues("in_reply_to")}
                        required
                        margin="dense"
                        id="to"
                        label="To:"
                        type="email"
                        defaultValue={personDetail?.work_email}
                        fullWidth
                        {...register("to", {
                          required: "This is required field.",
                          pattern: emailAddressPattern,
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="to"
                        render={({ message }) => (
                          <FormHelperText sx={{ color: "error.main" }}>
                            {message}
                          </FormHelperText>
                        )}
                      />
                    </div>
                  )}

                  {!isLoading?.subject && (
                    <div>
                      <TextField
                        error={!!errors.subject}
                        disabled={isLoading?.form || getValues("in_reply_to")}
                        required
                        margin="dense"
                        id="subject"
                        label="Subject"
                        type="text"
                        defaultValue={""}
                        fullWidth
                        {...register("subject", {
                          required: "This is required field.",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="subject"
                        render={({ message }) => (
                          <FormHelperText sx={{ color: "error.main" }}>
                            {message}
                          </FormHelperText>
                        )}
                      />
                    </div>
                  )}

                  <div style={{ marginTop: 5 }} />

                  <div>
                    <MyEditor
                      initialValue={getValues("html_message")}
                      onEditorChange={(value: string, editor: any) => {
                        handleMyEditorOnChange(value, editor);
                      }}
                      // isPreformatted={true}
                      onFocus={(e: any) => null}
                    />
                    {/*<TextField
                      error={!!errors.html_message}
                      disabled={isLoading?.form}
                      required
                      multiline
                      margin="dense"
                      id="html_message"
                      label="Message"
                      type="text"
                      defaultValue={html_message}
                      fullWidth
                      rows={16}
                      {...register("html_message", {
                        required: "This is required field.",
                      })}
                    />*/}
                    <ErrorMessage
                      errors={errors}
                      name="html_message"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  {/*date time picker*/}
                  <Grid item xs={11} sm={7} md={5} lg={4} xl={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Scheduled Time"
                          onChange={(newValue) =>
                            handleChangeScheduledTime(newValue)
                          }
                          disabled={isLoading?.form}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <ErrorMessage
                      errors={errors}
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
            <Button onClick={handleClose} disabled={isLoading?.form}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={isLoading?.form}
              variant="outlined"
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateEmail;
