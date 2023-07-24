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
import {
  createMailAccountService,
  testMailAccountService,
  updateMailAccountService,
} from "../../services/mail-accounts.service";
import MyEditor from "../editor/MyEditor";
import { emailAddressPattern } from "../../helpers/forms";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type CreateOrEditPlaybookTypes = {
  id?: number;
  children?: any;
  onLoadApi?: any;
  defaultValue?: any;
  onClick: any;
  [x: string]: any;
};

const CreateOrEditPlaybook = ({
  id,
  children,
  onLoadApi,
  defaultValue,
  onClick,
  ...props
}: CreateOrEditPlaybookTypes) => {
  const [open, setOpen] = React.useState(false);
  const [mailAccountLoading, setMailAccountLoading] = useState<any>({
    onPage: true,
    form: false,
    signature: false,
  });
  const [showPassword, setShowPassword] = useState(false);

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
    register("provider", {
      required: "This is required field.",
    });
    register("signature");
    setValue("provider", id ? defaultValue?.provider : null);
    setShowPassword(false);
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleChangeProvider = (event: SelectChangeEvent) => {
    setValue("provider", event.target.value as string);
    trigger("provider");
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    setValue("signature", value);
  };

  const onThisEditSubmit = async (data: any) => {
    setMailAccountLoading((beforeVal: any) => ({ ...beforeVal, form: true }));
    try {
      const res = await updateMailAccountService(defaultValue?.id, data);
      if (res?.data) {
        ToastSuccess("Mail account successfully updated.");

        onLoadApi();
        handleClose();
        setMailAccountLoading((beforeVal: any) => ({
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
      setMailAccountLoading((beforeVal: any) => ({
        ...beforeVal,
        form: false,
      }));
      return;
    }
  };

  const onThisAddSubmit = async (data: any) => {
    setMailAccountLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createMailAccountService(data);
      if (res?.data) {
        ToastSuccess("New mail account successfully created.");

        onLoadApi();
        handleClose();
        reset();
        setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
      return;
    }
  };

  const testMailAccount = async () => {
    setMailAccountLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let response = await testMailAccountService(Number(id));
      if (response) {
        devLog(() => {
          console.log("testMailAccount() response", response);
        });
        ToastSuccess("Successfully tested.");
        setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch (e: any) {
      ToastError("Failed!");
      devLogError(() => {
        console.error(e?.response);
      });
      setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

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
          aria-labelledby={`${id ? "Edit" : "New"} Prompt`}
          aria-describedby={`${id ? "edit" : "add"} playbook modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4" className="tw-pt-10">
            {id ? "Edit" : "New"} Prompt
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <Box>
                    <TextField
                      error={!!errors.email}
                      disabled={mailAccountLoading?.form}
                      required
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      defaultValue={id ? defaultValue?.name : ""}
                      fullWidth
                      {...register("name", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
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

          <DialogActions
            className={`tw-flex ${
              id ? "tw-justify-between" : "tw-justify-end"
            } tw-px-6 tw-pb-10`}
          >
            <Box>
              <Button
                onClick={handleSubmit((data) =>
                  id ? onThisEditSubmit(data) : onThisAddSubmit(data)
                )}
                disabled={mailAccountLoading?.form}
                variant="contained"
                color="primary"
                className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
              >
                {id ? "Edit" : "Save Prompt"}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditPlaybook;
