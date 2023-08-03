import { ErrorMessage } from "@hookform/error-message";
import CloseIcon from "@mui/icons-material/Close";
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
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { _styles } from "../../utils/playbooks/utils";
import { Prompt } from "../../utils/types/prompt";

import { insertBodyLoader, removeBodyLoader } from "src/helpers/loaders";
import {
  createPromptService,
  updatePromptService,
} from "src/services/prompts.service";
import { useReloadPlaybooks } from "../../hooks/playbook/useReloadPlaybooks";

type CreateOrEditPlaybookTypes = {
  children: any;
  onLoadApi: any;
  onClick: any;
  id?: number;
  defaultValue?: any;
  selectedData?: any;
  setPromptList?: any;
  [x: string]: any;
};

const CreateOrEditPlaybook = ({
  children,
  onLoadApi,
  onClick,
  selectedData,
  id,
  defaultValue,
  isLoading,
  setPromptList,
  ...props
}: CreateOrEditPlaybookTypes) => {
  const reloadPlaybooks = useReloadPlaybooks();
  const [open, setOpen] = React.useState(false);
  const [promptValue, setPromptValue] = useState<any>("");

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
    setPromptValue(event.target.value);
  };

  const onThisEditSubmit = async (id: number) => {
    insertBodyLoader();
    ToastSuccess("Update on this prompt is in progress.");
    handleClose();
    const data = { text: promptValue };
    try {
      let res = await updatePromptService(id, data);
      if (res?.data) {
        await reloadPlaybooks();
        onLoadApi();
        handleClose();

        setPromptList((prevPromptList: Prompt[]) =>
          prevPromptList.map((prompt: Prompt) =>
            prompt.id === id ? res.data : prompt
          )
        );
        removeBodyLoader();

        ToastSuccess("Successfully updated prompt.");
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

  const onThisAddSubmit = async () => {
    insertBodyLoader();
    ToastSuccess("Adding new prompt");
    handleClose();
    const payload = { text: promptValue, playbook: selectedData.id };
    devLog(() => {
      console.log(payload);
    });
    try {
      let res = await createPromptService(payload);
      if (res?.data) {
        await reloadPlaybooks();
        onLoadApi();
        handleClose();
        setPromptList((prevPromptList: any) => [...prevPromptList, res.data]);
        removeBodyLoader();
        ToastSuccess("New prompt successfully created.");
        devLog(() => {
          console.log(res.data);
        });
        reset();
      }
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
          aria-labelledby={`${id ? "Edit" : "New"} Prompt`}
          aria-describedby={`${id ? "edit" : "add"} prompt modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle
            variant="h5"
            className="tw-text-black tw-bg-[#EAEAEA] tw-tracking-[0.36px] tw-font-normal tw-py-6"
          >
            <Box className="tw-flex tw-justify-between">
              <Box className="tw-text-[18px] tw-flex tw-flex-col tw-justify-center tw-align-middle">
                {id ? "Edit" : "Add New"} Prompt
              </Box>
              <Box>
                <Button className="tw-min-w-min" onClick={handleClose}>
                  <CloseIcon sx={{ color: "#A5A5A5", fontSize: 26 }} />
                </Button>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent className="tw-p-0" style={{ width: "100%" }}>
            <Grid container spacing={0} style={{ width: "100%" }}>
              <Grid item xs={12} style={{ width: "100%" }}>
                <Box
                  className={`message-container ${_styles?.containers} tw-border-b-0 tw-px-[24px] xl:tw-px-[24px]`}
                  style={{ width: "100%" }}
                >
                  <Box className="tw-flex" style={{ width: "100%" }}>
                    <Box
                      className={`${_styles?.message} tw-text-[16px] tw-text-black tw-py-3.5`}
                      style={{ width: "100%" }}
                    >
                      <Box
                        className={`tw-text-[18px] tw-text-black tw-truncate tw-font-normal tw-w-full lg:tw-w-full xl:tw-w-full 2xl:tw-w-full 2xl:tw-pl-0`}
                        style={{ width: "100%" }}
                      >
                        <textarea
                          rows={9}
                          className={`${_styles?.labelValueInput} tw-text-[16px] placeholder:tw-text-[#B9B9B9] placeholder:tw-font-normal`}
                          defaultValue={defaultValue}
                          {...register("message", {
                            required: "This is a required field.",
                            onChange: handleChange,
                          })}
                          placeholder="Add prompt here..."
                          style={{ width: "100%" }}
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
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions className="tw-flex tw-justify-end tw-px-6 tw-pb-5">
            <Box>
              <Button
                onClick={handleSubmit(() =>
                  id ? onThisEditSubmit(id) : onThisAddSubmit()
                )}
                variant="contained"
                color="primary"
                className="tw-bg-primary tw-font-medium hover:tw-bg-primaryDark tw-text-[16px] tw-px-[26px] tw-py-[13px] tw-uppercase"
              >
                Save
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditPlaybook;
