import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, DialogActions, Tooltip, Typography } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import MyModal from "../modal/MyModal";
import { LoadingButton } from "@mui/lab";

type DeleteSelectedMailAccountsTypes = {
  selectedRows: any[];
  onLoadApi: any;
};

const DeleteSelectedMailAccounts = ({
  selectedRows,
  onLoadApi,
}: DeleteSelectedMailAccountsTypes) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  const handleOpen = () => {
    if (!selectedRows?.length) {
      ToastWarning("Please select mail account");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    devLog("selectedRows", selectedRows);
    if (!selectedRows?.length) {
      ToastWarning("Please select mail account");
      return;
    }
    setIsLoading((prev: any) => ({ ...prev, submit: true }));
    selectedRows.map(async (item: any, idx) => {
      try {
        let res = await deleteMailAccountService(item?.id);
        // if (res?.status === 204) {}
        if (idx === selectedRows?.length - 1) {
          ToastSuccess("Selected mail account successfully deleted.");
          setIsLoading((prev: any) => ({ ...prev, submit: false }));
          handleClose();
          onLoadApi();
        }
      } catch ({ response }) {
        ToastError("Something went wrong!");
        devLogError(response);
        setIsLoading((prev: any) => ({ ...prev, submit: false }));
      }
    });
  };

  return (
    <>
      <Tooltip title="Delete selected mail accounts">
        <Button
          onClick={handleOpen}
          disabled={false}
          className={`${
            selectedRows?.length > 0 ? "tw-text-[#1a76d2]" : "tw-text-[#778da9]"
          }`}
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
          describedby="delete selected mail account modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <Typography variant="subtitle1">
            You won't be able to revert this!
          </Typography>
          <DialogActions>
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

export default DeleteSelectedMailAccounts;
