import React, { useMemo } from "react";
import { IconTrash } from "@tabler/icons-react";
import DeleteUserData from "../../ui-component/buttons/DeleteUserData";
import { useTheme } from "@mui/material/styles";

export const _columns = (onLoadApi: any) => {
  const theme: any = useTheme();

  return useMemo(
    () => [
      {
        Header: "File",
        accessor: "file",
      },
      {
        Header: "Actions",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell: any) => {
          return (
            <div className="tw-flex tw-justify-start tw-w-9">
              <DeleteUserData
                id={cell?.row?.original?.id}
                onLoadApi={onLoadApi}
              >
                <IconTrash
                  style={{ color: theme.palette.primary.main }}
                  size="18"
                  strokeWidth={3}
                  className=""
                />
              </DeleteUserData>
            </div>
          );
        },
      },
    ],
    []
  );
};
