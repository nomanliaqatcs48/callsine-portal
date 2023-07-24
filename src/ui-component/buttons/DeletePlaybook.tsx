import React, { useState } from "react";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";

type DeletePlaybookTypes = {
  id: number;
  children: any;
  onLoadApi?: any;
  [x: string]: any;
};

const DeletePlaybook = ({
  id,
  children,
  onLoadApi,
  ...props
}: DeletePlaybookTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    ToastSuccess("This functionality is in progress.");
    handleClose();
    return;
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    insertBodyLoader();
    try {
      let res = await deleteMailAccountService(id);
      if (res?.status === 204) {
        ToastSuccess("Mail account successfully deleted.");
        onLoadApi();
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
        removeBodyLoader();
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, submit: false }));
      removeBodyLoader();
    }
  };

  return (
    <>
      <Tooltip title="Delete">
        <Button
          onClick={handleOpen}
          className="tw-rounded-full tw-p-2 tw-min-w-fit tw-flex tw-flex-row tw-justify-center tw-mx-auto"
          {...props}
        >
          {children}
        </Button>
      </Tooltip>

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
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
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

export default DeletePlaybook;
