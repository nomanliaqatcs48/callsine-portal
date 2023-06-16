import React, { useState } from "react";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { devLogError } from "../../helpers/logs";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { deleteUserDataService } from "../../services/users.service";

type DeleteUserDataTypes = {
  id: number;
  children: any;
  onLoadApi?: any;
  [x: string]: any;
};

const DeleteUserData = ({
  id,
  children,
  onLoadApi,
  ...props
}: DeleteUserDataTypes) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    try {
      let res = await deleteUserDataService(id);
      if (res?.status === 204) {
        ToastSuccess("User data successfully deleted.");
        onLoadApi();
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, submit: false }));
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
          describedby="delete user data modal"
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

export default DeleteUserData;
