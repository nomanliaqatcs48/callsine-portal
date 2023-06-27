import React, { useState } from "react";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { deleteSequenceEventService } from "../../services/sequences.service";

type DeleteScheduledEmailTypes = {
  id: number;
  children: any;
  onLoadApi: any;
  [x: string]: any;
};

const DeleteScheduledEmail = ({
  id,
  children,
  onLoadApi,
  ...props
}: DeleteScheduledEmailTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    try {
      let res = await deleteSequenceEventService(id);
      devLog(() => {
        console.log("res", res);
      });
      if (res) {
        onLoadApi();
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
        ToastSuccess("Scheduled email successfully deleted.");
        return;
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      ToastError("Something went wrong!");
      setIsLoading((prev: any) => ({ ...prev, submit: false }));
      // setTimeout(() => window.location.reload(), 5000);
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
          describedby="delete scheduled email modal"
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

export default DeleteScheduledEmail;
