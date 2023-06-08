import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { deletePersonDetailService } from "../../services/persons.service";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";

type DeleteSelectedPeopleTypes = {
  selectedRows: any[];
  onLoadApi: any;
};

const DeleteSelectedPeople = ({
  selectedRows,
  onLoadApi,
}: DeleteSelectedPeopleTypes) => {
  const onDelete = async () => {
    devLog("selectedRows", selectedRows);
    if (!selectedRows?.length) {
      ToastWarning("Please select person");
      return;
    }
    selectedRows.map(async (item: any, idx) => {
      try {
        let res = await deletePersonDetailService(item?.id);
        // if (res?.status === 204) {}
        if (idx === selectedRows?.length - 1) {
          ToastSuccess("Selected people successfully deleted.");
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
      <Tooltip title="Delete selected people">
        <Button
          onClick={onDelete}
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
    </>
  );
};

export default DeleteSelectedPeople;
