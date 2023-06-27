import React, { useEffect, useState } from "react";
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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { gridSpacing } from "../../store/constant";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { devLog, devLogError } from "../../helpers/logs";
import { updateMailAccountService } from "../../services/mail-accounts.service";
import MyEditor from "../editor/MyEditor";
import { emailAddressPattern } from "../../helpers/forms";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { updateProspectSequenceEventDetailService } from "../../services/sequences.service";

type CreateOrEditScheduledEmailTypes = {
  id?: number;
  personId: number;
  onLoadApi: any;
  onClick: any;
  defaultValue?: any;
  children?: any;
  [x: string]: any;
};

const CreateOrEditScheduledEmail = ({
  id,
  personId,
  onLoadApi,
  onClick,
  defaultValue,
  children,
  ...props
}: CreateOrEditScheduledEmailTypes) => {
  const [open, setOpen] = React.useState(false);
  const [scheduledEmailLoading, setScheduledEmailLoading] = useState({
    onPage: true,
    form: false,
    signature: false,
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("html_message", {
      required: "This is required field.",
    });
    setValueHtmlMsg();
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    setValue("html_message", value);
  };

  const setValueHtmlMsg = () => {
    if (defaultValue?.scheduledEmail?.text) {
      if (
        defaultValue?.scheduledEmail?.text &&
        defaultValue?.scheduledEmail?.text?.toLowerCase() !== "none"
      ) {
        setValue(
          "html_message",
          defaultValue?.scheduledEmail?.text?.replace(/\n/g, "<br />")
        );
      } else {
        setValue("html_message", "");
      }
    } else {
      if (
        defaultValue?.scheduledEmail?.html_message &&
        defaultValue?.scheduledEmail?.html_message?.toLowerCase() !== "none"
      ) {
        setValue(
          "html_message",
          defaultValue?.scheduledEmail?.html_message?.replace(/\n/g, "<br />")
        );
      } else {
        setValue("html_message", "");
      }
    }
  };

  const onThisEditSubmit = async (data: any) => {
    setScheduledEmailLoading((beforeVal: any) => ({
      ...beforeVal,
      form: true,
    }));
    try {
      const res = await updateProspectSequenceEventDetailService(
        Number(id),
        Number(personId),
        data
      );
      if (res?.data) {
        ToastSuccess("Scheduled email successfully updated.");

        onLoadApi();
        handleClose();
        setScheduledEmailLoading((beforeVal: any) => ({
          ...beforeVal,
          form: false,
        }));
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setScheduledEmailLoading((beforeVal: any) => ({
        ...beforeVal,
        form: false,
      }));
      return;
    }
  };

  /*const onThisAddSubmit = async (data: any) => {
    setScheduledEmailLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createMailAccountService(data);
      if (res?.data) {
        ToastSuccess("New scheduled email successfully created.");

        onLoadApi();
        handleClose();
        reset();
        setScheduledEmailLoading((prev: any) => ({ ...prev, form: false }));
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setScheduledEmailLoading((prev: any) => ({ ...prev, form: false }));
      return;
    }
  };*/

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          onClick();
        }}
        {...props}
      >
        {children}
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby={`${id ? "Edit" : "Edit"} Scheduled Email`}
          aria-describedby={`${id ? "edit" : "edit"} scheduled email modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4" className="tw-pt-10">
            {id ? "Edit" : "Edit"} Scheduled Email
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <Box className="tw-mb-1.5">
                    <MyEditor
                      initialValue={
                        id
                          ? defaultValue?.scheduledEmail?.html_message?.replace(
                              /\n/g,
                              "<br />"
                            )
                          : getValues("html_message")
                      }
                      onEditorChange={(value: string, editor: any) => {
                        handleMyEditorOnChange(value, editor);
                      }}
                      isPreformatted={false}
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
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleSubmit((data) =>
                id ? onThisEditSubmit(data) : onThisEditSubmit(data)
              )}
              disabled={scheduledEmailLoading?.form}
              variant="contained"
              color="primary"
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
            >
              {id ? "Edit" : "Edit"}
            </Button>
            <Button
              onClick={handleClose}
              disabled={scheduledEmailLoading?.form}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditScheduledEmail;
