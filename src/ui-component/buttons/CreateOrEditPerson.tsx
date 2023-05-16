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
import { devLog, devLogError } from "../../helpers/logs";
import { updateMailAccountService } from "../../services/mail-accounts.service";
import { emailAddressPattern } from "../../helpers/forms";
import { ToastContainer, toast } from "react-toastify";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import "react-toastify/dist/ReactToastify.css";
import { createPeopleService } from "../../services/persons.service";
import { load, save } from "../../utils/storage";
import { profileService } from "../../services/profile.service";

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
    register("created_by", {
      required: "This is required field.",
    });
    register("modified_by", {
      required: "This is required field.",
    });
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let _profile = await load("profile");
      if (_profile) {
        // set created_by and modified_by
        setValue("created_by", _profile?.id);
        setValue("modified_by", _profile?.id);
      } else {
        let res = await profileService();
        if (res?.data) {
          await save("profile", res.data);

          // set created_by and modified_by
          setValue("created_by", res.data?.id);
          setValue("modified_by", res.data?.id);
        }
        devLog("res", res);
      }
    } catch (e) {
      devLogError(e);
    }
  };

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
      let res = await createPeopleService(data);
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

                  <div>
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
                  </div>

                  <div>
                    <TextField
                      error={!!errors.job_title}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="job_title"
                      label="Job Title"
                      type="text"
                      defaultValue={id ? defaultValue?.job_title : ""}
                      fullWidth
                      {...register("job_title", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="job_title"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.work_email}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="work_email"
                      label="Work Email"
                      type="text"
                      defaultValue={id ? defaultValue?.work_email : ""}
                      fullWidth
                      {...register("work_email", {
                        required: "This is required field.",
                        pattern: emailAddressPattern,
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="work_email"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.personal_email}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="personal_email"
                      label="Personal Email"
                      type="text"
                      defaultValue={id ? defaultValue?.personal_email : ""}
                      fullWidth
                      {...register("personal_email", {
                        required: "This is required field.",
                        pattern: emailAddressPattern,
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="personal_email"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.linkedin}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="linkedin"
                      label="Linkedin"
                      type="text"
                      defaultValue={id ? defaultValue?.linkedin : ""}
                      fullWidth
                      {...register("linkedin", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="linkedin"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.email_domain}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="email_domain"
                      label="Email Domain"
                      type="text"
                      defaultValue={id ? defaultValue?.email_domain : ""}
                      fullWidth
                      {...register("email_domain", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email_domain"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.city}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="city"
                      label="City"
                      type="text"
                      defaultValue={id ? defaultValue?.city : ""}
                      fullWidth
                      {...register("city", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="city"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      error={!!errors.state}
                      disabled={personLoading?.form}
                      required
                      margin="dense"
                      id="state"
                      label="State"
                      type="text"
                      defaultValue={id ? defaultValue?.state : ""}
                      fullWidth
                      {...register("state", {
                        required: "This is required field.",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="state"
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
