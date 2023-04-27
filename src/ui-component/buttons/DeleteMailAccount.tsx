import React, { useState } from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "../../helpers/toast";

type DeleteMailAccountTypes = {
  id: number;
  buttonText: string;
  onLoadApi?: any;
  style?: React.CSSProperties | undefined;
  size?: "large" | "small" | "medium" | undefined;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
};

const DeleteMailAccount = ({
  id,
  buttonText,
  onLoadApi,
  style,
  size,
  color = "error",
}: DeleteMailAccountTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    try {
      let res = await deleteMailAccountService(id);
      if (res?.status === 204) {
        ToastSuccess("Mail account successfully deleted.");
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
      <Button
        disableElevation
        size={size}
        type="button"
        variant="contained"
        color={color}
        onClick={handleOpen}
        style={style}
      >
        {buttonText}
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
              variant="contained"
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

      <ToastContainer />
    </>
  );
};

export default DeleteMailAccount;
