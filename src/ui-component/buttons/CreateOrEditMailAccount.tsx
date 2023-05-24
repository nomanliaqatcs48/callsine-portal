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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
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
import { ToastContainer, toast } from "react-toastify";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import "react-toastify/dist/ReactToastify.css";

type CreateOrEditMailAccountTypes = {
  id?: number | undefined;
  btnText: string | React.ReactNode;
  onSubmit: any;
  onClick: any;
  btnVariant?: "text" | "outlined" | "contained" | undefined;
  defaultValue?: any;
  btnStyle?: any;
  [x: string]: any;
};

const CreateOrEditMailAccount = ({
  id,
  onSubmit,
  onClick,
  btnVariant = "text",
  defaultValue,
  btnStyle,
  btnText,
  ...other
}: CreateOrEditMailAccountTypes) => {
  const [open, setOpen] = React.useState(false);
  const [mailAccountLoading, setMailAccountLoading] = useState<any>({
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
    register("provider", {
      required: "This is required field.",
    });
    register("signature");
    setValue("provider", id ? defaultValue?.provider : null);
  }, []);

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

        onSubmit();
        handleClose();
        setMailAccountLoading((beforeVal: any) => ({
          ...beforeVal,
          form: false,
        }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setMailAccountLoading((beforeVal: any) => ({
        ...beforeVal,
        form: false,
      }));
    }
  };

  const onThisAddSubmit = async (data: any) => {
    setMailAccountLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createMailAccountService(data);
      if (res?.data) {
        ToastSuccess("New mail account successfully created.");

        onSubmit();
        handleClose();
        reset();
        setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  const testMailAccount = async () => {
    setMailAccountLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let response = await testMailAccountService(Number(id));
      if (response) {
        devLog("testMailAccount() response", response);
        setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch ({ response }) {
      ToastError("Failed!");
      devLogError(response);
      setMailAccountLoading((prev: any) => ({ ...prev, form: false }));
    }
  };

  return (
    <>
      <Button
        disableElevation
        type="button"
        variant={btnVariant}
        color="primary"
        onClick={() => {
          handleOpen();
          onClick();
        }}
        style={btnStyle}
        {...other}
      >
        {btnText}
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby={`${id ? "Edit" : "Add"} Mail Account`}
          aria-describedby={`${id ? "edit" : "add"} mail account modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4" className="tw-pt-10">
            {id ? "Edit" : "Add"} Mail Account
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <TextField
                      error={!!errors.email}
                      disabled={mailAccountLoading?.form}
                      required
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      defaultValue={id ? defaultValue?.email : ""}
                      fullWidth
                      {...register("email", {
                        required: "This is required field.",
                        pattern: emailAddressPattern,
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>
                  <div>
                    <TextField
                      error={!!errors.password}
                      disabled={mailAccountLoading?.form}
                      required
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      defaultValue={id ? defaultValue?.password : ""}
                      fullWidth
                      {...register("password", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.first_name}
                      disabled={mailAccountLoading?.form}
                      required
                      margin="dense"
                      id="first_name"
                      label="First Name"
                      type="text"
                      defaultValue={id ? defaultValue?.first_name : ""}
                      fullWidth
                      {...register("first_name", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="first_name"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        error={!!errors.last_name}
                        disabled={mailAccountLoading?.form}
                        required
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        defaultValue={id ? defaultValue?.last_name : ""}
                        fullWidth
                        {...register("last_name", {
                          required: "This is required field.",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="last_name"
                        render={({ message }) => (
                          <FormHelperText sx={{ color: "error.main" }}>
                            {message}
                          </FormHelperText>
                        )}
                      />
                    </Grid>
                  </Grid>

                  <div>
                    <MyEditor
                      initialValue={
                        id ? defaultValue?.signature : getValues("signature")
                      }
                      onEditorChange={(value: string, editor: any) => {
                        handleMyEditorOnChange(value, editor);
                      }}
                      isPreformatted={false}
                      onFocus={(e: any) => null}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="signature"
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
                      error={!!errors.provider}
                      margin="dense"
                      required
                      disabled={mailAccountLoading?.form}
                    >
                      <InputLabel id="provider-label">Provider</InputLabel>
                      <Select
                        labelId="provider-label"
                        id="provider"
                        label="Provider"
                        defaultValue={id ? defaultValue?.provider : ""}
                        onChange={handleChangeProvider}
                      >
                        <MenuItem value="gmail">GMail</MenuItem>
                        <MenuItem value="outlook">Outlook</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      errors={errors}
                      name="provider"
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

          <DialogActions
            className={`tw-flex ${
              id ? "tw-justify-between" : "tw-justify-end"
            } tw-px-6 tw-pb-10`}
          >
            <div>
              <Button onClick={handleClose} disabled={mailAccountLoading?.form}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit((data) =>
                  id ? onThisEditSubmit(data) : onThisAddSubmit(data)
                )}
                disabled={mailAccountLoading?.form}
                variant="outlined"
                color="primary"
              >
                {id ? "Edit" : "Add"}
              </Button>
            </div>
            {id && (
              <Button
                onClick={testMailAccount}
                disabled={mailAccountLoading?.form}
                variant="outlined"
                color="primary"
              >
                Test
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
      <ToastContainer />
    </>
  );
};

export default CreateOrEditMailAccount;
