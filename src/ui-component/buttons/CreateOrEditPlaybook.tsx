import React, { ChangeEvent, useState } from "react";

import { createPlaybooks } from "src/services/playbooks.service";
import { useReloadPlaybooks } from "../../hooks/playbook/useReloadPlaybooks";

import { useAuth } from "../../contexts/auth";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
} from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { insertBodyLoader, removeBodyLoader } from "src/helpers/loaders";
import { devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { _styles } from "../../utils/playbooks/utils";

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
  const { auth, updateProfile } = useAuth();

  const reloadPlaybooks = useReloadPlaybooks();
  const [nameValue, setNameValue] = useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [mailAccountLoading, setMailAccountLoading] = useState<any>({
    onPage: true,
    form: false,
    signature: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNameValue(event.target.value);
  };

  const onThisAddSubmit = async () => {
    insertBodyLoader();
    ToastSuccess("Adding playbook is in progress.");
    handleClose();

    const data = { name: nameValue, team: auth["team"] };
    try {
      let res = await createPlaybooks(data);
      if (res?.data) {
        await reloadPlaybooks();
        ToastSuccess("Successfully added playbook.");
        onLoadApi();
        handleClose();
        removeBodyLoader();
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      removeBodyLoader();
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
          aria-labelledby={`${id ? "Edit" : "New"} Playbook`}
          aria-describedby={`${id ? "edit" : "add"} Playbook modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle
            variant="h5"
            className="tw-text-black tw-bg-[#EAEAEA] tw-tracking-[0.36px] tw-font-normal tw-py-6"
          >
            <Box className="tw-flex tw-justify-between">
              <Box className="tw-text-[18px] tw-flex tw-flex-col tw-justify-center tw-align-middle">
                {id ? "Edit" : "New"} Playbook
              </Box>
              <Box>
                <Button className="tw-min-w-min" onClick={handleClose}>
                  <CloseIcon sx={{ color: "#A5A5A5", fontSize: 26 }} />
                </Button>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent className="tw-p-0">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box
                  className={`name-container ${_styles?.containers} tw-px-[24px] xl:tw-px-[24px]`}
                >
                  <div className="tw-flex tw-flex-col lg:tw-flex-row tw-flex-wrap">
                    <div className={`${_styles?.label} lg:tw-w-1/6`}>
                      Playbook Name:
                    </div>
                    <div className={`${_styles?.labelValue} lg:tw-w-5/6`}>
                      <input
                        type="text"
                        className={`${_styles?.labelValueInput} tw-w-full`}
                        {...register("name", {
                          required: "This is required field.",
                          onChange: handleChange,
                        })}
                        defaultValue=""
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
              {/* <Grid item xs={12}>
                <Box
                  className={`message-container ${_styles?.containers} tw-border-b-0 tw-px-[24px] xl:tw-px-[24px]`}
                >
                  <Box className="tw-flex">
                    <Box
                      className={`${_styles?.message} tw-text-[16px] tw-text-black tw-py-3.5`}
                    >
                      <Box
                        className={`tw-text-[18px] tw-text-black tw-truncate tw-font-normal tw-w-full lg:tw-w-full xl:tw-w-full 2xl:tw-w-full 2xl:tw-pl-0`}
                      >
                        <textarea
                          rows={9}
                          className={`${_styles?.labelValueInput} tw-w-full tw-text-[16px] placeholder:tw-text-[#B9B9B9] placeholder:tw-font-normal`}
                          defaultValue={selectedData?.message}
                          {...register("message", {
                            required: "This is required field.",
                          })}
                          placeholder="Playbook"
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
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
          </DialogContent>

          <DialogActions className="tw-flex tw-justify-end tw-px-6 tw-pb-5">
            <Box>
              <Button
                onClick={handleSubmit(() => onThisAddSubmit())}
                disabled={mailAccountLoading?.form}
                variant="contained"
                color="primary"
                className="tw-bg-primary tw-font-medium hover:tw-bg-primaryDark tw-text-[16px] tw-px-[26px] tw-py-[13px] tw-uppercase"
              >
                Save Playbook
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditPlaybook;
