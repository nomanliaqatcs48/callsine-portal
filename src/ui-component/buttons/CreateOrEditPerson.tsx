import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { gridSpacing } from "../../store/constant";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { devLogError } from "../../helpers/logs";
import {
  createMailAccountService,
  updateMailAccountService,
} from "../../services/mail-accounts.service";
import { emailAddressPattern } from "../../helpers/forms";
import { ToastContainer, toast } from "react-toastify";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import "react-toastify/dist/ReactToastify.css";

type CreateOrEditPersonTypes = {
  id?: number | undefined;
  btnText: string | React.ReactNode;
  onSubmit: any;
  onClick: any;
  btnVariant?: "text" | "outlined" | "contained" | undefined;
  defaultValue?: any;
  btnStyle?: any;
  [x: string]: any;
};

const CreateOrEditPerson = ({
  id,
  onSubmit,
  onClick,
  btnVariant = "text",
  defaultValue,
  btnStyle,
  btnText,
  ...other
}: CreateOrEditPersonTypes) => {
  const [open, setOpen] = React.useState(false);
  const [personLoading, setPersonLoading] = useState<any>({
    onPage: true,
    form: false,
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
    //
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onThisEditSubmit = async (data: any) => {
    setPersonLoading((beforeVal: any) => ({ ...beforeVal, form: true }));
    try {
      const res = await updateMailAccountService(defaultValue?.id, data);
      if (res?.data) {
        ToastSuccess("Person successfully updated.");

        onSubmit();
        handleClose();
        setPersonLoading((beforeVal: any) => ({
          ...beforeVal,
          form: false,
        }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setPersonLoading((beforeVal: any) => ({
        ...beforeVal,
        form: false,
      }));
    }
  };

  const onThisAddSubmit = async (data: any) => {
    setPersonLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createMailAccountService(data);
      if (res?.data) {
        ToastSuccess("New person successfully created.");

        onSubmit();
        handleClose();
        reset();
        setPersonLoading((prev: any) => ({ ...prev, form: false }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setPersonLoading((prev: any) => ({ ...prev, form: false }));
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
          aria-labelledby={`${id ? "Edit" : "Add"} Person`}
          aria-describedby={`${id ? "edit" : "add"} person modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4">{id ? "Edit" : "Add"} Person</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <TextField
                      error={!!errors.email}
                      disabled={personLoading?.form}
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
                      disabled={personLoading?.form}
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
                      disabled={personLoading?.form}
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
                        disabled={personLoading?.form}
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
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={personLoading?.form}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit((data) =>
                id ? onThisEditSubmit(data) : onThisAddSubmit(data)
              )}
              disabled={personLoading?.form}
              variant="outlined"
              color="primary"
            >
              {id ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ToastContainer />
    </>
  );
};

export default CreateOrEditPerson;
