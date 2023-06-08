import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";
import { deleteMailAccountService } from "../../services/mail-accounts.service";

type DeleteSelectedMailAccountsTypes = {
  selectedRows: any[];
  onLoadApi: any;
};

const DeleteSelectedMailAccounts = ({
  selectedRows,
  onLoadApi,
}: DeleteSelectedMailAccountsTypes) => {
  const onDelete = async () => {
    devLog("selectedRows", selectedRows);
    if (!selectedRows?.length) {
      ToastWarning("Please select mail account");
      return;
    }
    selectedRows.map(async (item: any, idx) => {
      try {
        let res = await deleteMailAccountService(item?.id);
        // if (res?.status === 204) {}
        if (idx === selectedRows?.length - 1) {
          ToastSuccess("Selected mail account successfully deleted.");
          onLoadApi();
        }
      } catch ({ response }) {
        ToastError("Something went wrong!");
        devLogError(response);
      }
    });
  };

  return (
    <>
      <Tooltip title="Delete selected mail accounts">
        <Button
          onClick={onDelete}
          disabled={false}
          className="tw-text-[#778da9]"
        >
          <DeleteIcon
            sx={{ color: "#778da9", fontSize: 15 }}
            className="tw-mr-2"
          />
          Delete
        </Button>
      </Tooltip>
    </>
  );
};

export default DeleteSelectedMailAccounts;
