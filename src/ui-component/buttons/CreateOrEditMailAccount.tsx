import React, { useState } from "react";
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

import { updateMailAccountService } from "../../services/mail-accounts.service";
import MyEditor from "../editor/MyEditor";

import { ToastError, ToastSuccess } from "../../helpers/toast";
import { devLogError } from "src/helpers/logs";

type CreateOrEditMailAccountTypes = {
  id?: number;
  children?: any;
  onLoadApi?: any;
  defaultValue?: any;
  onClick: any;
  [x: string]: any;
};

const CreateOrEditMailAccount = ({
  id,
  children,
  onLoadApi,
  defaultValue,
  onClick,
  ...props
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

  console.log({ defaultValue });

  // useEffect(() => {
  //   register("provider", {
  //     required: "This is required field.",
  //   });
  //   register("signature");
  //   setValue("provider", id ? defaultValue?.provider : null);
  // }, [register, setValue, id, defaultValue.provider]);

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
    console.log({ data });
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

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          onClick();
        }}
        className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-primary"
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
          aria-labelledby={`${id ? "Edit" : "Add"} Mail Account`}
          aria-describedby={`${id ? "edit" : "add"} mail account modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle
            variant="h4"
            className="tw-text-[18px] tw-text-black tw-bg-[#EAEAEA] tw-font-normal tw-tracking-[0.36px]"
          >
            {id ? "Edit" : "Add"} Mail Account
          </DialogTitle>
          <DialogContent className="tw-my-[20px]">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <TextField
                      error={!!errors.email}
                      // disabled={true}
                      required
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      defaultValue={defaultValue?.email}
                      value={defaultValue?.email}
                      fullWidth
                      {...register("email")}
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
                        // {...register("last_name", {
                        //   required: "This is required field.",
                        // })}
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

                  <div className="tw-mb-2.5">
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
                        disabled={true}
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

                  <Box className="tw-mb-1.5">
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
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions
            className={`tw-flex ${
              id ? "tw-justify-between" : "tw-justify-end"
            } tw-pt-0 tw-pb-[30px] lg:tw-px-[24px]`}
          >
            <div>
              <Button
                onClick={handleSubmit((data) => onThisEditSubmit(data))}
                disabled={mailAccountLoading?.form}
                variant="contained"
                color="primary"
                className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case tw-mr-[5px]"
              >
                {id ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={mailAccountLoading?.form}
              >
                Cancel
              </Button>
            </div>
            {/* {id && (
              <Button
                onClick={testMailAccount}
                disabled={mailAccountLoading?.form}
                variant="outlined"
                color="primary"
              >
                Test
              </Button>
            )} */}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditMailAccount;
