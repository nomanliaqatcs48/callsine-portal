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
  TextField,
} from "@mui/material";
import xss from "xss";
import { gridSpacing } from "../../store/constant";
import { ErrorMessage } from "@hookform/error-message";
import { devLog } from "../../helpers/logs";
import { emailAddressPattern } from "../../helpers/forms";

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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
  });
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("html_message");
    setValue("html_message", html_message);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
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
    devLog("onSubmit data", data);
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
          aria-labelledby="Send as Email"
          aria-describedby="Send as Email"
        >
          <DialogTitle variant="h4">Send as Email</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <FormControl
                      fullWidth
                      error={!!errors.in_reply_to}
                      margin="dense"
                      required
                      disabled={isLoading?.form}
                    >
                      <InputLabel id="in_reply_to">Parent Email</InputLabel>
                      <Select
                        labelId="in_reply_to"
                        id="in_reply_to"
                        label="Parent Email"
                        defaultValue={""}
                        onChange={() => null}
                      >
                        <MenuItem value="parent_email_1">
                          Parent Email 1
                        </MenuItem>
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

                  <div>
                    <FormControl
                      fullWidth
                      error={!!errors.from_email}
                      margin="dense"
                      required
                      disabled={isLoading?.form}
                    >
                      <InputLabel id="from_email">From:</InputLabel>
                      <Select
                        labelId="from_email"
                        id="from_email"
                        label="From:"
                        defaultValue={""}
                        onChange={() => null}
                      >
                        <MenuItem value="from_email_1">From Email 1</MenuItem>
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

                  <div>
                    <TextField
                      error={!!errors.to}
                      disabled={isLoading?.form}
                      required
                      margin="dense"
                      id="to"
                      label="To:"
                      type="email"
                      defaultValue={""}
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

                  <div>
                    <TextField
                      error={!!errors.subject}
                      disabled={isLoading?.form}
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

                  <div style={{ marginTop: 5 }} />

                  <div>
                    <MyEditor
                      initialValue={getValues("html_message")}
                      onEditorChange={(value: string, editor: any) => {
                        handleMyEditorOnChange(value, editor);
                      }}
                      isPreformatted={true}
                      onFocus={(e: any) => null}
                    />
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

                  <div>
                    <TextField
                      error={!!errors.scheduled_time}
                      disabled={isLoading?.form}
                      required
                      margin="dense"
                      id="scheduled_time"
                      label="Scheduled Time"
                      type="text"
                      defaultValue={""}
                      fullWidth
                      {...register("scheduled_time", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="scheduled_time"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>
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
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateEmail;
