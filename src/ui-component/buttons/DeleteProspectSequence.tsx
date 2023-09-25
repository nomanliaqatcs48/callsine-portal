import React, { useState } from "react";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import {} from "../../services/emails.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { clearProspecEventService } from "src/services/sequences.service";

type DeleteProspectSequenceTypes = {
  id: number;
  personId: number;
  onLoadApi?: any;
  children: any;
  [x: string]: any;
};

const DeleteProspectSequence = ({
  id,
  personId,
  onLoadApi,
  children,
  ...props
}: DeleteProspectSequenceTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    try {
      let res = await clearProspecEventService(id);
      console.log({ res });
      if (res?.status === 200) {
        onLoadApi();
        handleClose();
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
        ToastSuccess("Email successfully cleared.");
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, submit: false }));
    }
  };

  return (
    <>
      <Tooltip title="Delete Prospect Sequence">
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
          <DialogActions className="tw-px-[30px] tw-pb-[30px]">
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

export default DeleteProspectSequence;
