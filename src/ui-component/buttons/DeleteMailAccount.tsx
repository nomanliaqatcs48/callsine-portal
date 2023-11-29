import React, { useState } from "react";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";

type DeleteMailAccountTypes = {
  id: number;
  children: any;
  onLoadApi?: any;
  [x: string]: any;
};

const DeleteMailAccount = ({
  id,
  children,
  onLoadApi,
  ...props
}: DeleteMailAccountTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
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
          describedby="delete mail account modal"
          modalSxStyle={{
            width: { xs: 400 },
            padding: 0,
            "& h4": {
              backgroundColor: "#EAEAEA",
              padding: "20px 30px",
              fontSize: { xs: 14, lg: 16 },
            },
          }}
        >
          <Typography variant="subtitle1" className="tw-px-[30px] tw-py-[20px]">
            You won't be able to revert this!
          </Typography>
          <DialogActions className="tw-px-[30px]">
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              disabled={isLoading?.submit}
              className="tw-bg-red-600 hover:tw-bg-red-500 tw-normal-case"
            >
              Yes, delete it!
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isLoading?.submit}
            >
              Cancel
            </Button>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default DeleteMailAccount;
