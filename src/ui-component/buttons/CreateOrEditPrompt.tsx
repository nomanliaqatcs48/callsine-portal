import React, { ChangeEvent, useState } from "react";
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
import { useForm } from "react-hook-form";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { _styles } from "../../utils/playbooks/utils";
import CloseIcon from "@mui/icons-material/Close";
import { Prompt } from "../../utils/types/prompt";

import {
  createPromptService,
  updatePromptService,
} from "src/services/prompts.service";

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
  const [open, setOpen] = React.useState(false);
  const [promptValue, setPromptValue] = useState<any>("");
  devLog(() => {
    console.log("promptId", id);
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
    setPromptValue(event.target.value);
  };

  const onThisEditSubmit = async (id: number) => {
    ToastSuccess("Update on this prompt is in progress.");
    handleClose();

    console.log(promptValue);

    const data = { text: promptValue };
    try {
      let res = await updatePromptService(id, data);
      if (res?.data) {
        console.log(res.data);
        ToastSuccess("Successfully updated prompt.");
        onLoadApi();
        handleClose();
        console.log("response edit", res.data["text"]);
        setPromptList((prevPromptList: Prompt[]) =>
          prevPromptList.map((prompt: Prompt) =>
            prompt.id === id ? res.data : prompt
          )
        );
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      return;
    }
  };

  const onThisAddSubmit = async () => {
    ToastSuccess("Adding new prompt");
    handleClose();
    console.log(promptValue);

    const data = { text: promptValue, playbook: selectedData.id };
    try {
      let res = await createPromptService(data);
      if (res?.data) {
        ToastSuccess("New prompt successfully created.");
        onLoadApi();
        handleClose();
        setPromptList((prevPromptList: any) => [...prevPromptList, res.data]);
        reset();
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
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
          <DialogContent className="tw-p-0">
            <Grid container spacing={0}>
              <Grid item xs={12}>
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
                          className={`${_styles?.labelValueInput} tw-text-[16px] placeholder:tw-text-[#B9B9B9] placeholder:tw-font-normal`}
                          defaultValue={defaultValue}
                          {...register("message", {
                            required: "This is required field.",
                            onChange: handleChange,
                          })}
                          placeholder="Add prompt here..."
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
