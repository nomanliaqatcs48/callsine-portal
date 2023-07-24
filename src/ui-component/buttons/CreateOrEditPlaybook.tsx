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
import { _styles } from "../../utils/playbooks/utils";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

type CreateOrEditPlaybookTypes = {
  children: any;
  onLoadApi: any;
  onClick: any;
  id?: number;
  defaultValue?: any;
  selectedData?: any;
  [x: string]: any;
};

const CreateOrEditPlaybook = ({
  children,
  onLoadApi,
  onClick,
  id,
  defaultValue,
  selectedData,
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onThisEditSubmit = async (data: any) => {
    ToastSuccess("This functionality is in progress.");
    handleClose();
    return;
    setMailAccountLoading((beforeVal: any) => ({ ...beforeVal, form: true }));
    try {
      const res = await updateMailAccountService(defaultValue?.id, data);
      if (res?.data) {
        ToastSuccess("Prompt successfully updated.");

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
    ToastSuccess("This functionality is in progress.");
    handleClose();
    return;
    setMailAccountLoading((prev: any) => ({ ...prev, form: true }));
    try {
      let res = await createMailAccountService(data);
      if (res?.data) {
        ToastSuccess("New prompt successfully created.");

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
          maxWidth="lg"
          aria-labelledby={`${id ? "Edit" : "New"} Prompt`}
          aria-describedby={`${id ? "edit" : "add"} prompt modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle
            variant="h5"
            className="tw-text-black tw-bg-[#EAEAEA] tw-tracking-[0.36px] tw-font-normal tw-py-6"
          >
            {id ? "Edit" : "New"} Prompt
          </DialogTitle>
          <DialogContent className="tw-p-0">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box
                  className={`name-container ${_styles?.containers} tw-px-[24px] xl:tw-px-[24px]`}
                >
                  <div className="tw-flex tw-flex-col lg:tw-flex-row">
                    <div
                      className={`${_styles?.label} tw-w-full lg:tw-w-2/12 2xl:tw-w-2/12`}
                    >
                      Prompt Name:
                    </div>
                    <div
                      className={`${_styles?.labelValue} tw-w-full lg:tw-w-10/12 lg:tw-ml-3`}
                    >
                      <input
                        type="text"
                        className={`${_styles?.labelValueInput}`}
                        {...register("name", {
                          required: "This is required field.",
                        })}
                        defaultValue={selectedData?.name}
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
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  className={`message-container ${_styles?.containers} tw-border-b-0 tw-px-[24px] xl:tw-px-[24px]`}
                >
                  <Box className="tw-flex">
                    <Box
                      className={`${_styles?.message} tw-text-[12px] tw-text-black tw-py-3.5`}
                    >
                      <div
                        className={`${_styles?.labelValue} tw-w-full lg:tw-w-full xl:tw-w-full 2xl:tw-w-full 2xl:tw-pl-0`}
                      >
                        <textarea
                          rows={9}
                          className={`${_styles?.labelValueInput}`}
                          defaultValue={selectedData?.message}
                          {...register("message", {
                            required: "This is required field.",
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="message"
                          render={({ message }) => (
                            <FormHelperText sx={{ color: "error.main" }}>
                              {message}
                            </FormHelperText>
                          )}
                        />
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions className="tw-flex tw-justify-end tw-px-6 tw-pb-5">
            <Box>
              <Button
                onClick={handleSubmit((data) =>
                  id ? onThisEditSubmit(data) : onThisAddSubmit(data)
                )}
                disabled={mailAccountLoading?.form}
                variant="contained"
                color="primary"
                className="tw-bg-primary tw-font-medium hover:tw-bg-primaryDark tw-text-[13px] tw-px-[12px] tw-uppercase"
              >
                Save Prompt
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditPlaybook;
