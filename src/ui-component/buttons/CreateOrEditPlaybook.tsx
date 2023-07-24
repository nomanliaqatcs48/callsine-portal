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
                      className={`${_styles?.label} tw-w-full lg:tw-w-2/12 xl:tw-w-1/12`}
                    >
                      Prompt Name:
                    </div>
                    <div
                      className={`${_styles?.labelValue} tw-w-full lg:tw-w-10/12 lg:tw-ml-3 xl:tw-w-11/12`}
                    >
                      <input
                        type="text"
                        className={`${_styles?.labelValueInput}`}
                        {...register("name", {
                          required: "This is required field.",
                        })}
                        defaultValue="Playbook 1"
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
                  className={`message-container ${_styles?.containers} tw-px-[24px] xl:tw-px-[24px]`}
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
