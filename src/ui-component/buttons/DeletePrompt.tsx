import React, { useState } from "react";

import { useReloadPlaybooks } from "../../hooks/playbook/useReloadPlaybooks";

import { Button, DialogActions, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLog, devLogError } from "../../helpers/logs";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { deletePromptService } from "src/services/prompts.service";
import { Prompt } from "../../utils/types/prompt";

type DeletePlaybookTypes = {
  id: number;
  children: any;
  onLoadApi?: any;
  setPromptList?: any;
  setPlaybookData?: any;
  [x: string]: any;
};

const DeletePrompt = ({
  id,
  children,
  onLoadApi,
  setPromptList,
  setPlaybookData,
  ...props
}: DeletePlaybookTypes) => {
  const reloadPlaybooks = useReloadPlaybooks();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    insertBodyLoader();
    ToastSuccess("Deleting prompt is in progress.");
    console.log(id);
    handleClose();

    try {
      let res = await deletePromptService(id);
      if (res?.status === 204) {
        await reloadPlaybooks();
        onLoadApi();
        setPromptList((prevPromptList: Prompt[]) =>
          prevPromptList.filter((prompt: Prompt) => prompt.id !== id)
        );
        removeBodyLoader();
        ToastSuccess("Prompty successfully deleted.");
      }
    } catch (e: any) {
      removeBodyLoader();
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="tw-rounded-full tw-p-2 tw-min-w-fit tw-flex tw-flex-row tw-justify-center tw-mx-auto"
        {...props}
      >
        {children}
      </Button>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Are you sure?"
          labelledby="Are you sure?"
          describedby="delete playbook modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <Typography variant="subtitle1">
            You won't be able to revert this!
          </Typography>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              disabled={isLoading?.submit}
              className="tw-bg-red-600 hover:tw-bg-red-500 tw-normal-case"
            >
              Yes, delete it!
            </Button>
            <Button onClick={handleClose} disabled={isLoading?.submit}>
              Cancel
            </Button>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default DeletePrompt;
