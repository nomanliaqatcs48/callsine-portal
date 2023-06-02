import React, { useState } from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import { deleteEmailService } from "../../services/emails.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";

type DeletePersonEmailTypes = {
  id: number;
  personId: number;
  onLoadApi?: any;
  children: any;
  [x: string]: any;
};

const DeletePersonEmail = ({
  id,
  personId,
  onLoadApi,
  children,
  ...props
}: DeletePersonEmailTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    try {
      let res = await deleteEmailService(personId, id);
      if (res?.status === 204) {
        onLoadApi();
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
        ToastSuccess("Email successfully deleted.");
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, submit: false }));
    }
  };

  return (
    <>
      <Button
        disableElevation
        type="button"
        variant="contained"
        color="error"
        onClick={handleOpen}
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
          describedby="delete mail account modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <Typography variant="subtitle1">
            You won't be able to revert this!
          </Typography>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDelete}
              disabled={isLoading?.submit}
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

export default DeletePersonEmail;
