import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";
import { deleteUserDataService } from "../../services/users.service";
import MyModal from "../modal/MyModal";
import { LoadingButton } from "@mui/lab";

type DeleteUserDataTypes = {
  selectedRows: any[];
  onLoadApi: any;
};

const DeleteSelectedUserData = ({
  selectedRows,
  onLoadApi,
}: DeleteUserDataTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => {
    if (!selectedRows?.length) {
      ToastWarning("Please select user data");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    devLog(() => {
      console.log("selectedRows", selectedRows);
    });
    if (!selectedRows?.length) {
      ToastWarning("Please select user data");
      return;
    }
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    selectedRows.map(async (item: any, idx) => {
      try {
        let res = await deleteUserDataService(item?.id);
        // if (res?.status === 204) {}
        if (idx === selectedRows?.length - 1) {
          ToastSuccess("Selected user data successfully deleted.");
          setIsLoading((prev: any) => ({ ...prev, submit: false }));
          handleClose();
          onLoadApi();
        }
      } catch (e: any) {
        ToastError("Something went wrong!");
        devLogError(() => {
          console.error(e?.response);
        });
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
      }
    });
  };

  return (
    <>
      <Tooltip title="Delete selected user data" PopperProps={{style:{zIndex:999}}}>
        <Button
          onClick={handleOpen}
          disabled={false}
          className={`${
            selectedRows?.length > 0
              ? "tw-text-primary"
              : "tw-text-callsineGray"
          } tw-font-normal tw-text-[16px] tw-tracking-[0.32px]`}
        >
          <DeleteIcon
            sx={{
              color: selectedRows?.length > 0 ? "#1a76d2" : "#778da9",
              fontSize: 15,
            }}
            className="tw-mr-2"
          />
          Delete
        </Button>
      </Tooltip>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Are you sure?"
          labelledby="Are you sure?"
          describedby="delete selected user data modal"
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
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={onDelete}
              loading={isLoading?.submit}
              disabled={isLoading?.submit}
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
            >
              Yes, please!
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              onClick={handleClose}
              loading={isLoading?.submit}
              disabled={isLoading?.submit}
            >
              Cancel
            </LoadingButton>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default DeleteSelectedUserData;
