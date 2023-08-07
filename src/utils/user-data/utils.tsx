import React, { useMemo } from "react";
import { IconTrash } from "@tabler/icons-react";
import DeleteUserData from "../../ui-component/buttons/DeleteUserData";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

export const _columns = (onLoadApi: any) => {
  const theme: any = useTheme();

  const downloadFile = (uri: any, name: any) => {
    let link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute("download", name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return useMemo(
    () => [
      {
        Header: "File",
        accessor: "file",
        Cell: (cell: any) => {
          return (
            <Button
              variant="text"
              className="tw-normal-case"
              onClick={() => downloadFile(cell?.value, "file")}
            >
              {cell?.value || ""}
            </Button>
          );
        },
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
