import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { deletePersonDetailService } from "../../services/persons.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";

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

export default DeleteSelectedPeople;
